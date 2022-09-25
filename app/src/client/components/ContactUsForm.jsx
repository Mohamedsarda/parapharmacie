import { useState } from "react";
import Iframe from "react-iframe";
import { toast } from "react-toastify";

const ContactUsForm = () => {
  const [clientMsg, setClientMsg] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleFormValues = (e) => {
    setClientMsg({ ...clientMsg, [e.target.name]: e.target.value });
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (clientMsg.fullName && clientMsg.email && clientMsg.message) {
    } else {
      toast.error("Please Enter All The Indormations");
    }
  };
  return (
    <div className="ContactUsForm">
      <form>
        <div className="row">
          <label>Nom et prénom</label>
          <input type="text" name="fullName" onChange={handleFormValues} />
        </div>
        <div className="row">
          <label>Email</label>
          <input type="email" name="email" onChange={handleFormValues} />
        </div>
        <div className="row">
          <label>Message</label>
          <textarea
            name="message"
            onChange={handleFormValues}
            rows="8"
          ></textarea>
        </div>
        <button onClick={(e) => handleSendMsg(e)}>Envoyer</button>
      </form>
      <Iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53940.61105816188!2d-6.408248631447125!3d32.33097198979065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda38649419c7fc1%3A0x6236b3e9a12bafd9!2sBeni-Mellal!5e0!3m2!1sen!2sma!4v1664119651724!5m2!1sen!2sma"
        className="iframe"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default ContactUsForm;
