// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

// ... (other imports)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .post(
          "http://localhost:3000/api/v1/users/login",
          { email, password },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.data.user.role === "admin") {
            navigate("/admin");
          } else if (res.data.data.user.role === "seller") {
            navigate("/sellerDashBoard");
          } else {
            navigate("/products");
          }
        });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="registration">
      <Card className=" mb-2 mt-2">
        <img src="./image/wubit_logo.png" />
      </Card>
      <Card>
        {" "}
        <h4>Login</h4>
        <CardBody>
          <form onSubmit={handleLogin}>
            <div className="m-1">
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="m-1">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
            <span>don't have account ? <a href="/register" >Register</a> </span>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
