import React from "react";
import "./Header.css";
export default function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-logo">
          <h1>Kitto-E-Commerce</h1>
        </div>
        <div className="catogories">
          <div className="category">Categories</div>
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

        <div className="search">
          <input type="text" className="input"></input>
        </div>
      </div>
    </div>
  );
}
