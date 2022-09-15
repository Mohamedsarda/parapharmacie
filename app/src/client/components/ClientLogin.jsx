import React, { useState } from "react";
import axios from "axios";
import "./scss/clientLogin.scss";
import { toast } from "react-toastify";
import { setCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const ClientLogin = ({ closeLoginContainer, signClientIn }) => {
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const dispatch = useDispatch();

  const getCartCounter = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/getProductInCart")
      .then((res) => {
        if (res.data.actionState) {
          dispatch(setCounter(res.data.cart[0].ordersCount));
        }
      });
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
            getCartCounter();
            closeLoginContainer();
            toast.success(res.data.desc);
            // setTimeout(() => {
            //   window.location.href = "http://localhost:3000";
            // }, 2000);
          } else {
            toast.error(res.data.desc);
          }
        });
    } else {
      toast.error("please enter the email and password");
    }
  };
  return (
    <div className="ClientLogin">
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
            type="clientPassword"
            type="password"
            value={clientPassword}
            onChange={(e) => setClientPassword(e.target.value)}
          />
        </div>
        <button onClick={(e) => handleLogin(e)}>Connexion</button>
      </form>
      <p>si vous n'avez pas de compte cliquez ici pour vous inscrire</p>
      <button>Inscrire</button>
    </div>
  );
};

export default ClientLogin;
