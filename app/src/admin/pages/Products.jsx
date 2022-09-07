import React, { useState } from "react";
import ProductsData from "../components/ProductsData";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddProductForm from "../components/AddProductForm";
// import Message from "../components/Message";
import "./scss/products.scss";
// import { Link } from "react-router-dom";

const Products = () => {
  const [msg, setMsg] = useState(false);
  const [productForm, setProductForm] = useState(false);

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
  return (
    <div className="grid">
      {/* {msg && <Message action={toggleMsg} />} */}
      <Sidebar />
      <div className="gridContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">Products</div>

          <div className="gridContent">
            <ProductsData action={toggleMsg} />
            <ProductsData action={toggleMsg} />
            <ProductsData action={toggleMsg} />
            <ProductsData action={toggleMsg} />
            <ProductsData action={toggleMsg} />
          </div>
        </div>
        <div className="addUser" onClick={() => setProductForm(true)}>
          +
        </div>
        {productForm && <AddProductForm closeProductForm={closeProductForm} />}
      </div>
    </div>
  );
};

export default Products;
