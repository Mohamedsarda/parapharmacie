import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import axios from "axios";
import CategorieForm from "./CategorieForm";

import "./scss/usersDataGird.scss";

const CategoriesData = () => {
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [categorieName, setCategorieName] = useState("");
  const [categorieData, setCategorieData] = useState([]);
  const [type, setType] = useState("");

  const updateData = (catName, catId) => {
    setCategorieData([...categorieData, { categorieName: catName, id: catId }]);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "categorieName",
      headerName: "Categorie Name",
      width: 150,
      editable: true,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.categorieName)}
            >
              Delete
            </div>
            <div className="updateButton">Update</div>
          </div>
        );
      },
    },
  ];

  const handleDelete = (name) => {
    setDeleteMsg(true);
    setCategorieName(name);
  };
  const deleteCat = () => {
    axios
      .post("http://localhost:8080/adminTask/v1/deleteCategorie", {
        categorieName,
      })
      .then((res) => {
        setDeleteMsg(false);
        setCategorieData(
          categorieData.filter((cat) => cat.categorieName !== categorieName)
        );
      });
  };
  useEffect(() => {
    const getCategories = () => {
      axios
        .post("http://localhost:8080/adminTask/v1/getCategories")
        .then((res) => {
          setCategorieData(res.data.categories);
        });
    };

    getCategories();
  }, []);

  return (
    <div className="datatable">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={categorieData}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>

      <CategorieForm updateData={updateData} />
      {deleteMsg && (
        <div className="deleteContainer">
          <div className="content">
            <WarningAmberIcon className="icon" />
            <h2>Êtes-vous sûr de vouloir supprimer cette catégorie</h2>
            <h5>Tous les produits liés à cette catégorie seront supprimés</h5>
            <div className="btn">
              <button className="delete" onClick={() => deleteCat()}>
                Confirmer
              </button>
              <button className="cancel" onClick={() => setDeleteMsg(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesData;
