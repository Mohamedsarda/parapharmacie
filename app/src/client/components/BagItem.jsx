import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./scss/BagItem.scss";
import axios from "axios";
import { toast } from "react-toastify";

const BagItem = ({
  removeProductsFromCart,
  orderId,
  orderPrice,
  orderQuantity,
  productCurrentPrice,
  productDescription,
  productImages,
  productName,
  productOldPrice,
  updateTotalPrice,
}) => {
  const [quantity, setQuantity] = useState(orderQuantity);

  const addToQuantity = () => {
    if (quantity === 5) {
      setQuantity(5);
    } else {
      setQuantity(quantity + 1);
      updateTotalPrice(productCurrentPrice, "+");
      updatePorductQuantity(quantity + 1);
    }
  };
  const removeFromQuantity = () => {
    if (quantity === 1) {
      console.log("");
    } else {
      setQuantity(quantity - 1);
      updatePorductQuantity(quantity - 1);
      updateTotalPrice(productCurrentPrice, "-");
    }
  };

  const updatePorductQuantity = (qnt) => {
    axios
      .post("http://localhost:8080/clientActions/v1/editProductInCart", {
        orderId,
        orderQuantity: qnt,
      })
      .then((res) => {
        if (res.data.actionState) {
          toast.success(res.data.desc);
        } else {
          toast.error(res.data.desc);
        }
      });
  };

  const handleDelete = (id, price) => {
    removeProductsFromCart(id);
    updateTotalPrice(price, "-");
  };
  return (
    <div className="BagItem">
      <img src={`http://localhost:8080/${productImages}`} alt="" />
      <div className="content">
        <div className="title">
          <h1>{productName}</h1>
          <p>{productDescription.slice(0, 200)}...</p>
        </div>
        <div className="_2-col">
          <div className="row">
            {productOldPrice !== 0 ? (
              <h5 className="line-through">Old Price : {productOldPrice}DH</h5>
            ) : (
              ""
            )}
            <h5>New Price : {productCurrentPrice}DH</h5>
          </div>
          <div className="row">
            <div className="quantityCount">
              <span onClick={removeFromQuantity}>-</span>
              <span>{quantity}</span>
              <span onClick={addToQuantity}>+</span>
            </div>
          </div>
        </div>
        <CloseIcon
          onClick={() => handleDelete(orderId, productCurrentPrice)}
          className="icon"
        />
      </div>
    </div>
  );
};

export default BagItem;
