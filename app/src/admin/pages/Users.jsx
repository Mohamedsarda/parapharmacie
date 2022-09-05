import React, { useState } from "react";
import "./scss/users.scss";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import UserForm from "../components/UserForm";
import UsersDataGrid from "../components/UsersDataGrid";

const Users = () => {
  const [userForm, setUserForm] = useState(false);
  const closeUserForm = () => {
    setUserForm(false);
  };
  return (
    <div className="users">
      <SideBar />
      <div className="usersContainer">
        <NavBar />
        <UsersDataGrid />
        <div className="addUser" onClick={() => setUserForm(true)}>
          +
        </div>
        {userForm && <UserForm closeUserForm={closeUserForm} />}
      </div>
    </div>
  );
};

export default Users;
