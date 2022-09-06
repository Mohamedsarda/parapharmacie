import React from "react";
import "./scss/home.scss";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Widget from "../components/Widget";
import List from "../components/Table";

const Home = ({ signOut }) => {
  return (
    <div className="home">
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
    </div>
  );
};

export default Home;
