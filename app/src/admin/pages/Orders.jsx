import React from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";

const Marques = ({ signOut }) => {
  return (
    <div className="categories">
      <SideBar signOut={signOut} />
      <div className="categotiesContainer">
        <NavBar />
      </div>
    </div>
  );
};

export default Marques;
