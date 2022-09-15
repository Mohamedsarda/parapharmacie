import React from "react";
import Navbar from "../components/Navbar";

const About = ({ signClientIn }) => {
  return (
    <div>
      <Navbar signClientIn={signClientIn} />
      About
    </div>
  );
};

export default About;
