import { useState } from "react";
import Users from "./admin/pages/Users";
import Home from "./admin/pages/Home";
import Login from "./admin/pages/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const signOut = () => {
    setIsAuth(false);
  };
  const signIn = () => {
    setIsAuth(true);
  };
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        {!isAuth ? (
          <Routes>
            <Route path="login" element={<Login signIn={signIn} />} />
          </Routes>
        ) : (
          <Routes>
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<Users />} />
            </Route>
            <Route path="products">
              <Route index element={<Users />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
