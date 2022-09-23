import React from "react";
import Navbar from "../components/Navbar";

const CoreCode = ({ clientIsAuth, signClientIn, clientSignOut }) => {
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      CoreCode
    </div>
  );
};

export default CoreCode;
