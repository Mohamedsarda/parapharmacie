import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SerachSuggestion = ({
  id,
  productName,
  productMark,
  productCategorie,
  productCurrentPrice,
  productOldPrice,
  productQuantities,
  productDescription,
  productImages,
}) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/product/${id}`}>
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0.99 }}
        exit={{ scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="SerachSuggestion"
      >
        <img src={`http://localhost:8080/${productImages}`} alt={productName} />
        <div className="content">
          <div className="info">
            <h2>{productName.slice(0, 20)}...</h2>
            <p>{productDescription.slice(0, 50)}...</p>
          </div>
          <div className="priceContainer">
            {productOldPrice !== 0 ? (
              <h4 className="line-through">Old Price : {productOldPrice}DH</h4>
            ) : (
              ""
            )}

            <h4>New Price : {productCurrentPrice}DH</h4>
            <div>
              <h4>Categorie : {productCategorie}</h4>
              <h4>Mark : {productMark}</h4>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default SerachSuggestion;
