import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import "../components/scss/navBar.scss";
import ViewProduct from "../components/ViewProduct";
import { motion } from "framer-motion";
import { Splide } from "@splidejs/react-splide";
import { addCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [singleProduct, setSingleProduct] = useState(false);
  const [firstSlider, setFirstSlider] = useState([]);
  const [secondSlider, setSecondSlider] = useState([]);
  const [singleProductData, setSingleProductData] = useState({
    id: "",
    img: "",
    productName: "",
    productOldPrice: "",
    productQuantities: "",
    productAddedTime: "",
    productCategorie: "",
    productCurrentPrice: "",
    productDescription: "",
    productMark: "",
  });

  const dispatch = useDispatch();

  //////////////
  // const handleAddToCart = (id, quantity, productCurrentPrice) => {
  //   dispatch(addCounter());
  //   addProductToCart(id, quantity, productCurrentPrice);
  // };
  const closeSingleProductContainer = () => {
    setSingleProduct(false);
  };
  const openGetProductInfo = (
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
  ) => {
    setSingleProduct(true);
    setSingleProductData({
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
    });
    console.log(singleProductData);
  };

  const handleAddToCart = (id, quantity, productCurrentPrice) => {
    axios
      .post("http://localhost:8080/clientActions/v1/addProductToCart", {
        productId: id,
        productPrice: quantity,
        orderQuantity: productCurrentPrice,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.actionState) {
          dispatch(addCounter());
          toast.success("Le produit a été ajouté au panier");
        }
      });
  };
  const getLandingPageData = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/openLandingPage", {
        firstCategorie: "Soins visage",
        secondCategorie: "Corps",
        thirdCategorie: "Maman et Bébé",
        fourthCategorie: "ANTI-INSECTES",
        fifthCategorie: "SOIN CIBLE",
        sixthCategroie: "NATURE ET BIO",
      })
      .then((res) => {
        if (res.data.actionState) {
          setFirstSlider(res.data.products.firstSlider);
          setSecondSlider(res.data.products.secondSlider);
        }
      });
  };

  useEffect(() => {
    getLandingPageData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="_3-col-imgs">
        <img
          src="https://i.pinimg.com/736x/35/bd/a7/35bda78db14230d78d72165bc968fbf1.jpg"
          alt=""
        />
        <img
          src="https://cdn.shopify.com/s/files/1/2494/5078/products/masquevisageargile_a34ce26c-f212-48b5-b5b3-326c907057e0_2048x2048.jpg?v=1648133735"
          alt=""
        />
        <img
          src="https://www.clarins.co.uk/on/demandware.static/-/Sites/en_GB/dw03cbf763/1-Clarins/01-Shop/600-MakeUp/2022/2022_MakeUp-Imsges_Bspot%20452x502.jpg"
          alt=""
        />
      </div>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sliderWrapper">
          <Splide
            options={{
              perPage: 5,
              arrows: false,
              pagination: false,
              gap: "1rem",
              breakpoints: {
                1200: {
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
            {firstSlider.map((slider) => {
              return (
                <Slider
                  key={slider.productId}
                  handleAddToCart={handleAddToCart}
                  openGetProductInfo={openGetProductInfo}
                  id={slider.productId}
                  img={slider.productImages}
                  productName={slider.productName}
                  productOldPrice={slider.productOldPrice}
                  productQuantities={slider.productQuantities}
                  productAddedTime={slider.productAddedTime}
                  productCategorie={slider.productCategorie}
                  productCurrentPrice={slider.productCurrentPrice}
                  productDescription={slider.productDescription}
                  productMark={slider.productMark}
                />
              );
            })}
          </Splide>
        </div>
      </motion.div>
      <div className="_2-col-imgs">
        <img
          src="https://monrituel.ma/wp-content/uploads/2022/08/1-7.png"
          alt=""
        />
        <img
          src="https://monrituel.ma/wp-content/uploads/2022/08/2-10.png"
          alt=""
        />
      </div>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sliderWrapper">
          <Splide
            options={{
              perPage: 5,
              arrows: false,
              pagination: false,
              gap: "1rem",
              breakpoints: {
                1200: {
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
            {secondSlider.map((slider) => {
              return (
                <Slider
                  key={slider.productId}
                  handleAddToCart={handleAddToCart}
                  openGetProductInfo={openGetProductInfo}
                  id={slider.productId}
                  img={slider.productImages}
                  productName={slider.productName}
                  productOldPrice={slider.productOldPrice}
                  productQuantities={slider.productQuantities}
                  productAddedTime={slider.productAddedTime}
                  productCategorie={slider.productCategorie}
                  productCurrentPrice={slider.productCurrentPrice}
                  productDescription={slider.productDescription}
                  productMark={slider.productMark}
                />
              );
            })}
          </Splide>
        </div>
      </motion.div>
      <Footer />
      {singleProduct && (
        <ViewProduct
          closeSingleProductContainer={closeSingleProductContainer}
          handleAddToCart={handleAddToCart}
          singleProductData={singleProductData}
        />
      )}
    </div>
  );
};

export default Home;
