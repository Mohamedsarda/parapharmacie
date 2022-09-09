import React, { useState } from "react";
import "./scss/categories.scss";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import CategoriesData from "../components/CategoriesData";
import Loading from "../components/loading";

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
