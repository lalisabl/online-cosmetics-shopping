// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
