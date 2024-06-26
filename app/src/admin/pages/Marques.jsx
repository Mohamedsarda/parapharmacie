import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import AddMarks from "../components/AddMarks";
import EditMark from "../components/EditMark";
import DeleteMsg from "../components/DeleteMsg";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/loading";

const Marques = ({ signOut }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [marksData, setMarksData] = useState([]);
  const [deleteMarkName, setDeleteMarkName] = useState("");
  const [updateMarkName, setUpdateMarkName] = useState("");
  const [updateMarkId, setUpdateMarkId] = useState("");
  const [addMarkState, setAddMarkState] = useState(false);
  const [editMarkState, setEditMarkState] = useState(false);
  const [deleteMsgContainer, setDeleteMsgContainer] = useState(false);

  const hideEditMarkContainer = () => {
    setEditMarkState(false);
  };
  const hideDeleteMsgContainer = () => {
    setDeleteMsgContainer(false);
  };
  const hideAddMarkContainer = () => {
    setAddMarkState(false);
  };

  //////////////////////////////////

  const handleUpdateMark = (markName, id) => {
    setUpdateMarkName(markName);
    setUpdateMarkId(id);
    setEditMarkState(true);
  };

  const updataSingleMark = (name, id) => {
    setMarksData(
      marksData.map((p) => {
        return p.id === id ? { ...p, id: p.id, markName: name } : p;
      })
    );
  };

  const updateMark = (newMarkName) => {
    setIsLoading(false);
    axios
      .post("http://localhost:8080/adminTask/v1/editMark", {
        markCurrentName: updateMarkName,
        markNewName: newMarkName,
      })
      .then((res) => {
        if (res.data.actionState === true) {
          updataSingleMark(newMarkName, updateMarkId);
          toast.success(res.data.desc);
          setEditMarkState(false);
          setIsLoading(true);
        } else {
          toast.error(res.data.desc);
        }
      });
  };
  const getMarkNameShowDelete = (markName) => {
    setDeleteMarkName(markName);
    setDeleteMsgContainer(true);
  };
  const handleDeleteMark = () => {
    setIsLoading(false);
    if (deleteMarkName) {
      axios
        .post("http://localhost:8080/adminTask/v1/deleteMark", {
          markName: deleteMarkName,
        })
        .then((res) => {
          if (res.data.actionState === true) {
            setDeleteMarkName("");
            setMarksData(
              marksData.filter((mark) => mark.markName !== deleteMarkName)
            );
            toast.success(res.data.desc);
            setDeleteMsgContainer(false);
            setIsLoading(true);
          } else {
            toast.error(res.data.desc);
            setIsLoading(true);
          }
        });
    } else {
      toast.error("erreur veuillez réessayer");
    }
  };
  const handleAddMark = (markName) => {
    setIsLoading(false);
    axios
      .post("http://localhost:8080/adminTask/v1/addMark", {
        markName,
      })
      .then((res) => {
        if (res.data.actionState === true) {
          setMarksData([
            ...marksData,
            { markName: markName, id: res.data.insertedId },
          ]);
          toast.success(res.data.desc);
          setAddMarkState(false);
          setIsLoading(true);
        } else {
          toast.error(res.data.desc);
        }
      });
  };
  const getMarks = () => {
    axios.get("http://localhost:8080/clientActions/v1/getMarks").then((res) => {
      if (res.data.actionState === true) {
        setMarksData(res.data.marks);
        setIsLoading(true);
      } else {
        toast.error(res.data.desc);
      }
    });
  };
  useEffect(() => {
    getMarks();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "markName",
      headerName: "Marque Name",
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
              onClick={() => getMarkNameShowDelete(params.row.markName)}
            >
              Delete
            </div>
            <div
              className="updateButton"
              onClick={() =>
                handleUpdateMark(params.row.markName, params.row.id)
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
    <div className="categories">
      {isLoading ? (
        <>
          <SideBar signOut={signOut} />
          <div className="categotiesContainer">
            <NavBar />
            <div className="datatable">
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={marksData}
                  columns={columns.concat(actionColumn)}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
              {deleteMsgContainer && (
                <DeleteMsg
                  title="Êtes-vous sûr de vouloir supprimer cet marque"
                  subTitle=""
                  action="deleteMark"
                  handleDeleteMark={handleDeleteMark}
                  hideDeleteMsg={hideDeleteMsgContainer}
                />
              )}
            </div>
            <div className="addUser" onClick={() => setAddMarkState(true)}>
              +
            </div>
            {addMarkState && (
              <AddMarks
                hideAddMarkContainer={hideAddMarkContainer}
                handleAddMark={handleAddMark}
              />
            )}
            {editMarkState && (
              <EditMark
                hideEditMarkContainer={hideEditMarkContainer}
                updateMark={updateMark}
                updateMarkName={updateMarkName}
              />
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Marques;
