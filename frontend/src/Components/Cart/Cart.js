import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { LoadingCardList, LoadingCardVert } from "../shared/LoadingCard";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSort } from "@fortawesome/free-solid-svg-icons";
import GenericModal from "../shared/GenericModal";
import Login from "../../login";

export default function Carts({ closeCart, removed }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [totalPrice, setTotalPrice] = useState("");
  useEffect(() => {
    removed();
    axios
      .get("http://localhost:3000/api/v1/cart", {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data.data.cart.items);
        setTotalPrice(res.data.data.cart.totalPrice);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
        console.log(err.response.status);
        if (err.response.status === 401) {
          setLoggedIn(false);
        }
      });
  }, [change]);
  const [isLoginModalOpen, setLoginIsModalOpen] = useState(false);
  useEffect(() => {
    setLoginIsModalOpen(!isLoggedIn);
  }, [isLoggedIn]);
  const closeLoginModal = () => {
    setLoginIsModalOpen(false);
    setLoggedIn(true);
  };
  function TruncatedDescription({ product }) {
    const maxChars = 20;
    const truncatedDescription =
      product.description.length > maxChars
        ? product.description.slice(0, maxChars) + "..."
        : product.description;

    const descriptionWithReadMore =
      product.description.length > maxChars
        ? `${truncatedDescription} <span className="link" href="/products/${product._id}">Read More</span>`
        : truncatedDescription;

    return (
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: descriptionWithReadMore }}
      />
    );
  }
  return (
    <>
      {!isLoggedIn && (
        <div className="login-modal">
          <GenericModal
            isOpen={isLoginModalOpen}
            onClose={closeLoginModal}
            children={
              <>
                <span className="alert alert-danger">{error}</span> <Login />
              </>
            }
          />
        </div>
      )}
      <div onClick={closeCart} className="cart-bg"></div>
      <div className="cart-disp">
        <span className="modal-close" onClick={closeCart}>
          {" "}
          &times;
        </span>
        {!error ? (
          !loading ? (
            <>
              <h4>Your Shopping Cart</h4>
              <hr />
              <div className="cart-items">
                <div className="cards product-displayer">
                  {products.length > 0 ? (
                    products.map((i) => (
                      <div key={i.product._id} className="card">
                        <div
                          className="card-img"
                          onClick={() => {
                            navigate(`/products/${i.product._id}`);
                          }}
                        >
                          <img
                            className="card-image"
                            src={
                              "http://localhost:3000/images/products/" +
                              i.product.images[0]
                            }
                            alt={i.product.name}
                            variant="top"
                          />
                        </div>
                        <CardBody>
                          <div className="product-title">{i.product.name}</div>
                          <div
                            className="product-description"
                            onClick={() => {
                              navigate(`/products/${i.product._id}`);
                            }}
                          >
                            <TruncatedDescription product={i.product} />
                          </div>
                          <div className="product-price">
                            <span className="price">
                              {i.product.price} birr
                            </span>
                            /piece
                          </div>

                          <RemoveFromCart
                            itemId={i.product._id}
                            deleted={() => setChange(!change)}
                          />
                        </CardBody>
                      </div>
                    ))
                  ) : (
                    <div className="alert alert-dark">
                      No product found currently pls try later
                    </div>
                  )}
                </div>
                <div className="alert alert-info">
                  {" "}
                  total Price is :{totalPrice}
                </div>
              </div>
              <div className="cart-footer">
                <button className="add-cart">Order now</button>
              </div>
            </>
          ) : (
            <>
              <LoadingCardVert />
            </>
          )
        ) : (
          <div className="alert alert-danger">{error}</div>
        )}
      </div>
    </>
  );
}

function RemoveFromCart({ itemId, deleted }) {
  const removeCart = () => {
    axios
      .delete("http://localhost:3000/api/v1/cart/" + itemId, {
        withCredentials: true,
      })
      .then((res) => {
        return deleted;
      })
      .catch((err) => {
        console.log(err.response);
        deleted();
      });
  };
  return (
    <button className="btn btn-danger" onClick={removeCart}>
      remove
    </button>
  );
}
