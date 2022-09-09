import React, { useState } from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Loading from "../components/loading";
import Table from "../components/Table";

const Marques = ({ signOut }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="categories">
      {isLoading ? (
        <>
          <SideBar signOut={signOut} />
          <div className="categotiesContainer">
            <NavBar />
            <Table />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Marques;
