import React from "react";
import Navbar from "../components/Navbar";

const About = ({ signClientIn, clientSignOut, clientIsAuth }) => {
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      About
    </div>
  );
};

export default About;
