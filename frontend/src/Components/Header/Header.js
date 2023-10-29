import React, { useEffect, useState } from "react";
import "./Header.css";

// You can create a CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../seller/SellerDashboard";

const Header = ({ search }) => {
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

  const [searchQ, setSearchQ] = useState("");
  const setSearch = (e) => {
    setSearchQ(e.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    search(searchQ);
  };

  return (
    <header className="header">
      <div
        onClick={() => {
          window.location.href = "./";
        }}
        className="logo"
      >
        <img src="/image/wubit_logo.png" />
      </div>

      <nav className="nav">
        <ul>
          <li
            onClick={() => {
              window.location.href = "/products";
            }}
          >
            Products
          </li>
        </ul>
      </nav>
      <form onSubmit={handleSearchSubmit} className="search">
        <input
          type="text"
          onChange={setSearch}
          placeholder="Search for products"
        />
        <button>Search</button>
      </form>
      <div className="cart">
        <p>Cart</p>
        <FontAwesomeIcon icon={faCartShopping} size="2xl" />{" "}
      </div>
      {isLoggedIn ? (
        <UserProfile user={user} />
      ) : (
        <div className="account">
          <button onClick={() => navigate("/login")} className="login">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="signup">
            SignUp
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
