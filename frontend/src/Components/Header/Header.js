import React from "react";
import "./Header.css";

// You can create a CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
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
      <div className="account">
        <button className="login">Login</button>
        <button className="signup">SignUp</button>
      </div>
    </header>
  );
};

export default Header;
