import React, { useEffect, useState } from "react";

import ClientLogin from "./ClientLogin";
import TopNavBar from "./TopNavBar";
import SerachSuggestion from "./SerachSuggestion";
//
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
//
import { Link } from "react-router-dom";
//
import { useSelector } from "react-redux";
import { setCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from "axios";
//

const Navbar = ({
  signClientIn,
  rernderNavBarWithId,
  clientSignOut,
  clientIsAuth,
}) => {
  const cartCounter = useSelector((state) => state.cart.cartCounter);
  const [isCategorie, setIsCategorie] = useState(false);
  const [ClientLoginContainer, setClientLoginContainer] = useState(false);
  const [offset, setOffset] = useState(0);
  const [activeTab, setActiveTab] = useState();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);

  //
  const searchPage = (e) => {
    if (e.keyCode === 13) {
      window.location.href = `/Parapharmacie/search/${searchValue}`;
    }
  };
  //
  const searchForProducts = (inputValue) => {
    if (inputValue.trim()) {
      setSearchValue(inputValue.trim());
      axios
        .post("http://localhost:8080/clientActions/v1/searchForProduct", {
          keyword: "%" + inputValue.trim() + "%",
          state: false,
          from: 0,
          to: 3,
        })
        .then((res) => {
          if (res.data.actionState) {
            setIsSearching(true);
            if (res.data.products.length > 0) {
              setSearchedProducts(res.data.products);
            } else {
              setIsSearching(false);
              setSearchedProducts([]);
            }
          } else {
            setIsSearching(false);
            setSearchedProducts([]);
          }
        });
    } else {
      setSearchedProducts([]);
      setIsSearching(false);
    }
  };
  //
  const getCategorie = () => {
    axios
      .post(
        "http://localhost:8080/clientActions/v1/getCategoriesForLandingPage"
      )
      .then((res) => {
        if (res.data.actionState) {
          setCategoriesData(res.data.categories);
        }
      });
  };
  //
  const getCartCounter = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/getProductInCart")
      .then((res) => {
        if (res.data.actionState) {
          dispatch(setCounter(res.data.cart[0].ordersCount));
        }
      });
  };

  const closeLoginContainer = () => {
    setClientLoginContainer(false);
  };

  useEffect(() => {
    getCartCounter();
    getCategorie();
    //
    setActiveTab(window.location.href.split("/")[3]);
    //
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rernderNavBarWithId]);

  return (
    <div className="Navbar">
      <TopNavBar />
      <div className={offset > 50 ? "navbarContent active" : "navbarContent"}>
        <Link style={{ textDecoration: "none" }} className="logo" to="/">
          LOGO
        </Link>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Rechercher un produit, une marque......"
            onChange={(e) => searchForProducts(e.target.value)}
            onKeyDown={searchPage}
          />
          <SearchIcon />
          {isSearching && (
            <div className="searchSuggestionContainer">
              <CloseOutlinedIcon
                className="icon"
                onClick={() => setIsSearching(false)}
              />
              {searchedProducts.map((product) => {
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`product/${product.productId}`}
                  >
                    <SerachSuggestion
                      key={product.productId}
                      id={product.productId}
                      productName={product.productName}
                      productMark={product.productMark}
                      productCategorie={product.productCategorie}
                      productCurrentPrice={product.productCurrentPrice}
                      productOldPrice={product.productOldPrice}
                      productQuantities={product.productQuantities}
                      productDescription={product.productDescription}
                      productImages={product.productImages}
                    />
                  </Link>
                );
              })}
              <button>voir tout</button>
            </div>
          )}
        </div>
        <div className="right">
          <PersonOutlineIcon
            className="icon"
            onClick={() => setClientLoginContainer(!ClientLoginContainer)}
          />
          {clientIsAuth && (
            <Link to="/bag">
              <Badge
                badgeContent={cartCounter}
                className="badge"
                color="success"
              >
                <ShoppingCartOutlinedIcon className="icon" />
              </Badge>
            </Link>
          )}
        </div>
        {ClientLoginContainer && (
          <ClientLogin
            signClientIn={signClientIn}
            closeLoginContainer={closeLoginContainer}
            clientSignOut={clientSignOut}
            clientIsAuth={clientIsAuth}
          />
        )}
      </div>
      <ul className="nav-links">
        <Link to="/" style={{ textDecoration: "none" }}>
          <li className={activeTab === "" ? "active" : ""}>ACCUEIL</li>
        </Link>
        <Link
          onMouseEnter={() => setIsCategorie(true)}
          onMouseLeave={() => setIsCategorie(false)}
          to="/parapharmacie"
          style={{ textDecoration: "none" }}
        >
          <li className={activeTab === "parapharmacie" ? "active" : ""}>
            PARAPHARMACIE
          </li>
        </Link>
        <Link to="/contactus" style={{ textDecoration: "none" }}>
          <li className={activeTab === "contactus" ? "active" : ""}>
            CONTACTEZ-NOUS
          </li>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <li className={activeTab === "about" ? "active" : ""}>À PROPOS</li>
        </Link>
      </ul>
      {isCategorie && (
        <div
          onMouseEnter={() => setIsCategorie(true)}
          onMouseLeave={() => setIsCategorie(false)}
          className="nav-categorie"
        >
          <h2>Catégorie</h2>
          <ul>
            {categoriesData.map((categorie) => {
              return <li>{categorie.categorieName}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
