import React from "react";
import Navbar from "../components/Navbar";
import ContactUsForm from "../components/ContactUsForm";
import Footer from "../components/Footer";

const ContactUs = ({ signClientIn, clientIsAuth, clientSignOut }) => {
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      <ContactUsForm />
      <Footer />
    </div>
  );
};

export default ContactUs;
