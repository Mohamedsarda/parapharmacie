import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { addCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
//
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./scss/SingleProductPage.scss";

const SingleProductPage = ({ clientIsAuth, signClientIn, clientSignOut }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  //
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
  //
  //
  const handleAddToCart = (id, productCurrentPrice) => {
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
  const getProduct = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/selectProduct", {
        productId: id,
      })
      .then((res) => {
        if (res.data.actionState) {
          setProduct(res.data.product);
        }
        if (res.data.desc === "No product found with the given id") {
          navigate("/");
        }
      });
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      <div className="SingleProductContainer">
        <img src={`http://localhost:8080/${product.productImages}`} alt="" />
        <div className="content">
          <div className="info">
            <h2>{product.productName}</h2>
          </div>
          <div className="desc">
            <h3>Description</h3>
            <p>{product.productDescription}</p>
          </div>
          <div className="select">
            <div className="priceContainer">
              <h4 className="line-through">
                Old Price : {product.productOldPrice}
              </h4>
              <h4>New Price : {product.productCurrentPrice}</h4>
            </div>
            <div className="priceContainer">
              <h4 className="">
                <span>Categorie</span> : {product.productCategorie}
              </h4>
              <h4>
                <span>Mark</span> : {product.productMark}
              </h4>
            </div>
            <div className="quantityCount">
              <span onClick={removeFromQuantity}>-</span>
              <span>{quantity}</span>
              <span onClick={addToQuantity}>+</span>
            </div>
          </div>
          <button
            onClick={() => handleAddToCart(id, product.productCurrentPrice)}
          >
            <ShoppingCartOutlinedIcon className="icon" /> AJOUTER AU PANIER
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SingleProductPage;
