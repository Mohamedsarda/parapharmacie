import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import CategorieForm from "./CategorieForm";
import DeleteMsg from "./DeleteMsg";
import { toast } from "react-toastify";
import UpdateCategorie from "./UpdateCategorie";
import Loading from "../components/loading";

import "./scss/usersDataGird.scss";

const CategoriesData = ({ closeLoading }) => {
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [updateCategorieContainer, setUpdateCategorieContainer] =
    useState(false);
  const [categorieName, setCategorieName] = useState("");
  const [currentCateName, setCurrentCateName] = useState("");
  const [currentCateId, setCurrentCateId] = useState("");
  const [categorieData, setCategorieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const closeUpdateCategorieContainer = () => {
    setUpdateCategorieContainer(false);
  };
  const openUpdateCategorieContainer = (currentCateName, currentCateId) => {
    setCurrentCateName(currentCateName);
    setCurrentCateId(currentCateId);
    setUpdateCategorieContainer(true);
  };

  const updateData = (catName, catId) => {
    setCategorieData([...categorieData, { categorieName: catName, id: catId }]);
  };
  const updataSingleCategorie = (name, id) => {
    setCategorieData(
      categorieData.map((p) => {
        return p.id === id ? { ...p, id: p.id, categorieName: name } : p;
      })
    );
  };
  const hideDeleteMsg = () => {
    setDeleteMsg(false);
  };
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
        if (res.data.actionState === true) {
          toast.success(res.data.desc);
          setDeleteMsg(false);
          setCategorieData(
            categorieData.filter((cat) => cat.categorieName !== categorieName)
          );
        } else {
          toast.error(res.data.desc);
        }
      });
  };
  useEffect(() => {
    const getCategories = () => {
      axios
        .get("http://localhost:8080/clientActions/v1/getCategories")
        .then((res) => {
          setCategorieData(res.data.categories);
          setIsLoading(true);
          toast.loading("hiiiiiiii");
        });
    };

    getCategories();
  }, []);

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
            <div
              className="updateButton"
              onClick={() =>
                openUpdateCategorieContainer(
                  params.row.categorieName,
                  params.row.id
                )
              }
            >
              Update
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {isLoading ? (
        <>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={categorieData}
              columns={columns.concat(actionColumn)}
              pageSize={5}
              rowsPerPageOptions={[5]}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </>
      ) : (
        <Loading />
      )}

      {updateCategorieContainer && (
        <UpdateCategorie
          currentCateId={currentCateId}
          currentCateName={currentCateName}
          updataSingleCategorie={updataSingleCategorie}
          closeUpdateCategorieContainer={closeUpdateCategorieContainer}
        />
      )}
      <CategorieForm updateData={updateData} />
      {deleteMsg && (
        <DeleteMsg
          title="Êtes-vous sûr de vouloir supprimer cette catégorie"
          subTitle="Tous les produits liés à cette catégorie seront supprimés"
          action="deleteCategorie"
          deleteCat={deleteCat}
          hideDeleteMsg={hideDeleteMsg}
        />
      )}
    </div>
  );
};

export default CategoriesData;
