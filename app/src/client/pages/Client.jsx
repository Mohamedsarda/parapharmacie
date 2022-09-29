import { useState, useEffect } from "react";
//
import "./scss/client.scss";
//
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UpdateClientInfo from "../components/UpdateClientInfo";
//
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
//
import axios from "axios";
//
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Client = ({ clientIsAuth, signClientIn, clientSignOut }) => {
  const [clientData, setClientData] = useState([]);
  const [rows, setRows] = useState([]);
  const [type, setType] = useState("cart");
  const [updateClient, setUpdateClient] = useState(false);
  //
  const closeUpdateForm = () => {
    setUpdateClient(false);
  };
  //
  const getClientInfo = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/getClientInfo")
      .then((res) => {
        if (res.data.actionState) {
          setClientData(res.data.clientInfo);
        }
      });
  };
  //
  const getOrders = () => {
    axios
      .post("http://localhost:8080/clientActions/v1/getClientOrders", {
        state: type,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.actionState) {
          setRows(res.data.orders);
        }
      });
  };
  //
  useEffect(() => {
    getOrders();
    getClientInfo();
  }, [type, updateClient]);
  return (
    <div>
      <Navbar
        clientIsAuth={clientIsAuth}
        clientSignOut={clientSignOut}
        signClientIn={signClientIn}
      />
      <div className="ClientContainer">
        <div className="yourInfo">
          <PersonIcon />
          <div className="content">
            <div className="left">
              <div className="row">
                <h5>Prénom : </h5>
                <h3>{clientData.clientName}</h3>
              </div>
              <div className="row">
                <h5>Nom de famille : </h5>
                <h3>{clientData.clientLastName}</h3>
              </div>
              <div className="row">
                <h5>Email : </h5>
                <h3>{clientData.clientEmail}</h3>
              </div>
            </div>
            <div className="right">
              <div className="row">
                <h5>Phone : </h5>
                <h3>{clientData.clientPhone}</h3>
              </div>
              <div className="row">
                <h5>Address : </h5>
                <h3>{clientData.clientAdress}</h3>
              </div>
            </div>
          </div>
          <EditIcon
            onClick={() => setUpdateClient(true)}
            className="editIcon"
          />
        </div>

        <div className="orders">
          <div className="typeContainer">
            <button onClick={() => setType("approved")} className="Approved">
              Approved
            </button>
            <button onClick={() => setType("pending")} className="Pending">
              Pending
            </button>
            <button onClick={() => setType("delivered")} className="Delivered">
              Delivered
            </button>
            <button onClick={() => setType("canceled")} className="Canceled">
              Canceled
            </button>
            <button onClick={() => setType("cart")} className="inCart">
              In Cart
            </button>
          </div>
          <TableContainer component={Paper} className="table orders">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">Product</TableCell>
                  <TableCell className="tableCell">Customer</TableCell>
                  <TableCell className="tableCell">Date</TableCell>
                  <TableCell className="tableCell">Amount</TableCell>
                  <TableCell className="tableCell">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.orderId}>
                    <TableCell className="tableCell">
                      <div className="cellWrapper">
                        <img
                          src={`http://localhost:8080/${row.productImages}`}
                          alt={row.productName}
                        />
                        {row.productName.slice(0, 40)}...
                      </div>
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.clientName} {row.clientLastName}
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.orderTime.slice(0, 10)}
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.productCurrentPrice} DH
                    </TableCell>
                    <TableCell className={`tableCell center`}>
                      <span className={`status ${row.orderState}`}>
                        {row.orderState}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {updateClient && (
        <UpdateClientInfo
          clientData={clientData}
          closeUpdateForm={closeUpdateForm}
        />
      )}
      <Footer />
    </div>
  );
};

export default Client;
