import { useState, useEffect } from "react";
//
import Navbar from "../components/Navbar";
import SliderProduct from "../components/Slider";
import Footer from "../components/Footer";
//
import "./scss/SearchedProducts.scss";
//
import { useParams } from "react-router-dom";
import axios from "axios";
//
import { addCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
//
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const Parapharmacie = ({ clientIsAuth, signClientIn, clientSignOut }) => {
  const { searchValue, categorie } = useParams();
  const [products, setProducts] = useState([]);
  const [range, setRange] = useState(10);
  //

  //
  const [value, setValue] = useState([10, 500]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //
  const dispatch = useDispatch();
  //
  const handleAddToCart = (id, quantity, productCurrentPrice) => {
    axios
      .post("http://localhost:8080/clientActions/v1/addProductToCart", {
        productId: id,
        productPrice: productCurrentPrice,
        orderQuantity: quantity,
        state: "cart",
      })
      .then((res) => {
        if (res.data.actionState) {
          dispatch(addCounter());
          toast.success("Le produit a été ajouté au panier");
        } else {
          toast.error(
            "vous avez besoin d'un compte pour ajouter un produit au panier"
          );
        }
      });
  };
  //
  const searchForProductsPage = () => {
    if (searchValue) {
      axios
        .post("http://localhost:8080/clientActions/v1/searchForProduct", {
          keyword: "%" + searchValue.trim() + "%",
          state: false,
          from: 0,
          to: 20,
        })
        .then((res) => {
          if (res.data.actionState) {
            setProducts(res.data.products);
          }
        });
    }
  };
  //
  const getParaData = () => {
    axios
      .post(
        "http://localhost:8080/clientActions/v1/searchForProductWithFilter",
        {
          keyword: "%s%",
          state: false,
          fromRow: 0,
          toRow: parseInt(range),
          fromPrice: value[0],
          toPrice: value[1],
        }
      )
      .then((res) => {
        if (res.data.actionState) {
          setProducts(res.data.products);
        }
      });
  };
  const getProductsCategorie = () => {
    axios
      .post(
        "http://localhost:8080/clientActions/v1/searchForProductsBasedOnCategorie",
        {
          categorieName: categorie,
          from: 0,
          to: range,
        }
      )
      .then((res) => {
        if (res.data.actionState) {
          setProducts(res.data.products);
        }
      });
  };

  useEffect(() => {
    console.log(window.location.href.split("/")[4]);
    if (window.location.href.split("/")[4] === "search") {
      searchForProductsPage();
    }
    if (window.location.href.split("/")[4] === undefined) {
      getParaData();
    }
    if (window.location.href.split("/")[4] === "categorie") {
      getProductsCategorie();
    }
  }, [window.location.href.split("/")[4], value, range, categorie]);
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      <div className="productsContainer">
        <div className="nav">
          <h2>Produits</h2>
          {window.location.href.split("/")[4] !== "search" ? (
            <div className="selections">
              <h3>Affichage des produits de à :</h3>
              <select onChange={(e) => setRange(e.target.value)} name="FromTo">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="1000">All</option>
              </select>
              {window.location.href.split("/")[4] !== "categorie" ? (
                <Box sx={{ width: 250 }}>
                  <h3>Price Range</h3>
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={10}
                    step={20}
                    max={1000}
                    disableSwap
                  />
                </Box>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        {products ? (
          <div className="grid">
            {products.map((product) => {
              return (
                <SliderProduct
                  handleAddToCart={handleAddToCart}
                  key={product.productId}
                  id={product.productId}
                  img={product.productImages}
                  productName={product.productName}
                  productOldPrice={product.productOldPrice}
                  productQuantities={product.productQuantities}
                  productAddedTime={product.productAddedTime}
                  productCategorie={product.productCategorie}
                  productCurrentPrice={product.productCurrentPrice}
                  productDescription={product.productDescription}
                  productMark={product.productMark}
                />
              );
            })}
          </div>
        ) : (
          <div>nooooooo</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Parapharmacie;
