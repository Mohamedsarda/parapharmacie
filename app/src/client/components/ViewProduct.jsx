import React, { useState } from "react";
import "./scss/singleProduct.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";

const ViewProduct = ({
  closeSingleProductContainer,
  handleAddToCart,
  singleProductData,
}) => {
  const [quantity, setQuantity] = useState(1);
  const addToQuantity = () => {
    if (quantity === 5) {
      setQuantity(1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const removeFromQuantity = () => {
    if (quantity === 1) {
      console.log("no");
    } else {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="blur">
      <CloseOutlinedIcon
        onClick={closeSingleProductContainer}
        className="icon"
      />
      <div className="productSingle">
        <Link to={`product/${singleProductData.id}`}>
          <img src={`http://localhost:8080/${singleProductData.img}`} alt="" />
        </Link>
        <div className="content">
          <h2>{singleProductData.productName}</h2>
          <div className="_2-col">
            {singleProductData.productOldPrice !== 0 ? (
              <h5 className="line-through">
                Old Price : {singleProductData.productOldPrice}
              </h5>
            ) : (
              ""
            )}
            <h5> New Price : {singleProductData.productCurrentPrice}</h5>
          </div>
          <h4>Description</h4>
          <p>{singleProductData.productDescription}</p>
          <div className="_2-col btns">
            <div className="quantityCount">
              <span onClick={removeFromQuantity}>-</span>
              <span>{quantity}</span>
              <span onClick={addToQuantity}>+</span>
            </div>
            <div>
              <button
                onClick={() =>
                  handleAddToCart(
                    singleProductData.id,
                    quantity,
                    singleProductData.productCurrentPrice
                  )
                }
              >
                <ShoppingCartOutlinedIcon /> AJOUTER AU PANIER
              </button>
            </div>
          </div>
          <h5>
            Catégorie: <span>{singleProductData.productCategorie}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
