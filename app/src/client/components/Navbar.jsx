import React, { useEffect, useState } from "react";

import ClientLogin from "./ClientLogin";
import TopNavBar from "./TopNavBar";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from "axios";

const Navbar = ({ categoriesData, signClientIn, rernderNavBarWithId }) => {
  const cartCounter = useSelector((state) => state.cart.cartCounter);
  const [ClientLoginContainer, setClientLoginContainer] = useState(false);
  const [offset, setOffset] = useState(0);

  const dispatch = useDispatch();

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
        <div className="logo">LOGO</div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Rechercher un produit, une marque......"
          />
          <SearchIcon />
        </div>
        <div className="right">
          <PersonOutlineIcon
            className="icon"
            onClick={() => setClientLoginContainer(!ClientLoginContainer)}
          />
          <Link to="/bag">
            <Badge badgeContent={cartCounter} className="badge" color="success">
              <ShoppingCartOutlinedIcon className="icon" />
            </Badge>
          </Link>
        </div>
        {ClientLoginContainer && (
          <ClientLogin
            signClientIn={signClientIn}
            closeLoginContainer={closeLoginContainer}
          />
        )}
      </div>
      <ul className="nav-links">
        <Link to="/" style={{ textDecoration: "none" }}>
          <li className="active">ACCUEIL</li>
        </Link>
        <Link to="/parapharmacie" style={{ textDecoration: "none" }}>
          <li>PARAPHARMACIE</li>
        </Link>
        <Link to="/contactus" style={{ textDecoration: "none" }}>
          <li>CONTACTEZ-NOUS</li>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <li>À PROPOS</li>
        </Link>
      </ul>
      {/* <div className="nav-categorie">
        <ul>
          {categoriesData.map((categorie) => {
            return <li>{categorie.categorieName}</li>;
          })}
        </ul>
      </div> */}
    </div>
  );
};

export default Navbar;
