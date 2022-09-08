import React, { useState } from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Loading from "../components/loading";

const Marques = ({ signOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="categories">
      {isLoading ? (
        <>
          <SideBar signOut={signOut} />
          <div className="categotiesContainer">
            <NavBar />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Marques;
