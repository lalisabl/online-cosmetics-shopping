import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import {
  faTrash,
  faEyeSlash,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { LoadingCardList } from "../shared/LoadingCard";
import GenericModal from "../shared/GenericModal";

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
  const [uploading, setUploading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    subcategory: "",
    price: 0,
    stockQuantity: 0,
    images: [],
    sizeVolume: "",
    weightQuantity: 0,
    colors: ["Red Velvet", "Nude Charm", "Coral Crush"],
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
    setUploading(true);
    event.preventDefault();
    const formData = new FormData();

    // Add form data fields to the FormData object
    Object.entries(productData).forEach(([key, value]) => {
      !(key === "images") && formData.append(key, value);
    });

    productData.images.forEach((files) => {
      formData.append("images", files);
    });
    axios
      .post("http://localhost:3000/api/v1/Products/", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          setUploading(false);
          setProductData({
            name: "",
            description: "",
            brand: "",
            category: "",
            subcategory: "",
            price: 0,
            stockQuantity: 0,
            images: [],
            sizeVolume: "",
            weightQuantity: 0,
            colors: ["Red Velvet", "Nude Charm", "Coral Crush"],
            skinType: ["white", "brown", "black"],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  useEffect(() => {}, [uploading]);

  // const handleImageChange = (event) => {
  //   const selectedImages = event.target.files;
  //   const imageArray = [...productData.images]; // Clone the existing images

  //   if (imageArray.length < 3) {
  //     for (let i = 0; i < selectedImages.length; i++) {
  //       if (imageArray.length < 3) {
  //         const reader = new FileReader();

  //         reader.onload = (e) => {
  //           imageArray.push(e.target.result);
  //           if (imageArray.length === selectedImages.length) {
  //             setProductData({
  //               ...productData,
  //               images: imageArray,
  //             });
  //           }
  //         };

  //         reader.readAsDataURL(selectedImages[i]);
  //       }
  //     }
  //   }
  // };
  const [images, setImages] = useState([]);
  const [imagesPrev, setImagesPrev] = useState([]);

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    const imageArray = Array.from(selectedImages);
    setImages(imageArray);

    // Create an array to store image previews
    const imagePreviewArray = [];

    for (let i = 0; i < selectedImages.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        imagePreviewArray.push(e.target.result);

        // Check if we have created previews for all selected images
        if (imagePreviewArray.length === selectedImages.length) {
          setImagesPrev(imagePreviewArray); // Set the image previews
        }
      };
      reader.readAsDataURL(selectedImages[i]);
    }
  };
  useEffect(() => {
    productData.images = [...images];
    // console.log(productData.images);
  }, [images]);

  return (
    <>
      {uploading ? (
        <>
          {" "}
          <OperationMessage
            class_name="alert-success"
            msg={"successfully uploaded"}
          />
        </>
      ) : (
        <>
          <Card>
            <CardHeader className="text-center">Create new post</CardHeader>
            <CardBody className="ml-6 mr-6">
              <div className="image-preview">
                {imagesPrev.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} />
                ))}
              </div>
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                {productData.images.length >= 3 ? (
                  ""
                ) : (
                  <label htmlFor="addImage">
                    <img width={160} src="image/addPhoto.png" />
                  </label>
                )}
                <br />
                <input
                  type="file"
                  name="images"
                  id="addImage"
                  hidden={true}
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
                <select
                  value={productData.category}
                  onChange={handleInputChange}
                  name="category"
                  className="form-control"
                >
                  <option>select one</option>
                  <option value={"skincare"}>Skincare</option>
                  <option value={"makeup"}>Makeup</option>
                  <option value={"haircare"}>Haircare</option>
                  <option value={"fragrances"}>Fragrances</option>
                  <option value={"bath"}>Bath and Body</option>
                  <option value={"nail"}>Nail Care</option>
                  <option value={"organic"}>Organic and Natural</option>
                  <option value={"gift"}>Gift Sets</option>
                  <option value={"accessories"}>Accessories</option>
                </select>

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
                  name="stockQuantity"
                  value={productData.stockQuantity}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label>Colors:</label>
                <input
                  type="text"
                  name="colors"
                  value={productData.colors}
                  onChange={handleInputChange}
                  className="form-control"
                />

                <label>Tags/Keywords:</label>
                <input
                  type="text"
                  name="tagsKeywords"
                  value={productData.tagsKeywords}
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
        </>
      )}
    </>
  );
}

export function OperationMessage({ msg, class_name }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <GenericModal isOpen={isModalOpen} onClose={closeModal}>
        <Msg msg={msg} class_name={class_name} />
      </GenericModal>
    </div>
  );
}
function Msg({ msg, class_name }) {
  return <div className={`alert ` + class_name}>{msg}</div>;
}
