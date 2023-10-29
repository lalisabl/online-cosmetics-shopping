import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "../Cart/Cart"; // Adjust the import path to match the location of your Cart component
import Header from "../Header/Header";
import { CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSort } from "@fortawesome/free-solid-svg-icons";
import { LoadingCard, LoadingCardVert } from "../shared/LoadingCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const AddToCart = ({ product }) => {
  const [cartItems, setCartItems] = useState([]);
  const [added, setAdded] = useState(false);
  const userId = "650b195f5162ce66a16ab88e";
  const q = 3;

  const removeFromCart = () => {
    setAdded(false);
  };

  const addToCart = () => {
    axios
      .post(`http://127.0.0.1:3000/api/v1/cart/addProducts/${product._id}`, {
        userId: userId,
        quantity: q,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setAdded(true);

          setCartItems([...cartItems, product]);
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };
  return (
    <div className="cart">
      <button
        className="add-cart"
        onClick={() => addToCart(product)}
        style={{
          backgroundColor: added ? "#e6aab5" : "##f7a354",
          color: added ? "black" : "white",
        }}
      >
        {added ? "ADDED" : "ADD TO CART"}
      </button>
    </div>
  );
};

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/v1/Products/")
      .then((response) => {
        setProducts(response.data.data.Products);
        setLoading(false);
        //  console.log(response.data.data.Products);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError(true);
      });
  }, []);
  const [search, setSearch] = useState("all");
  useEffect(() => {
    navigate(`/products?q=haircare`);
    axios
      .get(`http://127.0.0.1:3000/api/v1/Products?category=makeup`)
      .then((response) => {
        setProducts(response.data.data.Products);
        setLoading(false);
        //   console.log(response.data.data.Products);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError(true);
      });
  }, [search]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return (
    <>
      <Header search={setSearch} />
      <Filter />
      <div className="product-pg">
        <div>
          {" "}
          <Category />
        </div>
        <div className="cardContainer">
          <div className="cards product-displayer">
            {!loading ? (
              !error ? (
                products.length > 0 ? (
                  products.map((product) => (
                    <div key={product._id} className="card">
                      <div
                        className="card-img"
                        onClick={() => {
                          navigate(`/products/${product._id}`);
                        }}
                      >
                        <img
                          className="card-image"
                          src={
                            "http://localhost:3000/images/products/" +
                            product.images[0]
                          }
                          alt={product.name}
                          variant="top"
                        />
                      </div>
                      <CardBody>
                        <div className="product-title">{product.name}</div>
                        <div
                          className="product-description"
                          onClick={() => {
                            navigate(`/products/${product._id}`);

                            // navigate("/products/" + product._id);
                          }}
                        >
                          {product.description}
                        </div>
                        <div className="product-price">
                          <span className="price">{product.price} birr</span>
                          /piece
                        </div>
                        <div className="rating">
                          <span className="av-rating">
                            {product.ratingsAverage}{" "}
                            <FontAwesomeIcon icon={faStar} />
                          </span>
                        </div>
                        <AddToCart product={product} />
                      </CardBody>
                    </div>
                  ))
                ) : (
                  <div>No product here</div>
                )
              ) : (
                <div className="alert alert-danger">
                  error happened while fetching data
                </div>
              )
            ) : (
              <>
                <PreLoading n={8} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
function PreLoading({ n }) {
  const numberOfCards = n;
  const cards = Array.from({ length: numberOfCards }, (_, index) => (
    <div className="card" key={index}>
      <LoadingCardVert />
    </div>
  ));

  return <>{cards}</>;
}

function Filter({ setFilter }) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("sort");

  const handleCategoryClick = (newCategory) => {
    searchParams.set("sort", newCategory);
    const updatedSearchParams = searchParams.toString();
    const newURL = `${location.pathname}?${updatedSearchParams}`;
    navigate(newURL);
  };
  return (
    <div className="filter">
      <ul>
        <span>
          {" "}
          <FontAwesomeIcon icon={faSort} /> <span>Filter</span>
        </span>
        <li
          className={filter === "price" && `active`}
          onClick={() => {
            handleCategoryClick("price");
          }}
        >
          price
        </li>
        <li
          className={filter === "latest" && `active`}
          onClick={() => {
            handleCategoryClick("latest");
          }}
        >
          latest
        </li>
        <li
          className={filter === "old" && `active`}
          onClick={() => {
            handleCategoryClick("old");
          }}
        >
          old
        </li>
      </ul>
    </div>
  );
}

function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  const handleCategoryClick = (newCategory) => {
    searchParams.set("category", newCategory);
    const updatedSearchParams = searchParams.toString();
    const newURL = `${location.pathname}?${updatedSearchParams}`;
    navigate(newURL);
  };

  return (
    <div className="Category-side">
      <h5>Categories</h5>
      <ul>
        <li
          onClick={() => {
            handleCategoryClick("skincare");
          }}
          className={category === "skincare" && `active`}
        >
          Skincare
        </li>
        <li
          onClick={() => {
            handleCategoryClick("makeup");
          }}
          className={category === "makeup" && `active`}
        >
          Makeup
        </li>
        <li
          onClick={() => {
            handleCategoryClick("haircare");
          }}
          className={category === "haircare" && `active`}
        >
          Haircare
        </li>
        <li
          onClick={() => {
            handleCategoryClick("fragrances");
          }}
          className={category === "fragrances" && `active`}
        >
          Fragrances
        </li>
        <li
          onClick={() => {
            handleCategoryClick("bath");
          }}
          className={category === "bath" && `active`}
        >
          Bath and Body
        </li>
        <li
          onClick={() => {
            handleCategoryClick("nail");
          }}
          className={category === "nail" && `active`}
        >
          Nail Care
        </li>
        <li
          onClick={() => {
            handleCategoryClick("organic");
          }}
          className={category === "organic" && `active`}
        >
          Organic and Natural
        </li>
        <li
          onClick={() => {
            handleCategoryClick("gift");
          }}
          className={category === "gift" && `active`}
        >
          Gift Sets
        </li>
        <li
          onClick={() => {
            handleCategoryClick("accessories");
          }}
          className={category === "accessories" && `active`}
        >
          Accessories
        </li>
        <li
          onClick={() => {
            handleCategoryClick("best");
          }}
          className={category === "best" && `active`}
        >
          Best Sellers
        </li>
        <li
          onClick={() => {
            handleCategoryClick("new");
          }}
          className={category === "new" && `active`}
        >
          New Arrivals
        </li>
      </ul>
    </div>
  );
}
