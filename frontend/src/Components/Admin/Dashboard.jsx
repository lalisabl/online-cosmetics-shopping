// Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardImg, CardTitle } from "reactstrap";
import { timeAgo } from "../shared/SharedComp";
import "./../../styles/dashboard.css";

const APIURL = "";
function Dashboard() {
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/dashboard",
          { withCredentials: true }
        );
        setUsername(response.data.user.username);
        //ff  console.log(response.data.user.username);
      } catch (error) {
        // navigate("/login");
        console.error("Fetching user data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
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
        <div>Home</div>
        <div>Help</div>
        <div className="user-info">Username</div>
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

function Post() {
  return (
    <>
      <Product filter={"latest"} />
    </>
  );
}
function Sidebar({ onItemClick }) {
  return (
    <aside className="sidebar">
      <ul>
        <li>Analytics</li>
        <li onClick={() => onItemClick(<Post />)}>Posts</li>

        <li>System Log</li>
      </ul>
    </aside>
  );
}

function Product({ filter }) {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const cards = document.querySelectorAll(".fadeInAnimation");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, 50 * index);
    });
  }, [products]);
  let apiUrl = `${APIURL}/api/products?sort=latest`;
  if (filter !== "latest") {
    apiUrl = `${APIURL}/api/products?forWhom=${filter}&sort=latest`;
  }
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [apiUrl]);

  ///let products = ProductList.filter((prod) => prod.for === "child");
  const handleProductDetail = (product) => {
    navigate(`/buyer/product/${product.id}`);
  };
  // NEED TO BE EDITED
  const userId = 42;
  return (
    <>
      <div className="Card_list product-list">
        {products.length > 0 ? (
          products.map((product, key) => (
            <Card
              onClick={() => handleProductDetail(product)}
              key={key}
              className="fadeInAnimation"
            >
              <CardImg
                src={`${APIURL}/api/getImage/` + product.filename}
                alt="not found"
              ></CardImg>

              <CardTitle>
                {product.title} <br />
                <b>{product.price} ETB</b> <br />
                <span className="muted">{product.num_views} views</span> <br />
                <span className="muted">{timeAgo(product.created_at)}</span>
                <br />
                {product.condition}
              </CardTitle>
            </Card>
          ))
        ) : (
          <h1>NO Product found</h1>
        )}
      </div>
    </>
  );
}

export default Dashboard;
