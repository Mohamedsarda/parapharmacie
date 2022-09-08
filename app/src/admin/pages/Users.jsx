import React, { useState } from "react";
import "./scss/users.scss";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import UserForm from "../components/UserForm";
import UpdateUserForm from "../components/UpdateUserForm";
import UsersDataGrid from "../components/UsersDataGrid";
import Loading from "../components/loading";

const Users = ({ signOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userForm, setUserForm] = useState(false);
  const [updateUserForm, setUpdateUserForm] = useState(false);
  const closeLoading = () => {
    setIsLoading(true);
  };
  const closeUserForm = () => {
    setUserForm(false);
  };
  const openUpdateUserForm = (id) => {
    setUpdateUserForm(true);
  };
  const closeUpdateUserForm = () => {
    setUpdateUserForm(false);
  };
  return (
    <div className="users">
      {!isLoading ? (
        <>
          <SideBar signOut={signOut} />
          <div className="usersContainer">
            <NavBar />
            <UsersDataGrid openUpdateUserForm={openUpdateUserForm} />
            <div className="addUser" onClick={() => setUserForm(true)}>
              +
            </div>
            {userForm && (
              <UserForm
                closeLoading={closeLoading}
                closeUserForm={closeUserForm}
              />
            )}
            {updateUserForm && (
              <UpdateUserForm closeUpdateUserForm={closeUpdateUserForm} />
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Users;
