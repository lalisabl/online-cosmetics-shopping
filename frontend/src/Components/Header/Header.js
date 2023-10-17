import React from "react";
<<<<<<< HEAD
import "./Header.css"; // You can create a CSS file for styling
=======
import "./Header.css";
export default function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo">
          <h1>Kitto-E-Commerce</h1>
        </div>
        <div className="catogories">
          <select className="cosmetics">
            <option value="all">All</option>
            <option value="face">Face Cosmetics</option>
            <option value="skin">Skin Cosmetics</option>
            <option value="lipstick">Lipstick</option>
            <option value="eyeshadow">Eyeshadow</option>
            <option value="mascara">Mascara</option>
            <option value="foundation">Foundation</option>
            <option value="nailpolish">Nail Polish</option>
            <option value="perfume">Perfume</option>
            <option value="haircare">Hair Care</option>
          </select>
        </div>
>>>>>>> 519c2523d0d10b5a8848243a6777a5ab38b3e091

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
