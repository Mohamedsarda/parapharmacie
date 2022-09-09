import React, { useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import Loading from "../components/loading";

const CategorieForm = ({ updateData }) => {
  const [categorieName, setCategorieName] = useState("");
  const [inputContainerState, setInputContainerState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const addCategorie = () => {
    if (categorieName) {
      setIsLoading(false);
      axios
        .post("http://localhost:8080/adminTask/v1/addCategorie", {
          categorieName,
        })
        .then((res) => {
          if (res.data.actionState === true) {
            updateData(categorieName, res.data.insertedId);
            setInputContainerState(false);
            toast.success(res.data.desc);
            setIsLoading(true);
          }
        });
    } else {
      toast.error("Veuillez entrer un nom de catégorie");
    }
  };
  return (
    <div>
      {isLoading ? (
        <>
          <div
            className="addUser"
            onClick={() => {
              setInputContainerState(true);
            }}
          >
            +
          </div>
          {inputContainerState && (
            <div className="categorieInput">
              <div className="content">
                <CloseIcon
                  onClick={() => setInputContainerState(false)}
                  className="close"
                />
                <h2>Entrez un nom de catégorie</h2>
                <input
                  type="text"
                  value={categorieName}
                  onChange={(e) => setCategorieName(e.target.value)}
                />
                <button className="addCategorieBtn" onClick={addCategorie}>
                  Ajouter
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CategorieForm;
