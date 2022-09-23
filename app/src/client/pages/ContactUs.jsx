import React from "react";
import Navbar from "../components/Navbar";

const ContactUs = ({ signClientIn, clientIsAuth, clientSignOut }) => {
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      ContactUs
    </div>
  );
};

export default ContactUs;
