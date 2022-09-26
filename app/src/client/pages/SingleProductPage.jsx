import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//
import { useParams } from "react-router-dom";
import axios from "axios";
import { addCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
//
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./scss/SingleProductPage.scss";

const SingleProductPage = ({ clientIsAuth, signClientIn, clientSignOut }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
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
  const handleAddToCart = (id, quantity, productCurrentPrice) => {
    console.log(id);
    // axios
    //   .post("http://localhost:8080/clientActions/v1/addProductToCart", {
    //     productId: id,
    //     productPrice: productCurrentPrice,
    //     orderQuantity: quantity,
    //     state: "cart",
    //   })
    //   .then((res) => {
    //     if (res.data.actionState) {
    //       dispatch(addCounter());
    //       toast.success("Le produit a été ajouté au panier");
    //     } else {
    //       toast.error(
    //         "vous avez besoin d'un compte pour ajouter un produit au panier"
    //       );
    //     }
    //   });
  };
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      <div className="SingleProductContainer">
        <img src="http://localhost:8080/1662905725963.jpg" alt="" />
        <div className="content">
          <div className="info">
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis, nobis.
            </h2>
          </div>
          <div className="desc">
            <h3>Description</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
              nulla enim non quam officiis voluptates odit sint facere minima
              molestias unde, hic, veritatis fugiat eum praesentium dolorem
              tempore incidunt modi officia laborum. Voluptates corporis,
              dignissimos quisquam iusto earum delectus eos. Possimus id minima
              quo deserunt maxime aspernatur autem sed voluptatum ab cupiditate
              dolore blanditiis, aliquam magni eligendi doloribus? Quisquam
              placeat molestias cumque quos autem aperiam sit nesciunt, facilis
              tempore quae explicabo magni dolor nihil temporibus pariatur atque
              commodi ipsam. Voluptate repellat alias doloremque nisi. Error
              nisi veritatis, minus ex quaerat nihil eveniet, reprehenderit
              ipsum consectetur, illum sit molestias eos. Sunt!
            </p>
          </div>
          <div className="select">
            <div className="priceContainer">
              <h4 className="line-through">Old Price : 200DH</h4>
              <h4>New Price : 300DH</h4>
            </div>
            <div className="quantityCount">
              <span onClick={removeFromQuantity}>-</span>
              <span>{quantity}</span>
              <span onClick={addToQuantity}>+</span>
            </div>
          </div>
          <button onClick={() => handleAddToCart(id, quantity)}>
            <ShoppingCartOutlinedIcon className="icon" /> AJOUTER AU PANIER
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SingleProductPage;
