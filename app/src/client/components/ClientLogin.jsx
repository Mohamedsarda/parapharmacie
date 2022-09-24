import React, { useState, useRef } from "react";
import axios from "axios";
import "./scss/clientLogin.scss";
import { toast } from "react-toastify";
import { setCounter } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ClientLogin = ({
  closeLoginContainer,
  signClientIn,
  clientSignOut,
  clientIsAuth,
}) => {
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
  const logOut = () => {
    clientSignOut();
    dispatch(setCounter(0));
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
            toast.success(res.data.desc);
          } else {
            toast.error(res.data.desc);
          }
        });
    } else {
      toast.error("please enter the email and password");
    }
  };
  return (
    <>
      {clientIsAuth ? (
        <div className="ClientLogin">
          <div className="container">
            <li>Votre Compte</li>
            <li>Vos Commandes</li>
            <button onClick={() => logOut()}>Log Out</button>
          </div>
        </div>
      ) : (
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
                type="password"
                value={clientPassword}
                onChange={(e) => setClientPassword(e.target.value)}
              />
            </div>
            <button onClick={(e) => handleLogin(e)}>Connexion</button>
          </form>
          <p>si vous n'avez pas de compte cliquez ici pour vous inscrire</p>
          <button>
            <Link style={{ textDecoration: "none" , color:'white'}} to="/signInUp">
              Inscrire
            </Link>
          </button>
        </div>
      )}
    </>
  );
};

export default ClientLogin;
