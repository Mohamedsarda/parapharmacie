import React, { useState } from "react";
import "./scss/home.scss";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";
import List from "../components/Table";
import Loading from "../components/loading";

const Home = ({ signOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="home">
      {!isLoading ? (
        <>
          <Sidebar signOut={signOut} />
          <div className="homeContainer">
            <Navbar />
            <div className="widgets">
              <Widget type="user" />
              <Widget type="order" />
              <Widget type="earnings" />
              <Widget type="balance" />
            </div>
            <List />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
