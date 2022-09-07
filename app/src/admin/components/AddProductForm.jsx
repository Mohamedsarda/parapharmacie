import React, { useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloseIcon from "@mui/icons-material/Close";
import "./scss/addProductForm.scss";
import axios from "axios";
import { toast } from "react-toastify";

const AddProductForm = ({ closeProductForm, getProductsData }) => {
  const [file, setFile] = useState("");
  const [product, setProduct] = useState({
    productName: "",
    productOldPrice: "",
    productCurrentPrice: "",
    productDescription: "",
    productMark: "Zabi",
    productCategorie: "salah",
    productQuantitie: 2,
  });

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productOldPrice", product.productOldPrice);
    formData.append("productCurrentPrice", product.productCurrentPrice);
    formData.append("productDescription", product.productDescription);
    formData.append("productMark", product.productMark);
    formData.append("productCategorie", product.productCategorie);
    formData.append("productQuantitie", product.productQuantitie);
    formData.append("file", file);
    axios
      .post("http://localhost:8080/adminTask/v1/addProduct", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.actionState) {
          getProductsData();
          toast.success(res.data.desc);
          closeProductForm();
        } else {
          toast.error(res.data.desc);
        }
      });
  };
  return (
    <div className="AddProductForm">
      <form>
        <CloseIcon onClick={closeProductForm} className="close" />
        <div className="left">
          <div className="row">
            <label>Product Name</label>
            <input type="text" name="productName" onChange={handleChange} />
          </div>
          <div className="__col">
            <div className="row">
              <label>New Price</label>
              <input
                type="Number"
                name="productCurrentPrice"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Old Price</label>
              <input
                type="Number"
                name="productOldPrice"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="row img">
            <label htmlFor="file">
              <img
                src={file ? URL.createObjectURL(file) : "../no-image.jpg"}
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
            <label>Description</label>
            <textarea
              name="productDescription"
              id=""
              cols="15"
              rows="10"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="btn">
          <button onClick={(e) => handleAddProduct(e)}>add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
