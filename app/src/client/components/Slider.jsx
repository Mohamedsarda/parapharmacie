import React from "react";

import { SplideSlide } from "@splidejs/react-splide";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "@splidejs/splide/css";
import "./scss/slider.scss";

const Slider = ({ openGetProductInfo, handleAddToCart }) => {
  return (
    <>
      <SplideSlide className="product">
        <img
          onClick={openGetProductInfo}
          src="https://monrituel.ma/wp-content/uploads/2022/08/6414-2-600x600.jpg"
          alt=""
        />
        <div className="content">
          <h2>ARM & HAMMER ESSENTIALS DEO NATURAL JUNIPER BERRY</h2>
          <div className="_2-col">
            <h5 className="line-through">150 DH</h5>
            <h5>99,00 DH</h5>
          </div>
          <button onClick={handleAddToCart}>
            <ShoppingCartOutlinedIcon className="icon" />
            AJOUTER AU PANIER
          </button>
        </div>
      </SplideSlide>
    </>
  );
};

export default Slider;
