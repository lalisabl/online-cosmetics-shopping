import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";
import { faTrash, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {users.length > 0 ? (
        <>
          {users.map((user) => (
            <div key={user.id}>
              <User user={user} />
            </div>
          ))}
        </>
      ) : (
        <div>No user found</div>
      )}
    </div>
  );
}

function User({ user }) {
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
            <button className="btn btn-danger">
              {" "}
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
            <button className="btn btn-secondary">
              {" "}
              <FontAwesomeIcon icon={faBan} />
              Ban
            </button>
            <select className="btn btn-dark">
              <option value={""}>Change role</option>
              <option value={"admin"}>Admin</option>
              <option value={"seller"}>Seller</option>
              <option value={"normal"}>normal</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
}
