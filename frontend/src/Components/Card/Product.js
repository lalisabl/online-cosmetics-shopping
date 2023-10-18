import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faStar
} from "@fortawesome/free-solid-svg-icons";
function Product() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/v1/Products/") // Replace with your API endpoint
      .then((response) => setProducts(response.data.data.Products))
      .catch((error) => console.error(error));
  }, []);
  // console.log(products);
  const addToCart = (product) => {
    axios
      .post(`http://127.0.0.1:3000/api/v1/cart/addProducts/${product._id}`, {
        productId: product.id,
      })
      .then((response) => {
        if (response.status === 200) {
          // Update the cartItems state to track the added product
          setCartItems([...cartItems, product]);
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const removeFromCart = (product) => {
    // Send a DELETE request to remove the product from the cart
    // You may need to adjust the URL and payload based on your API design
    axios
      .delete("http://your-api-url/remove-from-cart", {
        data: { productId: product.id },
      })
      .then((response) => {
        if (response.status === 200) {
          // Update the cartItems state to remove the product
          const updatedCartItems = cartItems.filter(
            (item) => item.id !== product.id
          );
          setCartItems(updatedCartItems);
        }
      })
      .catch((error) => {
        console.error("Error removing from cart:", error);
      });
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
                    <span className="av-rating">4.8 <FontAwesomeIcon icon={faStar} /></span>
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
                        ADD TO CART
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
    </>
  );
}
export default Product;
