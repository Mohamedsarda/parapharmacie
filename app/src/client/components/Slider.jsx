import React, { useState } from "react";
import ViewProduct from "./ViewProduct";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "@splidejs/splide/css";
import "./scss/slider.scss";

const Slider = () => {
  const [singleProduct, setSingleProduct] = useState(false);
  const closeSingleProductContainer = () => {
    setSingleProduct(false);
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
        <SplideSlide onClick={() => setSingleProduct(true)}>
          <div className="product">
            <img
              src="https://monrituel.ma/wp-content/uploads/2022/08/6414-2-600x600.jpg"
              alt=""
            />
            <div className="content">
              <h2>ARM & HAMMER ESSENTIALS DEO NATURAL JUNIPER BERRY</h2>
              <div className="_2-col">
                <h5 className="line-through">150 DH</h5>
                <h5>99,00 DH</h5>
              </div>
              <button>
                <ShoppingCartOutlinedIcon className="icon" /> AJOUTER AU PANIER
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide onClick={() => setSingleProduct(true)}>
          <div className="product">
            <img
              src="https://monrituel.ma/wp-content/uploads/2022/08/7665-2-600x600.jpg"
              alt=""
            />
            <div className="content">
              <h2>ARM & HAMMER ESSENTIALS DEO NATURAL JUNIPER BERRY</h2>
              <div className="_2-col">
                <h5 className="line-through">150 DH</h5>
                <h5>99,00 DH</h5>
              </div>
              <button>
                <ShoppingCartOutlinedIcon className="icon" /> AJOUTER AU PANIER
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide onClick={() => setSingleProduct(true)}>
          <div className="product">
            <img
              src="https://monrituel.ma/wp-content/uploads/2022/08/7175-2-600x600.jpg"
              alt=""
            />
            <div className="content">
              <h2>ARM & HAMMER ESSENTIALS DEO NATURAL JUNIPER BERRY</h2>
              <div className="_2-col">
                <h5 className="line-through">150 DH</h5>
                <h5>99,00 DH</h5>
              </div>
              <button>
                <ShoppingCartOutlinedIcon className="icon" /> AJOUTER AU PANIER
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide onClick={() => setSingleProduct(true)}>
          <div className="product">
            <img
              src="https://monrituel.ma/wp-content/uploads/2022/08/2387-2-600x600.jpg"
              alt=""
            />
            <div className="content">
              <h2>ARM & HAMMER ESSENTIALS DEO NATURAL JUNIPER BERRY</h2>
              <div className="_2-col">
                <h5 className="line-through">150 DH</h5>
                <h5>99,00 DH</h5>
              </div>
              <button>
                <ShoppingCartOutlinedIcon className="icon" /> AJOUTER AU PANIER
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide onClick={() => setSingleProduct(true)}>
          <div className="product">
            <img
              src="https://monrituel.ma/wp-content/uploads/2022/08/3645-2-600x600.jpg"
              alt=""
            />
            <div className="content">
              <h2>ARM & HAMMER ESSENTIALS DEO NATURAL JUNIPER BERRY</h2>
              <div className="_2-col">
                <h5 className="line-through">150 DH</h5>
                <h5>99,00 DH</h5>
              </div>
              <button>
                <ShoppingCartOutlinedIcon className="icon" /> AJOUTER AU PANIER
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide onClick={() => setSingleProduct(true)}>
          <div className="product">
            <img
              src="https://monrituel.ma/wp-content/uploads/2022/08/3092-3-600x600.jpg"
              alt=""
            />
            <div className="content">
              <h2>ARM & HAMMER ESSENTIALS DEO NATURAL JUNIPER BERRY</h2>
              <div className="_2-col">
                <h5 className="line-through">150 DH</h5>
                <h5>99,00 DH</h5>
              </div>
              <button>
                <ShoppingCartOutlinedIcon className="icon" /> AJOUTER AU PANIER
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide onClick={() => setSingleProduct(true)}>
          <div className="product">
            <img
              src="https://monrituel.ma/wp-content/uploads/2022/09/7274-600x600.png"
              alt=""
            />
            <div className="content">
              <h2>ARM & HAMMER ESSENTIALS DEO NATURAL JUNIPER BERRY</h2>
              <div className="_2-col">
                <h5 className="line-through">150 DH</h5>
                <h5>99,00 DH</h5>
              </div>
              <button>
                <ShoppingCartOutlinedIcon className="icon" /> AJOUTER AU PANIER
              </button>
            </div>
          </div>
        </SplideSlide>
      </Splide>
      {singleProduct && (
        <ViewProduct
          closeSingleProductContainer={closeSingleProductContainer}
        />
      )}
    </div>
  );
};

export default Slider;
