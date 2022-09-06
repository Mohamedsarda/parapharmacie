import Users from "./admin/pages/Users";
import Home from "./admin/pages/Home";
import Login from "./admin/pages/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route index element={<Home />} />
          <Route path="users">
            <Route index element={<Users />} />
          </Route>
          <Route path="products">
            <Route index element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
