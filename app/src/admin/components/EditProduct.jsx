import React, { useState, useEffect } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloseIcon from "@mui/icons-material/Close";
import "./scss/addProductForm.scss";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/loading";

const EditProduct = ({ getProductsData, closeEditForm, productData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState("");
  const [marks, setMarks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    productId: productData.id,
    productName: productData.title,
    productOldPrice: productData.oldPrice,
    productCurrentPrice: productData.newPrice,
    productDescription: productData.desc,
    productMark: productData.mark,
    productCategorie: productData.categorie,
    productQuantitie: productData.quantity,
    oldImg: productData.img,
  });
  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };
  const getMarks = () => {
    axios.get("http://localhost:8080/clientActions/v1/getMarks").then((res) => {
      if (res.data.actionState === true) {
        setMarks(res.data.marks);
      }
    });
  };
  const getCategories = () => {
    axios
      .get("http://localhost:8080/clientActions/v1/getCategories")
      .then((res) => {
        if (res.data.actionState === true) {
          setCategories(res.data.categories);
        }
      });
  };

  useEffect(() => {
    getMarks();
    getCategories();
  }, []);

  const handelEditProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productId", productData.id);
    formData.append("productName", product.productName);
    formData.append("productOldPrice", product.productOldPrice);
    formData.append("productCurrentPrice", product.productCurrentPrice);
    formData.append("productDescription", product.productDescription);
    formData.append("productMark", product.productMark);
    formData.append("productCategorie", product.productCategorie);
    formData.append("productQuantitie", product.productQuantitie);
    formData.append("file", file);
    formData.append("oldImg", productData.img);
    setIsLoading(false);
    axios
      .post("http://localhost:8080/adminTask/v1/editProduct", formData)
      .then((res) => {
        if (res.data.actionState) {
          getProductsData();
          toast.success(res.data.desc);
          closeEditForm();
          setIsLoading(true);
        } else {
          toast.error(res.data.desc);
          setIsLoading(true);
        }
      });
  };
  return (
    <>
      {isLoading ? (
        <>
          <div key="editForm" className="AddProductForm">
            <form>
              <CloseIcon onClick={closeEditForm} className="close" />
              <div className="left">
                <div className="row">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    defaultValue={productData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="__col">
                  <div className="row">
                    <label>New Price</label>
                    <input
                      type="Number"
                      name="productCurrentPrice"
                      defaultValue={productData.newPrice}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row">
                    <label>Old Price</label>
                    <input
                      type="Number"
                      name="productOldPrice"
                      defaultValue={productData.oldPrice}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="">Quantitie</label>
                  <input
                    type="number"
                    name="productQuantitie"
                    defaultValue={productData.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="right">
                <div className="row img">
                  <label htmlFor="file">
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : `http://localhost:8080/${productData.img}`
                      }
                      alt=""
                    />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    // onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="row">
                  <label>Select A Caegorie</label>
                  <select name="productCategorie" onChange={handleChange}>
                    <option value={productData.categorie}>
                      {productData.categorie}
                    </option>
                    {categories.map((categorie) => {
                      return (
                        <option value={categorie.categorieName}>
                          {categorie.categorieName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="row">
                  <label>Select A Mark</label>
                  <select name="productMark" onChange={handleChange}>
                    <option value={productData.mark}>{productData.mark}</option>
                    {marks.map((mark) => {
                      return (
                        <option value={mark.markName}>{mark.markName}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="row">
                  <label>Description</label>
                  <textarea
                    name="productDescription"
                    cols="15"
                    rows="10"
                    onChange={handleChange}
                  >
                    {productData.desc}
                  </textarea>
                </div>
              </div>
              <div className="btn">
                <button onClick={(e) => handelEditProduct(e)}>
                  Edit Product
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditProduct;
