import React from "react";
import "./scss/login.scss";

const Login = () => {
  return (
    <div className="login">
      <form>
        <div className="row">
          <label htmlFor="">Email</label>
          <input type="email" />
        </div>
        <div className="row">
          <label htmlFor="">Password</label>
          <input type="password" />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
