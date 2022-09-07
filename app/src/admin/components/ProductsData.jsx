import React, { useState, useEffect } from "react";
import "./scss/productsData.scss";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ProductsData = ({
  action,
  id,
  title,
  desc,
  img,
  categorie,
  mark,
  oldPrice,
  newPrice,
  updateProductData,
}) => {
  const deleteProduct = (img, id) => {
    axios
      .post("http://localhost:8080/adminTask/v1/deleteProduct", {
        productId: id,
        productImage: img,
      })
      .then((res) => {
        if (res.data.actionState === true) {
          toast.success(res.data.desc);
          updateProductData(id);
        } else {
          toast.error(res.data.desc);
        }
        console.log(res.data);
      });
  };
  return (
    <div key={id} className="GridItem">
      <img src={`http://localhost:8080/${img}`} alt={title} />
      <div className="content">
        <h2>{title}</h2>
        <p>{desc}</p>
        <div className="bottom">
          <div className="_1_col">
            <h4>{categorie}</h4>
            <h5>{mark}</h5>
          </div>
          <div className="_2_col">
            <h4>{newPrice} DH</h4>
            <h5>{oldPrice} DH</h5>
          </div>
        </div>
        <div className="btn">
          <i title="Order Now" className="fa-solid fa-bag-shopping"></i>
          <i
            title="Delete This Product"
            className="fa-solid fa-trash icon delete"
            onClick={() => deleteProduct(img, id)}
          ></i>
          <i
            title="Edit This Product"
            className="fa-solid fa-pen-to-square icon edit"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ProductsData;
