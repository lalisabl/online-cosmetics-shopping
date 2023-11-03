import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import { LoadingCard } from "../shared/LoadingCard";
import { Card, CardBody, CardHeader, Row } from "reactstrap";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegistrationForm() {
  const [success, setSuccess] = useState();
  const [Data, setData] = useState({});
  const [inputError, setInputError] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputError(false);
    setInputErrorMsg("");
    if (name === "phoneNumber" && (isNaN(value) || parseFloat(value) <= 0)) {
      setInputError(true);
      setInputErrorMsg("not valid phone number");
    } else {
      setData({ ...Data, [name]: value });
    }
  };
  const [formSubmit, setFormSubmited] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true);
    const formData = new FormData();

    axios
      .post("http://localhost:3000/api/v1/users/register", Data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.status);
        setSuccess(true);
        if (res.data.data.user.role === "admin") {
          navigate("/admin");
        } else if (res.data.data.user.role === "seller") {
          navigate("/sellerDashBoard");
        } else {
          navigate("/products");
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        setSuccess(false);
      });
  };

  return (
    <div className="registration">
      <Card className=" mb-2 mt-2">
        <img src="./image/wubit_logo.png" />
      </Card>
      <Card>
        <h4>Register new account</h4>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                className="form-control"
                type="text"
                id="fullName"
                placeholder="enter full name"
                name="fullName"
                required
                value={Data.fullName}
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
                placeholder="create username"
                value={Data.username}
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
                required
                placeholder="enter email"
                value={Data.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                className="form-control"
                type="tel"
                id="phoneNumber"
                required
                name="phoneNumber"
                placeholder="enter phone number"
                value={Data.phoneNumber}
                onChange={handleChange}
              />
              {inputError ? (
                <span className="alert alert-danger">{inputErrorMsg}</span>
              ) : (
                <></>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber">Password:</label>
              <input
                className="form-control"
                type="password"
                id="password"
                required
                name="password"
                placeholder="create password"
                value={Data.password}
                onChange={handleChange}
              />
            </div>
            {formSubmit ? (
              !success ? (
                <div className="alert alert-danger m-2">
                  error happen while uploading your form pls try again or later
                </div>
              ) : (
                <div className="alert alert-success m-2">
                  successfully created you can log in now
                </div>
              )
            ) : (
              <></>
            )}
            <button
              disabled={inputError}
              type="submit"
              className="btn btn-primary m-2"
            >
              Submit
            </button>
            <span className="m-2">
              have account ? <a href="/login">Login</a>{" "}
            </span>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
