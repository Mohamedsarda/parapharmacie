import { useState, useEffect } from "react";
import "./scss/sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DnsIcon from "@mui/icons-material/Dns";
import HubIcon from "@mui/icons-material/Hub";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [currentNav, setCurrentNav] = useState(
    window.location.href.split("/")[3]
  );
  useEffect(() => {
    setCurrentNav(window.location.href.split("/")[3]);
  }, [window.location.href.split("/")[3]]);

  return (
    <div className="sideBar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MED SARDA</span>
        </Link>
        <span className="logo-1">M</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "users" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "products" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <StorefrontIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "orders" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <CreditCardOutlinedIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "categories"
                    ? "rgba(153, 153, 153, 0.274)"
                    : "",
              }}
            >
              <LocalShippingIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <Link to="/Stats" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "Stats" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <LeaderboardIcon className="icon" />
              <span>Stats</span>
            </li>
          </Link>
          <Link to="/Notifications" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "Notifications"
                    ? "rgba(153, 153, 153, 0.274)"
                    : "",
              }}
            >
              <NotificationsNoneIcon className="icon" />
              <span>Notifications</span>
            </li>
          </Link>
          <p className="title">SERVICE</p>
          <Link to="/System Health" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "System Health"
                    ? "rgba(153, 153, 153, 0.274)"
                    : "",
              }}
            >
              <DnsIcon className="icon" />
              <span>System Health</span>
            </li>
          </Link>
          <Link to="/Logs" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "Logs" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <HubIcon className="icon" />
              <span>Logs</span>
            </li>
          </Link>
          <Link to="/Settings" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "Settings" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <SettingsIcon className="icon" />
              <span>Settings</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/Profile" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "Profile" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/Logout" style={{ textDecoration: "none" }}>
            <li
              onClick={() => {
                setCurrentNav(window.location.href.split("/")[3]);
              }}
              style={{
                backgroundColor:
                  currentNav === "Logout" ? "rgba(153, 153, 153, 0.274)" : "",
              }}
            >
              <LogoutOutlinedIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
