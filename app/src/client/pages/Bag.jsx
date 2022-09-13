import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BagItem from "../components/BagItem";
import { toast } from "react-toastify";
import axios from "axios";

const Bag = () => {
  const [bagProducts, setBagProducts] = useState([]);
  const [currentOrderPrice, setCurrentOrderPrice] = useState("");

  const removeProductsFromCart = (orderId) => {
    axios
      .post("http://localhost:8080/clientActions/v1//removeProductsFromCart", {
        orderId,
      })
      .then((res) => {
        if (res.data.actionState) {
          toast.success(res.data.desc);
          setBagProducts(bagProducts.filter((e) => e.orderId !== orderId));
        } else {
          toast.error(res.data.desc);
        }
      });
  };
  const getProductsInCart = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/getProductsInCart")
      .then((res) => {
        console.log(res.data);
        if (res.data.actionState) {
          setBagProducts(res.data.cart);
        }
      });
  };
  useEffect(() => {
    getProductsInCart();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="bagContainer">
        <div className="productsBag">
          {bagProducts.map((product) => {
            return (
              <BagItem
                removeProductsFromCart={removeProductsFromCart}
                key={product.orderId}
                orderId={product.orderId}
                orderPrice={product.orderPrice}
                orderQuantity={product.orderQuantity}
                productCurrentPrice={product.productCurrentPrice}
                productDescription={product.productDescription}
                productImages={product.productImages}
                productName={product.productName}
                productOldPrice={product.productOldPrice}
              />
            );
          })}
        </div>
        <div className="bagTotal">
          <h2>TOTAL PANIER</h2>
          <div className="info">
            <h4>Sous-total : 200 DH</h4>
            <h4>Expédition</h4>
            <p>Shipping costs are calculated during checkout.</p>
            <h3>TOTAL : 230 DH</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;
