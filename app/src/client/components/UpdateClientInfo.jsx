import { useState, useEffect } from "react";
//
import { toast } from "react-toastify";
//
import CloseIcon from "@mui/icons-material/Close";
//
import axios from "axios";

const UpdateClientInfo = ({ closeUpdateForm, clientData }) => {
  const [cities, setCities] = useState([]);
  const [client, setClient] = useState({
    clientName: clientData.clientName,
    clientLastName: clientData.clientLastName,
    clientEmail: clientData.clientEmail,
    clientPassword: "",
    clientCity: clientData.clientCity,
    clientAdress: clientData.clientAdress,
    clientPhone: clientData.clientPhone,
  });
  //
  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value.trim() });
  };
  //
  const editClientInfo = (e) => {
    e.preventDefault();
    if (
      client.clientName &&
      client.clientLastName &&
      client.clientEmail &&
      client.clientCity &&
      client.clientAdress &&
      client.clientPhone !== ""
    ) {
      axios
        .post("http://localhost:8080/clientActions/v1/editClientInfo", {
          clientName: client.clientName,
          clientLastName: client.clientLastName,
          clientEmail: client.clientEmail,
          clientPassword: client.clientPassword,
          clientCity: client.clientCity,
          clientAdress: client.clientAdress,
          clientPhone: client.clientPhone,
        })
        .then((res) => {
          if (res.data.actionState) {
            toast.success(res.data.desc);
            closeUpdateForm();
          } else {
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
      });
  };
  useEffect(() => {
    getCities();
  }, []);
  return (
    <div className="updateClientContainer">
      <form onSubmit={editClientInfo}>
        <CloseIcon onClick={closeUpdateForm} className="icon" />
        <div className="row">
          <label>First Name</label>
          <input
            type="text"
            name="clientName"
            defaultValue={clientData.clientName}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label>Last Name</label>
          <input
            type="text"
            defaultValue={clientData.clientLastName}
            name="clientLastName"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label>Email</label>
          <input
            type="email"
            defaultValue={clientData.clientEmail}
            name="clientEmail"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label>Phone Number</label>
          <input
            type="text"
            defaultValue={clientData.clientPhone}
            name="clientPhone"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label>Password</label>
          <input
            type="password"
            defaultValue={clientData.clientPassword}
            name="clientPassword"
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="">City</label>
          <select name="clientCity" onChange={handleChange}>
            <option value={clientData.clientCity}>Select A City</option>
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
            defaultValue={clientData.clientAdress}
            onChange={handleChange}
            name="clientAdress"
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default UpdateClientInfo;
