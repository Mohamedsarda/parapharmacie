import React, { useState, useEffect } from "react";
import "../../admin/components/scss/userform.scss";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const SignInUp = ({ clientIsAuth, signClientIn, clientSignOut }) => {
  const [signInForm, setSignInFrom] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
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

  //////////////////////////

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (clientEmail && clientPassword) {
      axios
        .post("http://localhost:8080/clientActions/v1/clientSignIn", {
          clientEmail,
          clientPassword,
        })
        .then((res) => {
          if (res.data.actionState) {
            signClientIn();
            toast.success(res.data.desc);
            window.location.href = "/";
          } else {
            toast.error(res.data.desc);
          }
        });
    } else {
      toast.error("please enter the email and password");
    }
  };
  const clientSignIn = (e) => {
    e.preventDefault();
    if (client && !isNaN(client.clientPhone)) {
      axios
        .post("http://localhost:8080/clientActions/v1/clientSignUp", client)
        .then((res) => {
          if (res.data.actionState === true) {
            toast.success(res.data.desc);
            setSignInFrom(true);
          } else {
            toast.error(res.data.desc);
          }
        });
    } else {
      toast.error("Please Enter All The Indormations");
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
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      {!signInForm ? (
        <>
          <div className="userForm client">
            <h2>Sign Up</h2>
            <form onSubmit={clientSignIn}>
              <div className="row">
                <label>First Name</label>
                <input type="text" name="clientName" onChange={handleChange} />
              </div>
              <div className="row">
                <label>Last Name</label>
                <input
                  type="text"
                  name="clientLastName"
                  onChange={handleChange}
                />
              </div>
              <div className="row">
                <label>Email</label>
                <input
                  type="email"
                  name="clientEmail"
                  onChange={handleChange}
                />
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
                <input
                  type="text"
                  onChange={handleChange}
                  name="clientAdress"
                />
              </div>
              <button>Create</button>
              <h4 onClick={() => setSignInFrom(true)} className="signIn">
                Connectez vous si vous possédez déjà un compte
              </h4>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="userForm clientLogin">
            <h2>Login</h2>
            <form>
              <div className="row">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>
              <div className="row">
                <label htmlFor="">Mot de pass</label>
                <input
                  type="password"
                  value={clientPassword}
                  onChange={(e) => setClientPassword(e.target.value)}
                />
              </div>
              <button onClick={(e) => handleLogin(e)}>Connexion</button>
              <h4 onClick={() => setSignInFrom(false)} className="signIn">
                Vous n'avez pas de compte créez en un
              </h4>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default SignInUp;
