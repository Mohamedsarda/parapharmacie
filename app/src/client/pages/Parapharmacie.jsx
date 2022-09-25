import React from "react";
import Navbar from "../components/Navbar";

const Parapharmacie = ({ signClientIn, clientSignOut, clientIsAuth }) => {
  return (
    <div>
      <Navbar
        signClientIn={signClientIn}
        clientSignOut={clientSignOut}
        clientIsAuth={clientIsAuth}
      />
      Parapharmacie
    </div>
  );
};

export default Parapharmacie;
