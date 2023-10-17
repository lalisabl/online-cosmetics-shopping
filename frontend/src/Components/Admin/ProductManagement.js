import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/Products")
      .then((res) => {
        console.log(res.data.data.Products);
        setProducts(res.data.data.Products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {products.length > 0 ? (
        <>
          {products.map((product) => (
            <div key={product.id}>
              <Product product={product} />
            </div>
          ))}
        </>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
}

function Product({ product }) {
  return (
    <div className="wider-displays-dshb">
      <Card>
        <img
          src={`http://localhost:3000/images/products/` + product.images[0]}
          alt="product image 1"
        />
        <div className="manager-admin">
          <div>
            <CardTitle>{product.name}</CardTitle>
          </div>
          <div className="action-admin">
            <button className="btn btn-danger">remove</button> 
            <button  className="btn btn-secondary">Hide</button>
            <button className="btn btn-primary">Promote</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
