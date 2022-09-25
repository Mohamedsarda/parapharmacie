import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./scss/404.scss";

const NotFound = ({ clientIsAuth, signClientIn, clientSignOut }) => {
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      <div className="notFound">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/416/499/original/404-error-and-page-not-found-illustration-vector.jpg"
          alt=""
        />
        <button className="linkToHome">
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            Go Back To Home
          </Link>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
