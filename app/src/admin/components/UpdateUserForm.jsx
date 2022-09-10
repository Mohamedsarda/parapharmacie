import React, { useState, useEffect } from "react";
import "./scss/userform.scss";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/loading";

const UpdateUserForm = ({ closeUpdateUserForm, updateUser, getUsers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [client, setClient] = useState({
    clientId: updateUser.id,
    clientName: updateUser.clientName,
    clientLastName: updateUser.clientLastName,
    clientEmail: updateUser.clientEmail,
    clientCity: updateUser.clientCity,
    clientAdress: updateUser.clientAdress,
    clientPhone: updateUser.clientPhone,
  });

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };
  const updateUserInfo = (e) => {
    setIsLoading(false);
    e.preventDefault();
    console.log(client);
    if (Object.values(client).every((value) => value)) {
      axios
        .post("http://localhost:8080/adminTask/v1/editClient", {
          clientId: client.clientId,
          clientName: client.clientName,
          clientLastName: client.clientLastName,
          clientEmail: client.clientEmail,
          clientCity: client.clientCity,
          clientAdress: client.clientAdress,
          clientPhone: client.clientPhone,
        })
        .then((res) => {
          setIsLoading(true);
          if (res.data.actionState) {
            toast.success(res.data.desc);
            closeUpdateUserForm();
            getUsers();
          } else {
            setIsLoading(true);
            toast.error(res.data.desc);
          }
        });
    } else {
      toast.error("Enter All User Info");
    }
  };
  const getCities = async () => {
    await axios
      .get("http://localhost:8080/clientActions/v1/getCities")
      .then((resp) => {
        setCities(resp.data.cities);
        // console.log(resp.data);
      });
  };
  useEffect(() => {
    getCities();
  }, []);
  return (
    <div className="userForm">
      {isLoading ? (
        <>
          <form onSubmit={updateUserInfo}>
            <CloseIcon
              onClick={() => closeUpdateUserForm()}
              className="closeUserForm"
            />
            <div className="row">
              <label>First Name</label>
              <input
                type="text"
                name="clientName"
                defaultValue={updateUser.clientName}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Last Name</label>
              <input
                type="text"
                defaultValue={updateUser.clientLastName}
                name="clientLastName"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Email</label>
              <input
                type="email"
                defaultValue={updateUser.clientEmail}
                name="clientEmail"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label>Phone Number</label>
              <input
                type="text"
                defaultValue={updateUser.clientPhone}
                name="clientPhone"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <label htmlFor="">City</label>
              <select
                name="clientCity"
                defaultValue={updateUser.clientCity}
                onChange={handleChange}
              >
                <option defaultValue={updateUser.clientCity}>
                  Select A City
                </option>
                {cities.map((city) => {
                  return (
                    <option key={city.cityId} value={city.cityId}>
                      {city.cityName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="row">
              <label>Adress</label>
              <input
                type="text"
                defaultValue={updateUser.clientAdress}
                name="clientAdress"
                onChange={handleChange}
              />
            </div>
            <button>Update</button>
          </form>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UpdateUserForm;
