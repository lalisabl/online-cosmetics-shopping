import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";
import {
  faTrash,
  faEyeSlash,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../shared/loadingSVG";

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
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);
  const [promote, setPromote] = useState(false);

  useEffect(() => {
    setTimeout(setLoading(false), 2000);
  }, []);

  useEffect(() => {}, []);
  return (
    <div className="wider-displays-dshb">
      {loading ? (
        <Loading />
      ) : (
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
              <button className="btn btn-danger">
                {" "}
                <FontAwesomeIcon icon={faTrash} />
                remove
              </button>
              <button className="btn btn-secondary">
                {" "}
                <FontAwesomeIcon icon={faEyeSlash} />
                Hide
              </button>
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faArrowCircleUp} />
                Promote
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
