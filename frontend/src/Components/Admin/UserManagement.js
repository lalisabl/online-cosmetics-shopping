import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";
import { faTrash, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingCard, LoadingCardList } from "../shared/LoadingCard";
import GenericModal from "../shared/GenericModal";
import LoadingSVG from "../shared/loadingSVG";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [Mloading, setMLoading] = useState(false);
  const [error, setError] = useState(false);

  function DeleteUSer(user_id) {
    setMLoading(true);
    axios
      .delete("http://localhost:3000/api/v1/users/" + user_id)
      .then((res) => {
        setDeleted(setDeleted(!deleted));
        setMLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMLoading(false);
        setError(true);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users", {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data.data.users);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        setError(true);
      });
  }, [deleted,Mloading]);


  const [isLoadinModalOpen, setLoadingModalOpen] = useState(false);
  const closeLoadingModal = () => {
    setLoadingModalOpen(false);
    // setLoggedIn(true);
  };
  useEffect(() => {
    setLoadingModalOpen(true);
  }, [Mloading]);
  return (
    <div>
      {!loading ? (
        !error ? (
          users.length > 0 ? (
            <>
              {users.map((user) => (
                <div key={user.id}>
                  <User banLoad={Mloading} DeleteUSer={DeleteUSer} user={user} />
                </div>
              ))}
            </>
          ) : (
            <div>No user found</div>
          )
        ) : (
          <div>Error happened during fetching data</div>
        )
      ) : (
        <div>
          <LoadingCardList />
          <LoadingCardList />
          <LoadingCardList />
          <LoadingCardList />
          <LoadingCardList />
        </div>
      )}


      {Mloading ? (
        <div className="loading-modal">
          {" "}
          <GenericModal
            isOpen={isLoadinModalOpen}
            children={
              <>
                <LoadingSVG />
              </>
            }
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function User({ user, DeleteUSer, banLoad }) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setLoading(true);
    axios
      .patch(
        `http://localhost:3000/api/v1/users/giveRole/${user._id}`,
        { role: role },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      })
      .finally((e) => {
        setLoading(false);
      });
  };
  const [isLoadinModalOpen, setLoadingModalOpen] = useState(false);
  const closeLoadingModal = () => {
    setLoadingModalOpen(false);
    // setLoggedIn(true);
  };
  useEffect(() => {
    setLoadingModalOpen(true);
  }, [loading, banLoad]);
  return (
    <div className="wider-displays-dshb user-manage">
      <Card>
        <img
          src={
            user.images
              ? `http://localhost:3000/images/users/` + user.image
              : `https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png`
          }
          alt="user image 1"
        />
        <div className="manager-admin">
          <div>
            <CardTitle>{user.fullName}</CardTitle>
          </div>
          <div className="action-admin">
            <button
              disabled={user.role === "admin"}
              className={user.isActive ? "btn btn-primary" : "btn btn-danger"}
              onClick={() => DeleteUSer(user._id)}
            >
              <FontAwesomeIcon icon={faBan} />
              {user.isActive ? <>Un-ban</> : <>Ban</>}
            </button>

            <select
              disabled={user.role === "admin" || user.isActive}
              name="role"
              onChange={handleRoleChange}
              className="btn btn-dark"
            >
              <option value={""}>{user.role}</option>
              <option value={"admin"}>Admin</option>
              <option value={"seller"}>Seller</option>
              <option value={"customer"}>normal</option>
            </select>
          </div>
        </div>
      </Card>
      {loading ? (
        <div className="loading-modal">
          {" "}
          <GenericModal
            isOpen={isLoadinModalOpen}
            children={
              <>
                <LoadingSVG />
              </>
            }
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
