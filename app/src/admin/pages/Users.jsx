import React, { useState } from "react";
import "./scss/users.scss";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import UserForm from "../components/UserForm";
import UpdateUserForm from "../components/UpdateUserForm";
import UsersDataGrid from "../components/UsersDataGrid";

const Users = () => {
  const [userForm, setUserForm] = useState(false);
  const [updateUserForm, setUpdateUserForm] = useState(false);
  const closeUserForm = () => {
    setUserForm(false);
  };
  const openUpdateUserForm = (id) => {
    setUpdateUserForm(true);
    console.log(id);
  };
  const closeUpdateUserForm = () => {
    setUpdateUserForm(false);
  };
  return (
    <div className="users">
      <SideBar />
      <div className="usersContainer">
        <NavBar />
        <UsersDataGrid openUpdateUserForm={openUpdateUserForm} />
        <div className="addUser" onClick={() => setUserForm(true)}>
          +
        </div>
        {userForm && <UserForm closeUserForm={closeUserForm} />}
        {updateUserForm && (
          <UpdateUserForm closeUpdateUserForm={closeUpdateUserForm} />
        )}
      </div>
    </div>
  );
};

export default Users;
