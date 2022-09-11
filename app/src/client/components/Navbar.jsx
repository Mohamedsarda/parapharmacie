import React, { useEffect, useState } from "react";

import TopNavBar from "./TopNavBar";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <PersonOutlineIcon className="icon" />
          <ShoppingCartOutlinedIcon className="icon" />
        </div>
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
    </div>
  );
};

export default Navbar;
