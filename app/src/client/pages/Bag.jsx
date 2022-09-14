import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BagItem from "../components/BagItem";
import { toast } from "react-toastify";
import axios from "axios";

const Bag = () => {
  const [bagProducts, setBagProducts] = useState([]);
  const [currentOrderPrice, setCurrentOrderPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const removeProductsFromCart = (orderId) => {
    axios
      .post("http://localhost:8080/clientActions/v1/removeProductsFromCart", {
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
          let totalPriceCalc = 0;
          res.data.cart.forEach((cart, idx) => {
            // console.log(cart.productCurrentPrice, idx);
            totalPriceCalc += cart.productCurrentPrice;
          });
          setTotalPrice(totalPriceCalc);
        }
      });
  };
  useEffect(() => {
    getProductsInCart();
  }, []);
  const updateTotalPrice = (sum, action) => {
    let currentPrice = totalPrice;
    if (action === "+") currentPrice += sum;
    else currentPrice -= sum;
    setTotalPrice(currentPrice);
  };
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
                updateTotalPrice={updateTotalPrice}
              />
            );
          })}
        </div>
        <div className="bagTotal">
          <h2>TOTAL PANIER</h2>
          <div className="info">
            <h4>Sous-total : {totalPrice} DH</h4>
            <h4>Expédition</h4>
            <p>Shipping costs are calculated during checkout.</p>
            <h3>TOTAL : {totalPrice} DH</h3>
          </div>
          <button>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Bag;
