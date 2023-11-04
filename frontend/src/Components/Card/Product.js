import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "../Cart/Cart"; // Adjust the import path to match the location of your Cart component
import Header from "../Header/Header";
import { CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSort } from "@fortawesome/free-solid-svg-icons";
import { LoadingCard, LoadingCardVert } from "../shared/LoadingCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GenericModal from "../shared/GenericModal";
import Login from "../../login";
export const AddToCart = ({ product, Added }) => {
  const [cartItems, setCartItems] = useState([]);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(9);

  const [isLoggedIn, setLoggedIn] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const handlechange = (e) => {
    setInputError(false);
    setInputErrorMsg("");
    const value = e.target.value;
    if (isNaN(value) || parseFloat(value) <= 0) {
      setInputError(true);
      setInputErrorMsg("not valid phone number");
    } else {
      setQuantity(e.target.value);
    }
  };
  const addToCart = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3000/api/v1/cart/addProducts/${product._id}`,
        {
          quantity: quantity,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 201) {
          setAdded(true);
          Added();
          setCartItems([...cartItems, product]);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setLoggedIn(false);
        }
        console.error("Error adding to cart:", error);
      });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isLoginModalOpen, setLoginIsModalOpen] = useState(false);
  useEffect(() => {
    setLoginIsModalOpen(!isLoggedIn);
    setIsModalOpen(false);
  }, [isLoggedIn]);
  const closeLoginModal = () => {
    setLoginIsModalOpen(false);
    setLoggedIn(true);
  };



  return (
    <>
      {!isLoggedIn ? (
        <div className="login-modal">
          <GenericModal
            isOpen={isLoginModalOpen}
            onClose={closeLoginModal}
            children={
              <>
                <Login />
              </>
            }
          />
        </div>
      ) : (
        <></>
      )}
      {isModalOpen ? (
        <GenericModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="adding-to-card">
            <div>
              <img
                className="card-image"
                src={
                  "http://localhost:3000/images/products/" + product.images[0]
                }
                alt={product.name}
                variant="top"
              />
              <span>{product.name}</span>
            </div>
            <div>available in stock:{product.stockQuantity}</div>
            <form onSubmit={addToCart}>
              <label>How many do you want:</label>
              <input type="number" name="quantity" onChange={handlechange} />
              {inputError ? (
                <div className="alert alert-danger">{inputErrorMsg}</div>
              ) : (
                <></>
              )}
              <button type="submit" className="btn add-cart">
                Add it
              </button>
              {added ? (
                <>
                  <span className="alert alert-success">
                    Successfully added
                  </span>
                  <span hidden> {setTimeout(closeModal, 1000)}</span>
                </>
              ) : (
                <></>
              )}
            </form>
          </div>
        </GenericModal>
      ) : (
        <></>
      )}
      <div className="cart">
        <button className="add-cart" onClick={openModal}>
          ADD TO CART
        </button>
      </div>
    </>
  );
};

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const newURL = `${location.pathname}?${searchParams}`;


  useEffect(() => {
    setLoading(true);
    navigate(newURL);
    axios
      .get(`http://127.0.0.1:3000/api/v1/Products?${searchParams}`)
      .then((response) => {
        setProducts(response.data.data.Products);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, [newURL]);

  function TruncatedDescription({ product }) {
    const maxChars = 50;
    const truncatedDescription =
      product.description.length > maxChars
        ? product.description.slice(0, maxChars) + "..."
        : product.description;

    const descriptionWithReadMore =
      product.description.length > maxChars
        ? `${truncatedDescription} <a href="/products/${product._id}">(Read More)</a>`
        : truncatedDescription;

 
    return (
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: descriptionWithReadMore }}
      />
    );
  }
  const [change, setChange] = useState(false);
 
  return (
    <>
      <Header newChange={change}  />
      <Filter />
      <div className="product-pg">
        <div>
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
                          <TruncatedDescription product={product} />
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
                        <AddToCart
                          Added={() => setChange(!change)}
                          product={product}
                        />
                      </CardBody>
                    </div>
                  ))
                ) : (
                  <div className="alert alert-dark">
                    No product found currently pls try later
                  </div>
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
          {}
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

export function Filter({ setFilter }) {
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
          <FontAwesomeIcon icon={faSort} /> <span>Categories</span>
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

export function Category() {
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div  className={isMobile ? "mobile-hidden":"Category-side"}>
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
