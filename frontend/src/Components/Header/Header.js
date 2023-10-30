import React, { useEffect, useState } from "react";
import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHome } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../seller/SellerDashboard";
import Carts from "../Cart/Cart";

const Header = ({ search,newChange }) => {
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

  const [productsLen, setProductsLen] = useState("");
  const [change, setChange] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/cart", {
        withCredentials: true,
      })
      .then((res) => {
        setProductsLen(res.data.data.cart.items.length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.response.status);
        if (err.response.status === 401) {
          setIsLoggedIn(false);
        }
      });
  }, [change,newChange]);
  const [openCart, setCartOpen] = useState(false);
  return (
    <header className="header">
      <div
        onClick={() => {
          window.location.href = "/";
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
            {" "}
            <FontAwesomeIcon icon={faHome} />{" "}
          </li>
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
      <div onClick={() => setCartOpen(true)} className="cart">
        <p style={{ position: "relative" }}>
          Cart
          <i>
            <FontAwesomeIcon icon={faCartShopping} />
          </i>
          {productsLen > 0 && (
            <span className="notification-num">{productsLen}</span>
          )}
        </p>
      </div>
      {openCart && (
        <Carts
          removed={() => setChange(!change)}
          closeCart={() => setCartOpen(false)}
        />
      )}
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
