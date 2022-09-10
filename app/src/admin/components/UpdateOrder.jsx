import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const UpdateOrder = ({ closeUpdateMsg, getNewOrderType, updateOrder }) => {
  return (
    <div className="updateOrder">
      <div className="content">
        <CloseIcon onClick={closeUpdateMsg} className="OrdrerCloseIcon" />
        <h2>Select A State For This Order</h2>
        <div className="typeContainer">
          <button
            onClick={() => {
              getNewOrderType("approved");
              updateOrder();
            }}
            className="Approved"
          >
            Approved
          </button>
          <button
            onClick={() => {
              getNewOrderType("pending");
              updateOrder();
            }}
            className="Pending"
          >
            Pending
          </button>
          <button
            onClick={() => {
              getNewOrderType("delivered");
              updateOrder();
            }}
            className="Delivered"
          >
            Delivered
          </button>
          <button
            onClick={() => {
              getNewOrderType("canceled");
              updateOrder();
            }}
            className="Canceled"
          >
            Canceled
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
