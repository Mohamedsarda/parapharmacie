import React, { useState, useEffect } from "react";

import "./scss/users.scss";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import UserForm from "../components/UserForm";
import UpdateUserForm from "../components/UpdateUserForm";
import UsersDataGrid from "../components/UsersDataGrid";
import Loading from "../components/loading";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const Users = ({ signOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userForm, setUserForm] = useState(false);
  const [updateUserForm, setUpdateUserForm] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [searchedClientL, setSearchedClient] = useState("");

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

  // const handleSearchedInput = (e) => {
  //   setSearchedClient(e.target.value);
  //   searchForUsers();
  // };
  const searchForUsers = (searchedClient) => {
    setSearchedClient(searchedClient);
    if (searchedClient !== "") {
      axios
        .post("http://localhost:8080/adminTask/v1/findClient", {
          searchedClient,
        })
        .then((res) => {
          setUsersData(res.data.clients);
        });
    } else {
      getUsers();
    }
  };
  const getUsers = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:8080/adminTask/v1/getClients", {
        from: 0,
        to: 10,
      })
      .then((res) => {
        setIsLoading(false);
        setUsersData(res.data.clients);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="users">
      {!isLoading ? (
        <>
          <SideBar signOut={signOut} />
          <div className="usersContainer">
            <NavBar />
            <div className="search">
              <input
                type="search"
                value={searchedClientL}
                onChange={(e) => {
                  searchForUsers(e.target.value);
                }}
                placeholder="Search With Client Last Name..."
              />
              <SearchIcon />
            </div>
            <UsersDataGrid
              getUsers={getUsers}
              usersData={usersData}
              openUpdateUserForm={openUpdateUserForm}
            />
            <div className="addUser" onClick={() => setUserForm(true)}>
              +
            </div>
            {userForm && (
              <UserForm
                getUsers={getUsers}
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
