// Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardImg, CardTitle } from "reactstrap";
import { timeAgo } from "../shared/SharedComp";
import "./../../styles/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBell,
  faPlusSquare,
  faGear,
  faUsers,
  faClipboardList,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import OrderManagement from "./OrderManagement";
import ProfileSettings from "./ProfileSettings";
import ProductManagement from "./ProductManagement";

const APIURL = "";
function SellerDashboard() {
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  function handleSidebarItemClick(item) {
    setSelectedItem(item);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar onItemClick={handleSidebarItemClick} />
      <div className="dashboard-container">
        <Sidebar onItemClick={handleSidebarItemClick} />
        <MainDis element={selectedItem} />
      </div>
    </div>
  );
}
function Navbar({onItemClick}) {
  return (
    <nav className="navBar-header">
      <div className="logo">Dashboard Logo</div>
      <div className="nav-links Login-signUp right-side-nav">
        <div onClick={() => onItemClick(null)}>
          <FontAwesomeIcon icon={faHome} />
          Home
        </div>
        <div onClick={() => onItemClick(<OrderManagement />)}>
          <FontAwesomeIcon icon={faBell} />
          <span className="notify">
            New Orders<span className="notification-num">23</span>{" "}
          </span>
        </div>
        <div className="user-info"> Username</div>
      </div>
    </nav>
  );
}

function MainDis({ element }) {
  return (
    <main className="main-content">
      {element ? element : "Select an item from the sidebar"}
    </main>
  );
}

function Sidebar({ onItemClick }) {
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    //  console.log(currentPath);

    setActiveMenuItem(currentPath);
  }, [navigate]);
  return (
    <aside className="sidebar">
      <ul>
        <li onClick={() => onItemClick(null)}>
          <i>
            <FontAwesomeIcon icon={faHome} />
          </i>
          Dashboard
        </li>
        <li onClick={() => onItemClick(<ProductManagement />)}>
          <i>
            <FontAwesomeIcon icon={faClipboardList} />
          </i>
          Your Products
        </li>

        <li onClick={() => onItemClick(<OrderManagement />)}>
          <i>
            <FontAwesomeIcon icon={faBell} />
          </i>{" "}
          <span className="notify">
            New Orders<span className="notification-num">23</span>{" "}
          </span>
        </li>

        <li onClick={() => onItemClick(<ProfileSettings />)}>
          <i>
            <FontAwesomeIcon icon={faGear} />
          </i>
          Profile Settings
        </li>
        <li onClick={() => onItemClick(<ProfileSettings />)}>
          <i>
            {" "}
            <FontAwesomeIcon icon={faPlusSquare} />
          </i>
          Add Product
        </li>
      </ul>
    </aside>
  );
}

export default SellerDashboard;
