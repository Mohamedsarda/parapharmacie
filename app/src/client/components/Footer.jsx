import React from "react";
import "./scss/footer.scss";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <div className="logo">LOGO</div>
        <h3>SUIVEZ NOUS SUR</h3>
        <div className="socials"></div>
      </div>
      <div>
        <h3>Information</h3>
        <div className="list">
          <span>> About Us</span>
          <span>> Livraison</span>
          <span>> Localisation</span>
        </div>
      </div>
      <div>
        <h3>My Account</h3>
        <div className="list">
          <span>> Mon Compte</span>
          <span>> Marques</span>
        </div>
      </div>
      <div>
        <h3>Contact Info</h3>
        <div className="list">
          <span>
            <LocationOnOutlinedIcon className="icon" />
            18 rue el hanna beni mellale
          </span>
          <span>
            <MailOutlineIcon className="icon" />
            test@gmail.com
          </span>
          <span>
            <PhoneInTalkIcon className="icon" />
            0678456912
          </span>
          <span>
            <AccessTimeOutlinedIcon className="icon" />
            7j / 7j Horaire : 10:00- 21:00
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
