import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
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

function Product({ product, deleteProduct, hideProduct, EditProduct }) {
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
                onClick={() => EditProduct(product._id)}
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
            </div>
          </div>
        </>
      </Card>
    </div>
  );
}

export function CreateProduct() {
  
  const [productData, setProductData] = useState({
    promotionsDiscounts: {
      discountPercentage: 20,
      promoCode: "GLAM20",
      startDate: "2023-07-01T00:00:00.000Z",
      endDate: "2023-07-31T00:00:00.000Z",
    },
    name: "Matte Lipstick",
    description: "A long-lasting matte lipstick with vibrant colors.",
    brand: "Glam Beauty",
    category: "Makeup",
    subcategory: "Lipstick",
    price: 12.99,
    stockQuantity: 50,
    images: [
      "product-7-1697572686421-7.jpeg",
      "product-4-1697572686421-4.jpeg",
      "product-6-1697572686421-6.jpeg",
    ],
    sizeVolume: "4g",
    weightQuantity: 10,
    colors: ["Red Velvet", "Nude Charm", "Coral Crush"],
    skinType: [],
    reviewQuantity: "0",
    dateAdded: "2023-06-20T00:00:00.000Z",
    tagsKeywords: ["makeup", "lipstick", "beauty"],
    skinType: ["white", "brown", "black"],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Product Data Submitted:", productData);
  };

  const handleImageChange = (event) => {
    const selectedImages = event.target.files;
    const imageArray = [];

    for (let i = 0; i < selectedImages.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        imageArray.push(e.target.result);
        if (imageArray.length === selectedImages.length) {
          setProductData({
            ...productData,
            images: imageArray,
          });
        }
      };

      reader.readAsDataURL(selectedImages[i]);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">Create new post</CardHeader>
      <CardBody className="ml-6 mr-6">
        <div className="image-preview">
          {productData.images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Image ${index}`}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="form">
          <label>Images:</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            className="form-control"
            multiple
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Subcategory:</label>
          <input
            type="text"
            name="subcategory"
            value={productData.subcategory}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="form-control"
          />

          <label>Size/Volume:</label>
          <input
            type="text"
            name="sizeVolume"
            value={productData.sizeVolume}
            onChange={handleInputChange}
            className="form-control"
          />
          <label> Quantity:</label>
          <input
            type="number"
            name="weightQuantity"
            value={productData.weightQuantity}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>Colors:</label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={handleInputChange}
            className="form-control"
          />

          <label>Tags/Keywords:</label>
          <input
            type="text"
            name="tagsKeywords"
            value={productData.tagsKeywords.join(", ")}
            onChange={handleInputChange}
            className="form-control"
          />
          <label>skin Type:</label>
          <input
            type="text"
            name="skinType"
            value={productData.skinType}
            onChange={handleInputChange}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </CardBody>
    </Card>
  );
}
