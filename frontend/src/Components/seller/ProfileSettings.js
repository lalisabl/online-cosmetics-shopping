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
            <CardBody>
              <img
                src={
                  user.image
                    ? `http://localhost:3000/images/products/` + user.image
                    : "./image/userplaceholder.jpg"
                }
              />
              <h4>{user.fullName}</h4>
              <Row className="m-3">{user.username}</Row>
              <Row className="m-3">{user.email}</Row>
              <Row className="m-3">{user.role}</Row>
              <Row className="m-3">{user.phoneNumber}</Row>
              <span className="edit-my-profile">
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </CardBody>
          </Card>{" "}
          <Card className="user-profile">
            <CardBody>
              <Row className="m-3">{user.username}</Row>
              <span className="edit-my-profile">
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </CardBody>
          </Card>
          <Card className="user-profile">
            <CardBody>
              <Row className="m-3">{user.fullName}</Row>
              <span className="edit-my-profile">
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
