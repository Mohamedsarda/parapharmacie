import React, { useState } from "react";
import ViewProduct from "./ViewProduct";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "@splidejs/splide/css";
import "./scss/slider.scss";
import { addCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Slider = () => {
  const [singleProduct, setSingleProduct] = useState(false);
  const dispatch = useDispatch();

  const closeSingleProductContainer = () => {
    setSingleProduct(false);
  };
  const openGetProductInfo = () => {
    setSingleProduct(true);
  };

  //////////////
  const handleAddToCart = () => {
    dispatch(addCounter());
    toast.success("Le produit a été ajouté au panier");
  };
  return (
    <div className="sliderWrapper">
      <Splide
        options={{
          perPage: 5,
          arrows: false,
          pagination: false,
          gap: "1rem",
          breakpoints: {
            1050: {
              perPage: 3,
              arrows: true,
            },
            767: {
              perPage: 2,
              arrows: true,
            },
            500: {
              perPage: 1,
            },
          },
        }}
      >
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
      </Splide>
      {singleProduct && (
        <ViewProduct
          closeSingleProductContainer={closeSingleProductContainer}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Slider;
