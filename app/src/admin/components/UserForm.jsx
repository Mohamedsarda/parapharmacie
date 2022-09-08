import React, { useState, useEffect } from "react";
import "./scss/userform.scss";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";

const UserForm = ({ closeUserForm, closeLoading }) => {
  const [cities, setCities] = useState([]);
  const [client, setClient] = useState({
    clientName: "",
    clientLastName: "",
    clientEmail: "",
    clientPassword: "",
    clientCity: "",
    clientAdress: "",
    clientPhone: "",
  });

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };
  const clientSignIn = (e) => {
    e.preventDefault();
    if (client) {
      axios
        .post("http://localhost:8080/clientActions/v1/clientSignUp", client)
        .then((res) => {
          if (res.data.actionState === true) {
            closeUserForm();
            toast.success(res.data.desc);
          } else {
            toast.error(res.data.desc);
          }
        });
    } else {
      toast.error("Please Enter All The Indormations");
    }
    // console.log(client);
  };
  useEffect(() => {
    const getCities = async () => {
      await axios
        .get("http://localhost:8080/clientActions/v1/getCities")
        .then((resp) => {
          setCities(resp.data.cities);
        });
    };
    getCities();
  }, []);
  return (
    <div className="userForm">
      <form onSubmit={clientSignIn}>
        <CloseIcon onClick={() => closeUserForm()} className="closeUserForm" />
        <div className="row">
          <label>First Name</label>
          <input type="text" name="clientName" onChange={handleChange} />
        </div>
        <div className="row">
          <label>Last Name</label>
          <input type="text" name="clientLastName" onChange={handleChange} />
        </div>
        <div className="row">
          <label>Email</label>
          <input type="email" name="clientEmail" onChange={handleChange} />
        </div>
        <div className="row">
          <label>Phone Number</label>
          <input type="text" name="clientPhone" onChange={handleChange} />
        </div>
        <div className="row">
          <label>Password</label>
          <input
            type="password"
            name="clientPassword"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="">City</label>
          <select name="clientCity" onChange={handleChange}>
            <option value="none">Select A City</option>
            {cities.map((city) => {
              return (
                <option key={city.cityId} value={city.cityName}>
                  {city.cityName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="row">
          <label>Adress</label>
          <input type="text" name="clientAdress" />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default UserForm;
