import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateCategorie = ({
  closeUpdateCategorieContainer,
  currentCateName,
  currentCateId,
  updateData,
}) => {
  const [newCateName, setNewCateName] = useState("");
  const handleUpdate = () => {
    if (newCateName) {
      axios
        .post("http://localhost:8080/adminTask/v1/editCategorie", {
          currentCateName,
          newCateName,
        })
        .then((res) => {
          // updateData(newCateName, currentCateId);
          closeUpdateCategorieContainer();
          toast.success(res.data.desc);
        });
    } else {
      toast.error("Entrez un nom de catégorie");
      closeUpdateCategorieContainer();
    }
  };
  return (
    <div className="categorieInput">
      <div className="content">
        <CloseIcon onClick={closeUpdateCategorieContainer} className="close" />
        <h2>Entrez un nom de catégorie</h2>
        <input
          type="text"
          placeholder={currentCateName}
          value={newCateName}
          onChange={(e) => setNewCateName(e.target.value)}
        />
        <button className="addCategorieBtn" onClick={() => handleUpdate()}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateCategorie;
