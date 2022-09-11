import React from "react";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

const TopNavBar = () => {
  return (
    <div className="TopNavBar">
      <div className="left">
        <div className="phone">
          <PhoneInTalkIcon className="icon" /> 0614784589
        </div>
        <div className="email">
          <MailOutlineIcon className="icon" /> test@gmail.com
        </div>
      </div>
      <div className="right">
        <FacebookOutlinedIcon className="icon" />
        <WhatsAppIcon className="icon" />
        <InstagramIcon className="icon" />
      </div>
    </div>
  );
};

export default TopNavBar;
