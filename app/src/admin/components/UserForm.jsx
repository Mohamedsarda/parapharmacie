import React from "react";
import "./scss/userform.scss";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const UserForm = ({ closeUserForm }) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="userForm">
      <form>
        <CloseIcon onClick={() => closeUserForm()} className="closeUserForm" />
        <div className="row">
          <label>First Name</label>
          <input type="text" name="first_name" />
        </div>
        <div className="row">
          <label>Last Name</label>
          <input type="text" name="last_name" />
        </div>
        <div className="row">
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <div className="row">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
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
          <label>Adress</label>
          <input type="text" name="adress" />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default UserForm;
