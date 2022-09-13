import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./scss/BagItem.scss";

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
      setQuantity(1);
    } else {
      setQuantity(quantity + 1);
      updateTotalPrice(productCurrentPrice, "+");
    }
  };
  const removeFromQuantity = () => {
    if (quantity === 1) {
      console.log("no");
    } else {
      setQuantity(quantity - 1);
      updateTotalPrice(productCurrentPrice, "-");
    }
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
          onClick={() => removeProductsFromCart(orderId)}
          className="icon"
        />
      </div>
    </div>
  );
};

export default BagItem;
