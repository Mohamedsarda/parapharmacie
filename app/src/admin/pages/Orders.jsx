import React, { useState } from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Loading from "../components/loading";
import OrdersData from "../components/OrdersData";

const Marques = ({ signOut }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState("pending");

  return (
    <div className="categories">
      {isLoading ? (
        <>
          <SideBar signOut={signOut} />
          <div className="categotiesContainer">
            <NavBar />
            <div className="typeContainer">
              <button onClick={() => setType("approved")} className="Approved">
                Approved
              </button>
              <button onClick={() => setType("pending")} className="Pending">
                Pending
              </button>
              <button
                onClick={() => setType("delivered")}
                className="Delivered"
              >
                Delivered
              </button>
              <button onClick={() => setType("canceled")} className="Canceled">
                Canceled
              </button>
            </div>
            <OrdersData type={type} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Marques;
