import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoadingCard, LoadingCardVert } from "../shared/LoadingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProductDetails.css";
import Starrating from "./Starrating";
import Review from "./Review";
import Header from "../Header/Header";
import { Category, Filter } from "./Product";

export function ProductDetails() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [userRating, setUseRating] = useState(0);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [comment, setcomment] = useState("");
  //
  const [count, setCount] = useState(0);

  function slideLeft() {
    setCount((prevCount) => (prevCount <= 0 ? 2 : prevCount - 1));
  }

  function slideRight() {
    setCount((prevCount) => (prevCount >= 2 ? 0 : prevCount + 1));
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/Products/${id}`) // Replace with your API endpoint
      .then((response) => {
        setProduct(response.data.data.product);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, [id]);

  function handlesubmit(e) {
    e.preventDefault();
    const updatedProduct = {
      rating: userRating,
      review: comment,
    };

    axios
      .post(
        `http://localhost:3000/api/v1/Products/${id}/reviews`,
        updatedProduct,
        { withCredentials: true }
      )
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setcomment(""); // Reset the comment value
        setUseRating(0); // Reset the userRating value
      });
  }

  return (
    <>
      <Header />
      <Filter />
      <Category />
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
            id={id}
            count={count}
            slideLeft={slideLeft}
            slideRight={slideRight}
          />
        )}
      </div>
    </>
  );
}

function ProductDet({
  product,
  userRating,
  setUseRating,
  handlesubmit,
  comment,
  setcomment,
  id,
  slideLeft,
  slideRight,
  count,
}) {
  return (
    <>
      <div className="det">
        <div className=" carddetail">
          <div className="cardimg">
            <button className="slider__btn btn--left" onClick={slideLeft}>
              &larr;
            </button>
            <img
              className="card-image"
              src={
                "http://localhost:3000/images/products/" + product.images[count]
              }
              alt={product.name}
              variant="top"
            />
            <button className="slider__btn btn--right" onClick={slideRight}>
              &rarr;
            </button>
          </div>
          <div className="cardbody">
            <div className="product-title">{product.name}</div>
            <h2 className="desc">Description</h2>
            <div className="product-description">{product.description}</div>
            <div className="product-price">
              <span className="price">{product.price} birr</span>
              /piece
            </div>
            <div className="rating">
              <span className="av-rating">
                {product.ratingsAverage} <FontAwesomeIcon icon={faStar} />
              </span>
              ( {product.ratingQuantity} ratings)
            </div>
            <div className="ratings">
              <h5>Give Rating: </h5>
              <Starrating
                maxrating={5}
                size={24}
                onsetRating={setUseRating}
                userRating={userRating}
              />
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
        <Review id={id} />
      </div>
    </>
  );
}
