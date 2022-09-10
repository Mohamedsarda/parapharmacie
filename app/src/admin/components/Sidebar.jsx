import { useState, useEffect } from "react";
import "./scss/sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Link } from "react-router-dom";

const Sidebar = ({ signOut }) => {
  const [currentNav, setCurrentNav] = useState();
  useEffect(() => {
    if (!window.location.href.split("/")[4]) {
      setCurrentNav(window.location.href.split("/")[3]);
    } else {
      setCurrentNav(window.location.href.split("/")[4]);
    }
  }, []);

  return (
    <div className="sideBar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">MED SARDA</span>
        </Link>
        <span className="logo-1">M</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "admin" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[4]);
              }}
              style={{
                backgroundColor:
                  currentNav === "users" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Client</span>
            </li>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[4]);
              }}
              style={{
                backgroundColor:
                  currentNav === "products" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <StorefrontIcon className="icon" />
              <span>Produit</span>
            </li>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[4]);
              }}
              style={{
                backgroundColor:
                  currentNav === "orders" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <CreditCardOutlinedIcon className="icon" />
              <span>Commandes</span>
            </li>
          </Link>
          <Link to="/admin/categories" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[4]);
              }}
              style={{
                backgroundColor:
                  currentNav === "categories"
                    ? "rgba(153, 153, 153, 0.274)"
                    : "",
              }}
            >
              <AppsOutlinedIcon className="icon" />
              <span>Catégories</span>
            </li>
          </Link>
          <Link to="/admin/marques" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[4]);
              }}
              style={{
                backgroundColor:
                  currentNav === "marques" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <LocationCityIcon className="icon" />
              <span>Marques</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <Link to="/admin/Login" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[4]);
              }}
              style={{
                backgroundColor:
                  currentNav === "Logout" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <LogoutOutlinedIcon className="icon" />
              <span onClick={() => signOut()}>Se déconnecter</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
