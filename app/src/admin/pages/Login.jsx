import React, { useState } from "react";
import axios from "axios";
import "./scss/login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ signIn }) => {
  const naviagte = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/adminAuthentication/v1/signIn", {
        adminEmail: email,
        adminPassword: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.actionState === false)
          toast.error(response.data.desc);
        if (response.data.actionState === true) {
          toast.success(response.data.desc);
          signIn();
          naviagte("/admin");
        }
      })
      .catch((error) => {
        toast.error(error.data.desc);
      });
  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div className="row">
          <label htmlFor="">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="row">
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
