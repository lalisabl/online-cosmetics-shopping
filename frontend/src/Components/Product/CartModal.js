// CartModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

function CartModal({ product, show, onHide }) {
  // Check if the 'product' is defined before accessing its properties
  if (!product) {
    return null; // Render nothing if 'product' is not defined
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Product Added to Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{product.name}</h5>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        {/* You can include additional information or actions here */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onHide}>
          Go to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
