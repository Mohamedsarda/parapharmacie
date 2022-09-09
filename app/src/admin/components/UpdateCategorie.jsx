import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/loading";

const UpdateCategorie = ({
  closeUpdateCategorieContainer,
  currentCateName,
  currentCateId,
  updataSingleCategorie,
}) => {
  const [newCateName, setNewCateName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handleUpdate = () => {
    if (newCateName) {
      setIsLoading(false);
      axios
        .post("http://localhost:8080/adminTask/v1/editCategorie", {
          currentCateName,
          newCateName,
        })
        .then((res) => {
          updataSingleCategorie(newCateName, currentCateId);
          closeUpdateCategorieContainer();
          toast.success(res.data.desc);
          setIsLoading(true);
        });
    } else {
      toast.error("Entrez un nom de catégorie");
      closeUpdateCategorieContainer();
    }
  };
  return (
    <div className="categorieInput">
      {isLoading ? (
        <>
          <div className="content">
            <CloseIcon
              onClick={closeUpdateCategorieContainer}
              className="close"
            />
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
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UpdateCategorie;
