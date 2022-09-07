import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./scss/usersDataGird.scss";
import DeleteMsg from "./DeleteMsg";

const UsersDataGrid = ({ openUpdateUserForm }) => {
  const [deleteMsgContainer, setDeleteMsgContainer] = useState(false);
  const [userId, setUserId] = useState("");
  const hideDeleteMsg = () => {
    setDeleteMsgContainer(false);
  };
  const getUserId = (id) => {
    setUserId(id);
    setDeleteMsgContainer(true);
  };
  const deleteUser = () => {
    console.log(userId);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "Prénom",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Nom",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "number",
      width: 200,
      editable: true,
    },
    {
      field: "age",
      headerName: "Numéro de téléphone",
      type: "number",
      width: 200,
      editable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      email: "email@gmail.com",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      email: "email@gmail.com",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      email: "email@gmail.com",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      email: "email@gmail.com",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      email: "email@gmail.com",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      email: "email@gmail.com",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      email: "email@gmail.com",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      email: "email@gmail.com",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      age: 65,
      email: "email@gmail.com",
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
            {/* <Link
                to={`/${type}/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">View</div>
              </Link> */}
            <div
              className="deleteButton"
              onClick={() => getUserId(params.row.id)}
            >
              Supprimer
            </div>
            <div
              className="updateButton"
              // onClick={() => openUpdateUserForm(params.row.id)}
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
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
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
