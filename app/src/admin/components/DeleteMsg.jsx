import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const DeleteMsg = ({
  deleteUser,
  deleteCat,
  hideDeleteMsg,
  action,
  title,
  subTitle,
}) => {
  const handleDelete = () => {
    if (action === "deleteCategorie") {
      deleteCat();
    } else if (action === "deleteUser") {
      deleteUser();
    }
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
