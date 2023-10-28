import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingCard, LoadingCardVert } from "../shared/LoadingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProductDetails.css";
import Starrating from "./Starrating";
export function ProductDetails() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [userRating, setUseRating] = useState(0);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [comment, setcomment] = useState("");
  //
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:3000/api/v1/Products/${id}`) // Replace with your API endpoint
      .then((response) => {
        setProduct(response.data.data.product);
        setLoading(false);
        console.log(response.data.data.product);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError(true);
      });
  }, [id]);
  // function handlesubmit() {
  //   const updatedProduct = { ...product, product.ratingQuantity: userRating  product.review:comment};

  //   useEffect(() => {
  //     axios
  //       .post(
  //         `http://127.0.0.1:3000/api/v1/Products/${id}/reviews/`,
  //         updatedProduct
  //       )
  //       .then((response) => {
  //         // Handle the response from the API, e.g., show a success message.
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         // Handle errors, e.g., display an error message.
  //         console.error(error);
  //       });
  //   }, [userRating]);
  // }
  function handlesubmit(e) {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      rating: userRating,
      review: comment,
    };
    console.log(updatedProduct.rating, updatedProduct.review);
    axios
      .post(
        `http://localhost:3000/api/v1/Products/${id}/reviews/`,
        updatedProduct,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        // Handle the response as needed
        setcomment("");
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  }

  return (
    <div className="Product-details">
      {loading && <LoadingCardVert />}
      {error && (
        <div className="alert alert-danger">
          error happened while fetching data
        </div>
      )}
      {!loading && !error && (
        <ProductDet
          product={product}
          setUseRating={setUseRating}
          userRating={userRating}
          handlesubmit={handlesubmit}
          comment={comment}
          setcomment={setcomment}
        />
      )}
    </div>
  );
}
function ProductDet({
  product,
  userRating,
  setUseRating,
  handlesubmit,
  comment,
  setcomment,
}) {
  return (
    <div className=" carddetail">
      <div className="cardimg">
        <img
          className="card-image"
          src={"http://localhost:3000/images/products/" + product.images[0]}
          alt={product.name}
          variant="top"
        />
      </div>
      <div className="cardbody">
        <div className="product-title">{product.name}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-price">
          <span className="price">{product.price} birr</span>
          /piece
        </div>
        <div className="rating">
          <span className="av-rating">
            4.8 <FontAwesomeIcon icon={faStar} />
          </span>
          ( {product.ratingQuantity} ratings)
        </div>
        <div className="ratings">
          <Starrating maxrating={5} size={24} onsetRating={setUseRating} />
        </div>
        <div className="review">
          <form className="form" onSubmit={handlesubmit}>
            {" "}
            <input
              type="text"
              placeholder="write a comment"
              className="text"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            ></input>
            <button>
              <svg className="search-icon">
                <use xlinkHref="/image/sprite.svg#icon-paper-plane"></use>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
