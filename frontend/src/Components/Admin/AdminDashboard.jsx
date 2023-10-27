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
import { UserProfile } from "../seller/SellerDashboard";

const APIURL = "";
function Dashboard() {
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        setUser(res.data.data.data);
        if (!(res.data.data.data.role === "admin")) {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login");
        setLoading(false);
      });
  }, []);
  function handleSidebarItemClick(item) {
    setSelectedItem(item);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar onItemClick={handleSidebarItemClick} user={user} />
      <div className="dashboard-container">
        <Sidebar onItemClick={handleSidebarItemClick} />
        <MainDis element={selectedItem} />
      </div>
    </div>
  );
}
function Navbar({ user, onItemClick }) {
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
          <span className="notify">
            Notifications<span className="notification-num">23</span>{" "}
          </span>
        </div>
        <div>
          <UserProfile onItemClick={onItemClick} user={user} />
        </div>
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
          <FontAwesomeIcon icon={faBell} />{" "}
          <span className="notify">
            Notifications<span className="notification-num">23</span>{" "}
          </span>
        </li>
        <li onClick={() => onItemClick(<ReportGenerator />)}>
          <FontAwesomeIcon icon={faChartBar} /> Reports
        </li>
        <li onClick={() => onItemClick(<onItemClick />)}>
          <FontAwesomeIcon icon={faGear} /> settings
        </li>
      </ul>
    </aside>
  );
}

export default Dashboard;
