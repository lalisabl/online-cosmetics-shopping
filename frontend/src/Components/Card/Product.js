import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "../Cart/Cart"; // Adjust the import path to match the location of your Cart component
import Header from "../Header/Header";
import { CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { LoadingCard, LoadingCardVert } from "../shared/LoadingCard";
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

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/v1/Products/") // Replace with your API endpoint
      .then((response) => {
        setProducts(response.data.data.Products);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="cardContainer">
        <div className="cards product-displayer">
          {!loading ? (
            !error ? (
              products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="card">
                    <div className="card-img">
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
                      <div className="product-description">
                        {product.description}
                      </div>
                      <div className="product-price">
                        <span className="price">{product.price} birr</span>
                        /piece
                      </div>
                      <div className="rating">
                        <span className="av-rating">
                          4.8 <FontAwesomeIcon icon={faStar} />
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
export default Product;
