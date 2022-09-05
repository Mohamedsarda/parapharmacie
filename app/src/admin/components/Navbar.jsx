import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import "./scss/navbar.scss";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="left">
        <div className="search">
          <input type="search" placeholder="Search..." />
          <SearchIcon />
        </div>
      </div>
      <div className="right">
        <div className="items">
          <div className="item language">
            <LanguageIcon className="icon" />
            English
          </div>
          <div className="item">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
