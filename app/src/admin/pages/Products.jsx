import React, { useState, useEffect } from "react";
import ProductsData from "../components/ProductsData";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddProductForm from "../components/AddProductForm";
import axios from "axios";
// import Message from "../components/Message";
import "./scss/products.scss";
// import { Link } from "react-router-dom";

const Products = () => {
  const [msg, setMsg] = useState(false);
  const [productForm, setProductForm] = useState(false);
  const [productsData, setProductsData] = useState([]);

  const closeProductForm = () => {
    setProductForm(false);
  };

  const toggleMsg = () => {
    if (msg) {
      setMsg(false);
    } else {
      setMsg(true);
    }
  };
  const updateProductData = (id) => {
    setProductsData(productsData.filter((product) => product.productId !== id));
  };
  const getProductsData = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/getProducts", {
        from: 0,
        to: 5,
      })
      .then((res) => {
        setProductsData(res.data.products);
      });
  };
  useEffect(() => {
    getProductsData();
  }, []);
  return (
    <div className="grid">
      {/* {msg && <Message action={toggleMsg} />} */}
      <Sidebar />
      <div className="gridContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">Products</div>

          <div className="gridContent">
            {productsData.map((product) => {
              return (
                <ProductsData
                  key={product.productId}
                  id={product.productId}
                  title={product.productName}
                  desc={product.productDescription}
                  img={product.productImages}
                  categorie={product.productCategorie}
                  mark={product.productName}
                  oldPrice={product.productOldPrice}
                  newPrice={product.productCurrentPrice}
                  quantity={product.productQuantities}
                  action={toggleMsg}
                  updateProductData={updateProductData}
                />
              );
            })}
          </div>
        </div>
        <div className="addUser" onClick={() => setProductForm(true)}>
          +
        </div>
        {productForm && (
          <AddProductForm
            getProductsData={getProductsData}
            closeProductForm={closeProductForm}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
