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
        console.log(response.data.data.product.reviews);
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
        <div className="reviews">
          {reviews.map((review) => (
            <ReviewDet key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
function ReviewDet({ review }) {
  console.log(review.user);
  return (
    <div className="reviewdet">
      <div className="user-image"></div>
      <div className="reviewheader">{review.user.fullName}</div>

      <div className="reviw">
        <p>{review.review}</p>
      </div>
    </div>
  );
}
