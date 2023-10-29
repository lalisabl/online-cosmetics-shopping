import React from "react";
import "./Review.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { LoadingCardVert } from "../shared/LoadingCard";
export default function Review({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/Products/${id}`) // Replace with your API endpoint
      .then((response) => {
        setReview(response.data.data.product.reviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError(true);
      });
  }, [id]);
  return (
    <div className="Product-details">
      {loading && <LoadingCardVert />}
      {error && (
        <div className="alert alert-danger">
          error happened while fetching data
        </div>
      )}
      {!loading && !error && (
        <>
          <h2 className="rev">Featured reviews</h2>
          <div className="reviews">
            {reviews.map((review) => (
              <ReviewDet key={review._id} review={review} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
function ReviewDet({ review }) {
  return (
    <div className="reviewdet">
      <div className="reviewhead">
        <div className="user-image">
          <img
            src={
              review.user.photo
                ? `http://localhost:3000/images/users/` + review.user.photo
                : "./image/userplaceholder.jpg"
            }
          />
        </div>
        <div className="reviewheader">{review.user.fullName}</div>
      </div>

      <div className="reviw">
        <p>{review.review}</p>
      </div>
    </div>
  );
}
