import React, { useState, useEffect } from "react";
import ProductsData from "../components/ProductsData";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loading from "../components/loading";
import AddProductForm from "../components/AddProductForm";
import EditProduct from "../components/EditProduct";
import axios from "axios";

// import Message from "../components/Message";
import "./scss/products.scss";
// import { Link } from "react-router-dom";

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productForm, setProductForm] = useState(false);
  const [editProductForm, setEditProductForm] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [productData, setDroductData] = useState({
    id: "",
    title: "",
    desc: "",
    categorie: "",
    mark: "",
    newPrice: "",
    oldPrice: "",
    img: "",
    quantity: "",
  });

  const openEditForm = (
    id,
    title,
    desc,
    categorie,
    mark,
    newPrice,
    oldPrice,
    img,
    quantity
  ) => {
    setDroductData({
      id,
      title,
      desc,
      categorie,
      mark,
      newPrice,
      oldPrice,
      img,
      quantity,
    });
    setEditProductForm(true);
  };
  const closeEditForm = () => {
    setEditProductForm(false);
  };
  const closeProductForm = () => {
    setProductForm(false);
  };

  const toggleMsg = () => {
    // if (msg) {
    //   setMsg(false);
    // } else {
    //   setMsg(true);
    // }
  };
  const updateProductData = (id) => {
    setProductsData(productsData.filter((product) => product.productId !== id));
  };
  const getProductsData = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/getProducts", {
        from: 0,
        to: 10,
      })
      .then((res) => {
        setProductsData(res.data.products);
        setIsLoading(true);
      });
  };
  useEffect(() => {
    getProductsData();
  }, []);
  return (
    <div className="grid">
      {/* {msg && <Message action={toggleMsg} />} */}
      {isLoading ? (
        <>
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
                      mark={product.productMark}
                      oldPrice={product.productOldPrice}
                      newPrice={product.productCurrentPrice}
                      quantity={product.productQuantities}
                      action={toggleMsg}
                      updateProductData={updateProductData}
                      openEditForm={openEditForm}
                    />
                  );
                })}
              </div>
            </div>
            {editProductForm && (
              <EditProduct
                closeEditForm={closeEditForm}
                getProductsData={getProductsData}
                productData={productData}
              />
            )}
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
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Products;
