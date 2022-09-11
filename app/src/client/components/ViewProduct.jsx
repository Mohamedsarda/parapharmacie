import React, { useState } from "react";
import "./scss/singleProduct.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ViewProduct = ({ closeSingleProductContainer }) => {
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
          <p>
            Réduit la transpiration des aisselles Pour une protection de 24
            heures protection qui aide à neutraliser les bactéries responsables
            des odeurs Sans aluminium, sans paraben, contient du bicarbonate de
            soude et des extraits naturels de plantes pour absorber et combattre
            les odeurs.
          </p>
          <div className="_2-col btns">
            <div className="quantityCount">
              <span onClick={removeFromQuantity}>-</span>
              <span>{quantity}</span>
              <span onClick={addToQuantity}>+</span>
            </div>
            <div>
              <button>
                <ShoppingCartOutlinedIcon /> AJOUTER AU PANIER
              </button>
            </div>
          </div>
          <h5>
            Catégorie: <span>DEODORANT</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
