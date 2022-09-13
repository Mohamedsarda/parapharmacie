import React from "react";

import { SplideSlide } from "@splidejs/react-splide";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "@splidejs/splide/css";
import "./scss/slider.scss";

const Slider = ({
  openGetProductInfo,
  handleAddToCart,
  id,
  img,
  productName,
  productOldPrice,
  productQuantities,
  productAddedTime,
  productCategorie,
  productCurrentPrice,
  productDescription,
  productMark,
}) => {
  return (
    <>
      <SplideSlide className="product">
        <img
          onClick={() =>
            openGetProductInfo(
              id,
              img,
              productName,
              productOldPrice,
              productQuantities,
              productAddedTime,
              productCategorie,
              productCurrentPrice,
              productDescription,
              productMark
            )
          }
          src={`http://localhost:8080/${img}`}
          alt=""
        />
        <div className="content">
          <h2>{productName.slice(0, 30)}...</h2>
          <div className="_2-col">
            {productOldPrice !== 0 ? (
              <h5 className="line-through">{productOldPrice}DH</h5>
            ) : (
              ""
            )}
            <h5>{productCurrentPrice}DH</h5>
          </div>
          <div className="_1-col">
            <h5>Mark : {productMark}</h5>
            <h5>Categorie : {productCategorie}</h5>
          </div>
          <button onClick={() => handleAddToCart(id, 1, productCurrentPrice)}>
            <ShoppingCartOutlinedIcon className="icon" />
            AJOUTER AU PANIER
          </button>
        </div>
      </SplideSlide>
    </>
  );
};

export default Slider;
