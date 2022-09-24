import { useState, useEffect } from "react";
import ClientHome from "./client/pages/Home";
import ContactUs from "./client/pages/ContactUs";
import About from "./client/pages/About";
import Parapharmacie from "./client/pages/Parapharmacie";
import Bag from "./client/pages/Bag";
import SignInUp from "./client/pages/SignInUp";

/////////////admin pages///////////////
import Home from "./admin/pages/Home";
import Users from "./admin/pages/Users";
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
  const [clientIsAuth, setClientIsAuth] = useState(false);
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
  const adminAuth = () => {
    axios
      .post("http://localhost:8080/adminAuthentication/v1/isAdminAuth")
      .then((res) => {
        if (res.data.actionState === true) setIsAuth(true);
      });
  };

  /////////////////////////////////////

  const clientIsSignIn = () => {
    setClientIsAuth(true);
  };

  const clientSignOut = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/clientSignOut")
      .then((res) => {
        if (res.data.actionState === true) setClientIsAuth(false);
      });
  };
  const clientAuth = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/isClientAuthenticated")
      .then((res) => {
        if (res.data.actionState === true) setClientIsAuth(true);
      });
  };

  /////////////////////////////////////

  useEffect(() => {
    adminAuth();
    clientAuth();
  }, []);
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        {!isAuth && !clientIsAuth ? (
          <Routes>
            <Route path="admin">
              <Route path="login" element={<Login signIn={signIn} />} />
            </Route>
            <Route path="/">
              <Route
                index
                element={
                  <ClientHome
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="ContactUs"
                element={
                  <ContactUs
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="About"
                element={
                  <About
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="Parapharmacie"
                element={
                  <Parapharmacie
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="SignInUp"
                element={
                  <SignInUp
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
            </Route>
          </Routes>
        ) : isAuth && !clientIsAuth ? (
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ClientHome
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="ContactUs"
                element={
                  <ContactUs
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="About"
                element={
                  <About
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="Parapharmacie"
                element={
                  <Parapharmacie
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="SignInUp"
                element={
                  <SignInUp
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
            </Route>
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
        ) : !isAuth && clientIsAuth ? (
          <Routes>
            <Route path="admin">
              <Route path="login" element={<Login signIn={signIn} />} />
            </Route>
            <Route path="/">
              <Route
                index
                element={
                  <ClientHome
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="ContactUs"
                element={
                  <ContactUs
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="About"
                element={
                  <About
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="Parapharmacie"
                element={
                  <Parapharmacie
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="SignInUp"
                element={
                  <SignInUp
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="bag"
                element={
                  <Bag
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="admin">
              <Route path="login" element={<Login signIn={signIn} />} />
            </Route>
            <Route path="/">
              <Route
                index
                element={
                  <ClientHome
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="ContactUs"
                element={
                  <ContactUs
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="About"
                element={
                  <About
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="Parapharmacie"
                element={
                  <Parapharmacie
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
              <Route
                path="SignInUp"
                element={
                  <SignInUp
                    signClientIn={clientIsSignIn}
                    clientSignOut={clientSignOut}
                    clientIsAuth={clientIsAuth}
                  />
                }
              />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
