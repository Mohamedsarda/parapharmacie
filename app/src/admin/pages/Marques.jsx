import React from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const Marques = ({ signOut }) => {
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
              // onClick={() => handleDelete(params.row.categorieName)}
            >
              Delete
            </div>
            <div
              className="updateButton"
              // onClick={() =>
              //   openUpdateCategorieContainer(
              //     params.row.categorieName,
              //     params.row.id
              //   )
              // }
            >
              Update
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="categories">
      <SideBar signOut={signOut} />
      <div className="categotiesContainer">
        <NavBar />
        <div className="datatable">
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows
              columns={columns.concat(actionColumn)}
              pageSize={5}
              rowsPerPageOptions={[5]}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Marques;
