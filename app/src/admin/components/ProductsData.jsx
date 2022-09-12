import React, { useState, useEffect } from "react";
import "./scss/productsData.scss";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteMsg from "./DeleteMsg";

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
  quantity,
  updateProductData,
  openEditForm,
}) => {
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [productId, setproductId] = useState("");
  const [productImage, setproductImage] = useState("");
  const hideDeleteMsg = () => {
    setDeleteMsg(false);
  };

  const getIdImgproduct = (img, id) => {
    setDeleteMsg(true);
    setproductId(id);
    setproductImage(img);
  };

  const deleteProduct = () => {
    axios
      .post("http://localhost:8080/adminTask/v1/deleteProduct", {
        productId,
        productImage,
      })
      .then((res) => {
        if (res.data.actionState === true) {
          toast.success(res.data.desc);
          updateProductData(id);
          setproductId("");
        } else {
          setproductId("");
          toast.error(res.data.desc);
        }
      });
  };
  return (
    <div className="GridItem">
      <img src={`http://localhost:8080/${img}`} alt={title} />
      <div className="content">
        <h2>{title}</h2>
        <p>{desc}</p>
        <div className="bottom">
          <div className="_1_col">
            <h4>{categorie}</h4>
            <h5>{mark}</h5>
            <h5>Quantity: {quantity}</h5>
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
            onClick={() => getIdImgproduct(img, id)}
          ></i>
          <i
            title="Edit This Product"
            className="fa-solid fa-pen-to-square icon edit"
            onClick={() =>
              openEditForm(
                id,
                title,
                desc,
                categorie,
                mark,
                newPrice,
                oldPrice,
                img,
                quantity
              )
            }
          ></i>
        </div>
      </div>
      {deleteMsg && (
        <DeleteMsg
          title="Êtes-vous sûr de vouloir supprimer ce produit"
          subTitle=""
          action="deleteProduit"
          deleteProduct={deleteProduct}
          hideDeleteMsg={hideDeleteMsg}
        />
      )}
    </div>
  );
};

export default ProductsData;
