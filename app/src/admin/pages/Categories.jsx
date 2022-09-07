import React, { useState, useEffect } from "react";
import "./scss/categories.scss";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import CategoriesData from "../components/CategoriesData";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Categories = ({ signOut }) => {
  return (
    <div className="categories">
      <SideBar signOut={signOut} />
      <div className="categotiesContainer">
        <NavBar />
        <CategoriesData />
      </div>
    </div>
  );
};

export default Categories;
