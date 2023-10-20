import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Product() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/v1/Products/")
      .then((response) => setProducts(response.data.data.Products))
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (product) => {
    axios
      .post(`http://127.0.0.1:3000/api/v1/cart/addProducts/${product._id}`, {
        productId: product.id,
      })
      .then((response) => {
        if (response.status === 200) {
          setCartItems([...cartItems, product]);
          setAddedToCart({ ...addedToCart, [product.id]: true });
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const removeFromCart = (product) => {
    // Handle removal from cart as needed
  };

  return (
    <>
      <Header />
      <div className="cardContainer">
        <div className="cards product-displayer">
          {products.length > 0 ? (
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
                    <span className="price">{product.price} birr</span>/piece
                  </div>
                  <div className="rating">
                    <span className="av-rating">
                      4.8 <FontAwesomeIcon icon={faStar} />
                    </span>
                  </div>
                  <div className="cart">
                    {cartItems.some((item) => item.id === product.id) ? (
                      <button
                        className="remove-cart"
                        onClick={() => removeFromCart(product)}
                      >
                        REMOVE FROM CART
                      </button>
                    ) : (
                      <button
                        className="add-cart"
                        onClick={() => addToCart(product)}
                      >
                        {addedToCart[product.id]
                          ? "ADDED TO CART"
                          : "ADD TO CART"}
                      </button>
                    )}
                  </div>
                </CardBody>
              </div>
            ))
          ) : (
            <div>No product here</div>
          )}
        </div>
      </div>
      <Cart cartItems={cartItems} />
    </>
  );
}

function Cart({ cartItems }) {
  return (
    <div className="cart-container">
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Product;
