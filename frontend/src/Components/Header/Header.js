import React, { useEffect, useState } from "react";
import "./Header.css";

// You can create a CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../seller/SellerDashboard";

const Header = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        setIsLoggedIn(true);
        setUser(res.data.data.data);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setLoading(false);
      });
  }, []);

  return (
    <header className="header">
      <div className="logo">WUBIT</div>

      <nav className="nav">
        <ul>
          <li>
            {" "}
            <button>Products</button>
          </li>
          <li>
            <button>Catagories</button>
          </li>
        </ul>
      </nav>
      <div className="search">
        <input type="text" placeholder="Search for products" />
        <button>Search</button>
      </div>
      <div className="cart">
        <p>Cart</p>
        <FontAwesomeIcon icon={faCartShopping} size="2xl" />{" "}
      </div>
      {isLoggedIn ? (
        <UserProfile user={user} />
      ) : (
        <div className="account">
          <button className="login">Login</button>
          <button className="signup">SignUp</button>
        </div>
      )}
    </header>
  );
};

export default Header;
