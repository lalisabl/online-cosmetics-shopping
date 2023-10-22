// CartPage.js
import React from "react";

function CartPage({ cartItems }) {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      {/* You can add more cart details, checkout buttons, and functionality here */}
    </div>
  );
}

export default CartPage;
