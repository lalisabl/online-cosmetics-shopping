import React from "react"; // Import your CSS file

export function LoadingCard({ more }) {
  return (
    <div className="loading-card">
      <span className="loading-text">{more}</span>
    </div>
  );
}

export function LoadingCardList() {
  return (
    <div className="loading-container">
      <div className="large-card"></div>
      <div className="right-cards">
        {" "}
        <div className="small-card"></div>
        <div className="small-card"></div>
      </div>
    </div>
  );
}
