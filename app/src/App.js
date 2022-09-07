import { useState, useEffect } from "react";
import Users from "./admin/pages/Users";
import Home from "./admin/pages/Home";
import Products from "./admin/pages/Products";
import Login from "./admin/pages/Login";
import Categories from "./admin/pages/Categories";
import Marques from "./admin/pages/Marques";
import Orders from "./admin/pages/Orders";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const signOut = () => {
    axios
      .post("http://localhost:8080/adminAuthentication/v1/signOut")
      .then((res) => {
        if (res.data.actionState === true) setIsAuth(false);
      });
  };
  const signIn = () => {
    setIsAuth(true);
  };
  useEffect(() => {
    axios
      .post("http://localhost:8080/adminAuthentication/v1/isAdminAuth")
      .then((res) => {
        if (res.data.actionState === true) setIsAuth(true);
      });
  }, []);
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        {!isAuth ? (
          <Routes>
            <Route path="admin">
              <Route path="login" element={<Login signIn={signIn} />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="admin">
              <Route index element={<Home signOut={signOut} />} />
              <Route path="login" element={<Home signOut={signOut} />} />
              <Route
                path="categories"
                element={<Categories signOut={signOut} />}
              />
              <Route path="marques" element={<Marques signOut={signOut} />} />
              <Route path="orders" element={<Orders signOut={signOut} />} />
              <Route path="users">
                <Route index element={<Users signOut={signOut} />} />
              </Route>
              <Route path="products">
                <Route index element={<Products />} />
              </Route>
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
