import React, { useState } from "react";
import "./scss/userform.scss";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const UpdateUserForm = ({ closeUpdateUserForm }) => {
  const [client, setClient] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
    city: "",
  });

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };
  const clientSignIn = (e) => {
    e.preventDefault();
    // axios.post("http://localhost:8080/Middlewares/clientAuthentication.js", {});
    console.log(client);
  };
  return (
    <div className="userForm">
      <form onSubmit={clientSignIn}>
        <CloseIcon
          onClick={() => closeUpdateUserForm()}
          className="closeUserForm"
        />
        <div className="row">
          <label>First Name</label>
          <input type="text" name="first_name" onChange={handleChange} />
        </div>
        <div className="row">
          <label>Last Name</label>
          <input type="text" name="last_name" onChange={handleChange} />
        </div>
        <div className="row">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div className="row">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={client.age}
                name="age"
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="row">
          <Box sx={{ minWidth: 210 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={client.city}
                name="city"
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>bm</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="row">
          <label>Adress</label>
          <input type="text" name="adress" />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
