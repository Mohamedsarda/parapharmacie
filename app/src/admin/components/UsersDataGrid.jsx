import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./scss/usersDataGird.scss";
import DeleteMsg from "./DeleteMsg";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/loading";

const UsersDataGrid = ({ openUpdateUserForm, usersData, getUsers }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deleteMsgContainer, setDeleteMsgContainer] = useState(false);
  const [userId, setUserId] = useState("");

  //////////////////
  // const openUpdateUserForm = () => {
  //   setUpdateUserContainer(true);
  //   setUserInfo();
  // };

  const hideDeleteMsg = () => {
    setDeleteMsgContainer(false);
  };
  const getUserId = (id) => {
    setUserId(id);
    setDeleteMsgContainer(true);
  };
  const deleteUser = () => {
    setIsLoading(false);
    axios
      .post("http://localhost:8080/adminTask/v1/deleteClient", {
        clientId: userId,
      })
      .then((res) => {
        if (res.data.actionState) {
          setIsLoading(true);
          getUsers();
          hideDeleteMsg();
          toast.success(res.data.desc);
        } else {
          setIsLoading(true);
          toast.error(res.data.desc);
        }
      });
  };
  /////////////////////
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "clientName",
      headerName: "Prénom",
      width: 100,
      editable: true,
    },
    {
      field: "clientLastName",
      headerName: "Nom",
      width: 100,
      editable: true,
    },
    {
      field: "clientEmail",
      headerName: "Email",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "clientPhone",
      headerName: "Numéro de téléphone",
      type: "number",
      width: 200,
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
              onClick={() => getUserId(params.row.id)}
            >
              Supprimer
            </div>
            <div
              className="updateButton"
              onClick={() => openUpdateUserForm(params.row.id)}
            >
              Éditer
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
              rows={usersData}
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
      {deleteMsgContainer && (
        <DeleteMsg
          title="Êtes-vous sûr de vouloir supprimer cet utilisateur"
          subTitle="Chaque commande annulée - livrée - approuvée pour cet utilisateur sera supprimée"
          action="deleteUser"
          deleteUser={deleteUser}
          hideDeleteMsg={hideDeleteMsg}
        />
      )}
    </div>
  );
};

export default UsersDataGrid;
