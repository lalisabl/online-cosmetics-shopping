// Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardImg, CardTitle, Row } from "reactstrap";
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
import ProductManagement, { CreateProduct } from "./ProductManagement";
import GenericModal from "../shared/GenericModal";

const APIURL = "";
function SellerDashboard() {
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
        if (!(res.data.data.data.role === "seller")) {
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
      <Navbar user={user} onItemClick={handleSidebarItemClick} />
      <div className="dashboard-container">
        <Sidebar onItemClick={handleSidebarItemClick} />
        <MainDis element={selectedItem} />
      </div>
    </div>
  );
}
function Navbar({ onItemClick, user }) {
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
        <div>
          <UserProfile onItemClick={onItemClick} user={user} />
        </div>
      </div>
    </nav>
  );
}
export function UserProfile({ user, onItemClick }) {
  const [logMenu, setLogMenu] = useState(false);

  const navigate = useNavigate();
  function logOut() {
    axios
      .get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <GenericModal
        isOpen={logMenu}
        onClose={() => {
          setLogMenu(false);
        }}
      >
        <h4 style={{ color: "black" }}>Do you really want to logout? </h4>
        <div className="m-auto">
          {" "}
          <button onClick={logOut} className="btn btn-danger m-2">
            logout
          </button>
        </div>
      </GenericModal>

      <div className="user-info">
        {" "}
        <>
          {" "}
          <img
            src={
              user.photo
                ? `http://localhost:3000/images/users/` + user.photo
                : "./image/userplaceholder.jpg"
            }
          />
          <span>{user.username}</span>
        </>
        <div className="logMenu">
          <Row onClick={() => setLogMenu(true)}>LogOut</Row>
        </div>
      </div>
    </>
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
        <li onClick={() => onItemClick(<CreateProduct />)}>
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
