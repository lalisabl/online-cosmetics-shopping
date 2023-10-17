import React from "react";
import "./Header.css"; // You can create a CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">WUBIT</div>
      <nav className="nav">
        <ul>
          <li>Products</li>
          <li>Categories</li>
        </ul>
      </nav>
      <div className="search">
        <input type="text" placeholder="Search for products" />
        <button>Search</button>
      </div>
      <div className="cart">
        <i className="fa fa-shopping-cart"></i> Cart
      </div>
      <div className="account">Login Sign Up</div>
    </header>
  );
};

export default Header;
