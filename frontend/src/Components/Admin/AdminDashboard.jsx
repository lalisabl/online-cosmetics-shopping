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
  faChartBar,
  faGear,
  faUsers,
  faClipboardList,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";
import AdminNotification from "./AdminNotification";
import Setting from "./Setting";
import ReportGenerator from "./ReportGenerator";

const APIURL = "";
function Dashboard() {
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3001/api/dashboard",
  //         { withCredentials: true }
  //       );
  //       setUsername(response.data.user.username);
  //       //ff  console.log(response.data.user.username);
  //     } catch (error) {
  //       // navigate("/login");
  //       console.error("Fetching user data error:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);
  function handleSidebarItemClick(item) {
    setSelectedItem(item);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar onItemClick={handleSidebarItemClick} />
        <MainDis element={selectedItem} />
      </div>
    </div>
  );
}
function Navbar() {
  return (
    <nav className="navBar-header">
      <div className="logo">Dashboard Logo</div>
      <div className="nav-links Login-signUp right-side-nav">
        <div>
          <FontAwesomeIcon icon={faHome} />
          Home
        </div>
        <div>
          <FontAwesomeIcon icon={faBell} />
          <span className="notify">Notifications</span>
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
          <FontAwesomeIcon icon={faHome} /> Dashboard
        </li>
        <li onClick={() => onItemClick(<ProductManagement />)}>
          <FontAwesomeIcon icon={faClipboardList} /> product management
        </li>
        <li onClick={() => onItemClick(<UserManagement />)}>
          <FontAwesomeIcon icon={faUsers} /> User management
        </li>
        <li onClick={() => onItemClick(<AdminNotification />)}>
          <FontAwesomeIcon icon={faBell} /> Notifications
        </li>
        <li onClick={() => onItemClick(<ReportGenerator />)}>
          <FontAwesomeIcon icon={faChartBar} /> Reports
        </li>
        <li onClick={() => onItemClick(<Setting />)}>
          <FontAwesomeIcon icon={faGear} /> settings
        </li>
      </ul>
    </aside>
  );
}

export default Dashboard;
