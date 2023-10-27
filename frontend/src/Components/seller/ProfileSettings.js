import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingCard } from "../shared/LoadingCard";
import { Card, CardBody, Row } from "reactstrap";
import {
  faTrash,
  faEyeSlash,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileSettings() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        setUser(res.data.data.data);
        if (!(res.data.data.data.role === "seller")) {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login");
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>
          <LoadingCard /> <LoadingCard /> <LoadingCard />{" "}
        </div>
      ) : (
        <>
          {" "}
          <Card className="user-profile">
            {edit ? (
              <CardBody>
                <EditProfile back={()=>setEdit(false)} user={user} />
              </CardBody>
            ) : (
              <CardBody>
                <img
                  src={
                    user.photo
                      ? `http://localhost:3000/images/users/` + user.photo
                      : "./image/userplaceholder.jpg"
                  }
                />
                <h4>{user.fullName}</h4>
                <Row className="m-3">{user.username}</Row>
                <Row className="m-3">{user.email}</Row>
                <Row className="m-3">{user.role}</Row>
                <Row className="m-3">{user.phoneNumber}</Row>
                <span
                  onClick={() => {
                    setEdit(true);
                  }}
                  className="edit-my-profile"
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </CardBody>
            )}
          </Card>{" "}
        </>
      )}
    </div>
  );
}
function EditProfile({ user, back }) {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <button onClick={back} className="btn btn-secondary">
        back
      </button>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image"></label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            className="form-control"
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            className="form-control"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber ? formData.phoneNumber : "Enter Phone number"}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
      </form>
    </div>
  );
}
