import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";
import {
  faTrash,
  faEyeSlash,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingCard, LoadingCardList } from "../shared/LoadingCard";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/Products")
      .then((res) => {
        setProducts(res.data.data.Products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);
  return (
    <div>
      {!loading ? (
        !error ? (
          products.length > 0 ? (
            <>
              {products.map((product) => (
                <div key={product.id}>
                  <Product product={product} />
                </div>
              ))}
            </>
          ) : (
            <div>No product found</div>
          )
        ) : (
          <>Error happened while fetching data</>
        )
      ) : (
        <>
          {" "}
          <LoadingCardList />
          <LoadingCardList />
          <LoadingCardList />
          <LoadingCardList />
          <LoadingCardList />
          <LoadingCardList />
        </>
      )}
    </div>
  );
}

function Product({ product }) {
  const [hide, setHide] = useState(false);
  const [promote, setPromote] = useState(false);

  useEffect(() => {}, []);
  return (
    <div className="wider-displays-dshb">
      <Card>
        <>
          {" "}
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
        </>
      </Card>
    </div>
  );
}
