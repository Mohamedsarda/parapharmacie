import React, { useState, useEffect } from "react";
import "./scss/widget.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import axios from "axios";

const Widget = ({ type }) => {
  const [number, setNumber] = useState({});
  let data;
  switch (type) {
    case "user":
      data = {
        title: "CLIENT",
        isMoney: false,
        link: "Voir tous les utilisateurs",
        a: "users",
        num: number.Clients,
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
    case "order":
      data = {
        title: "COMMANDES",
        isMoney: false,
        link: "Voir toutes les commandes",
        a: "orders",
        num: number.Orders,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;
    case "earnings":
      data = {
        title: "TOTAL DES GAINS",
        isMoney: true,
        link: "Bénéfice net",
        a: "",
        num: number.Earning,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "TOTAL DES PRODUITS",
        isMoney: false,
        link: "voir tous les produits",
        a: "products",
        num: number.Products,
        icon: (
          <StorefrontIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      break;
  }
  const getWidgetData = () => {
    axios
      .post("http://localhost:8080/adminTask/v1/fetchDashboardData")
      .then((res) => {
        setNumber(res.data.widgetsData[0]);
      });
  };
  useEffect(() => {
    getWidgetData();
  }, []);
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.num}
          <span>{data.isMoney && "DH"}</span>
        </span>
        <span className="link">
          <Link
            style={{ textDecoration: "none", color: "#111" }}
            to={`/admin/${data.a}`}
          >
            {data.link}
          </Link>
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
