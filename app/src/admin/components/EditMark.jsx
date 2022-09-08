import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const EditMark = ({ hideEditMarkContainer, updateMark }) => {
  const [markName, setMarkName] = useState("");
  return (
    <div className="categorieInput">
      <div className="content">
        <CloseIcon onClick={hideEditMarkContainer} className="close" />
        <h2>Entrez un nom de Marque</h2>
        <input
          type="text"
          value={markName}
          onChange={(e) => setMarkName(e.target.value)}
        />
        <button
          className="addCategorieBtn"
          onClick={() => updateMark(markName)}
        >
          Editer
        </button>
      </div>
    </div>
  );
};

export default EditMark;
