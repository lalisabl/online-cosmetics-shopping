// ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import CartModal from "./CartModal";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/api/v1/Products/") // Replace with your API endpoint
      .then((response) => setProducts(response.data.data.Products))
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setShowCartModal(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Product List</h1>
      <div className="card-deck">
        {products.map((product) => (
          <Card key={product._id}>
            <CardImg
              src={product.images[0]}
              alt={product.name}
              variant="top"
            />
            <CardBody>
              <CardTitle>{product.name}</CardTitle>
              <CardText>{product.description}</CardText>
              <CardText>Price: ${product.price}</CardText>
              <Button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      <CartModal
        product={selectedProduct}
        show={showCartModal}
        onHide={() => setShowCartModal(false)}
      />
    </div>
  );
}

export default ProductList;
