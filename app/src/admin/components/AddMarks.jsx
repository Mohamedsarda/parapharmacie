import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const AddMarks = ({ hideAddMarkContainer, handleAddMark }) => {
  const [markName, setMarkName] = useState("");
  return (
    <div className="categorieInput">
      <div className="content">
        <CloseIcon onClick={hideAddMarkContainer} className="close" />
        <h2>Entrez un nom de Marque</h2>
        <input
          type="text"
          value={markName}
          onChange={(e) => setMarkName(e.target.value)}
        />
        <button
          className="addCategorieBtn"
          onClick={() => handleAddMark(markName)}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default AddMarks;
