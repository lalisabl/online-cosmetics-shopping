import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";
import {
  faTrash,
  faEyeSlash,
  faPencilAlt,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingCard, LoadingCardList } from "../shared/LoadingCard";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteProd, setDeleteProduct] = useState(false);
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
  }, [deleteProd]);

  function deleteProduct(prod_id) {
    axios
      .delete("http://localhost:3000/api/v1/Products/" + prod_id)
      .then((res) => {
        // console.log(res);
        setDeleteProduct(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      {!loading ? (
        !error ? (
          products.length > 0 ? (
            <>
              {products.map((product) => (
                <div key={product.id}>
                  <Product deleteProduct={deleteProduct} product={product} />
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

function Product({ product, deleteProduct, hideProduct, promoteProduct }) {
  const [hide, setHide] = useState(false);
  const [promote, setPromote] = useState(false);

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
              <button
                className="btn btn-secondary"
                onClick={() => deleteProduct(product._id)}
              >
                {" "}
                <FontAwesomeIcon icon={faPencilAlt} />
                edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteProduct(product._id)}
              >
                {" "}
                <FontAwesomeIcon icon={faTrash} />
                remove
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => hideProduct(product._id)}
              >
                {" "}
                <FontAwesomeIcon icon={faEyeSlash} />
                Hide
              </button>
              <button
                className="btn btn-primary"
                onClick={() => promoteProduct(product._id)}
              >
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
