import { useState, useEffect } from "react";
//
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
//
import "./scss/SearchedProducts.scss";
//
import { useParams } from "react-router-dom";
import axios from "axios";
//
import { addCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SearchedProducts = ({ clientIsAuth, signClientIn, clientSignOut }) => {
  const { searchValue } = useParams();
  const [products, setProducts] = useState([]);
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
  const searchForProducts = () => {
    if (searchValue) {
      axios
        .post("http://localhost:8080/clientActions/v1/searchForProduct", {
          keyword: "%" + searchValue.trim() + "%",
          state: true,
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
  useEffect(() => {
    searchForProducts();
  }, []);
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      <div className="productsContainer">
        <h2>Produits</h2>
        <div className="grid">
          {products.map((product) => {
            return (
              <Slider
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
      </div>
    </div>
  );
};

export default SearchedProducts;
