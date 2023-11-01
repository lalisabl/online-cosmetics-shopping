import React from "react";
import "./HomeCard.css";
import { useNavigate } from "react-router-dom";
export default function HomeCard() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="cards cardss">
        <div
          className="card cardd"
          onClick={() => {
            navigate("/products/?category=skincare");
          }}
        >
          <div className="card-img">
            <img className="card-image" src="image/skincare.webp" alt="" />
          </div>
          <div className="producttitle">Skincare</div>
        </div>

        <div
          className="card cardd"
          onClick={() => {
            navigate("/products/?category=haircare");
          }}
        >
          <div className="card-img">
            <img className="card-image" src="image/cosmetic.jpg" alt="" />
          </div>
          <div className="producttitle">Haircare</div>
        </div>

        <div
          className="card cardd"
          onClick={() => {
            navigate("/products/?category=makeup");
          }}
        >
          <div className="card-img">
            <img className="card-image" src="image/makeup.jpg" alt="" />
          </div>
          <div className="producttitle">Makeup</div>
        </div>
        <div
          className="card cardd"
          onClick={() => {
            navigate("/products/?category=fragrances");
          }}
        >
          <div className="card-img">
            <img className="card-image" src="image/fragrences.jpg" alt="" />
          </div>
          <div className="producttitle">Fragrances</div>
        </div>
      </div>
    </div>
  );
}
