import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CoreCode = ({ clientIsAuth, signClientIn, clientSignOut }) => {
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      CoreCode
      <Footer />
    </div>
  );
};

export default CoreCode;
