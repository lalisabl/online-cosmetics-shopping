import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";
import { faTrash, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingCard, LoadingCardList } from "../shared/LoadingCard";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function DeleteUSer(user_id) {
    axios
      .delete("http://localhost:3000/api/v1/users/" + user_id)
      .then((res) => {
        setDeleted(setDeleted(true));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, [deleted]);

  return (
    <div>
      {!loading ? (
        !error ? (
          users.length > 0 ? (
            <>
              {users.map((user) => (
                <div key={user.id}>
                  <User DeleteUSer={DeleteUSer} user={user} />
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
    </div>
  );
}

function User({ user, DeleteUSer }) {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    axios
      .patch(
        `http://localhost:3000/api/v1/users/giveRole/${user._id}`,
        { role: role },
        {
          withCredentials: true,
        }
      )
      .then((res) => {})
      .catch((err) => {});
  };

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
              className="btn btn-danger"
              onClick={() => DeleteUSer(user._id)}
            >
              {" "}
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
            <button className="btn btn-secondary">
              {" "}
              <FontAwesomeIcon icon={faBan} />
              Ban
            </button>
            {user.role !== "admin" ? (
              <select
                name="role"
                onChange={handleRoleChange}
                className="btn btn-dark"
              >
                <option value={""}>{user.role}</option>
                <option value={"admin"}>Admin</option>
                <option value={"seller"}>Seller</option>
                <option value={"customer"}>normal</option>
              </select>
            ) : (
              <select
                disabled
                name="role"
                onChange={handleRoleChange}
                className="btn btn-dark"
              >
                <option value={""}>{user.role}</option>
                <option value={"admin"}>Admin</option>
                <option value={"seller"}>Seller</option>
                <option value={"customer"}>normal</option>
              </select>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
