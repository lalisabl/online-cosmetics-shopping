import React from "react";

const Cart = ({ cartItems, onCloseCart }) => {
  return (
    <div className="cart-modal">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <button onClick={onCloseCart}>Close</button>
      </div>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            {item.name} - ${item.price}
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
