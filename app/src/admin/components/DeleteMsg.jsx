import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const DeleteMsg = ({
  deleteUser,
  deleteCat,
  handleDeleteMark,
  deleteOrder,
  deleteProduct,
  hideDeleteMsg,
  action,
  title,
  subTitle,
}) => {
  const handleDelete = () => {
    switch (action) {
      case "deleteCategorie":
        deleteCat();
        break;
      case "deleteUser":
        deleteUser();
        break;
      case "deleteMark":
        handleDeleteMark();
        break;
      case "deleteProduit":
        deleteProduct();
        break;
      case "deleteOrder":
        deleteOrder();
        break;
      default:
        console.log(`No case matched`);
    }
    // if (action === "deleteCategorie") {
    //   deleteCat();
    // } else if (action === "deleteUser") {
    //   deleteUser();
    // } else if (action === "deleteMark") {
    //   handleDeleteMark();
    // } else if (action === "deleteProduit") {
    //   deleteProduct();
    // } else if (action === "deleteOrder") {
    //   deleteOrder();
    // } else if (action === "deleteOrderFromDash") {
    //   deleteOrderDash();
    // }
  };
  return (
    <div className="deleteContainer">
      <div className="content">
        <WarningAmberIcon className="icon" />
        <h2>{title}</h2>
        <h5>{subTitle}</h5>
        <div className="btn">
          <button className="delete" onClick={handleDelete}>
            Confirmer
          </button>
          <button className="cancel" onClick={hideDeleteMsg}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMsg;
