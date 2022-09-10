import React, { useState, useEffect, useRef } from "react";
import "./scss/table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Loading from "../components/loading";
import DeleteMsg from "./DeleteMsg";
import { toast } from "react-toastify";
import UpdateOrder from "../components/UpdateOrder";

const List = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [orderId, setOrderId] = useState("");
  const orderType = useRef("");
  const [updateOrderMsg, setUpdateOrderMsg] = useState(false);

  const closeUpdateMsg = () => {
    setUpdateOrderMsg(false);
  };
  const getNewOrderType = (newType) => {
    orderType.current = newType;
  };
  const getUpdatedOrderType = (id) => {
    setUpdateOrderMsg(true);
    setOrderId(id);
  };
  ////////////////

  const updateOrder = () => {
    setIsLoading(false);
    axios
      .post("http://localhost:8080/adminTask/v1/editOrder", {
        id: orderId,
        type: orderType.current,
      })
      .then((res) => {
        if (res.data.actionState) {
          getOrders();
          toast.success(res.data.desc);
          setUpdateOrderMsg(false);
          setIsLoading(true);
        } else {
          toast.error(res.data.desc);
          setIsLoading(true);
        }
      });
  };

  const getOrders = () => {
    setIsLoading(false);
    axios
      .post("http://localhost:8080/adminTask/v1/getOrders", {
        from: 0,
        to: 5,
        type: "pending",
      })
      .then((res) => {
        setIsLoading(true);
        setRows(res.data.orders);
      });
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      {isLoading ? (
        <>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">ID</TableCell>
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
                  <TableCell className="tableCell">{row.orderId}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img
                        src={`http://localhost:8080/${row.productImages}`}
                        alt={row.productName}
                      />
                      {row.productName}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.clientName} {row.clientLastName}
                  </TableCell>
                  <TableCell className="tableCell">{row.orderTime}</TableCell>
                  <TableCell className="tableCell">
                    {row.productCurrentPrice} DH
                  </TableCell>
                  <TableCell className={`tableCell `}>
                    <span
                      onClick={(e) => getUpdatedOrderType(row.orderId)}
                      className={`status ${row.orderState}`}
                    >
                      {row.orderState}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <Loading />
      )}
      {updateOrderMsg && (
        <UpdateOrder
          updateOrder={updateOrder}
          getNewOrderType={getNewOrderType}
          closeUpdateMsg={closeUpdateMsg}
        />
      )}
    </TableContainer>
  );
};

export default List;
