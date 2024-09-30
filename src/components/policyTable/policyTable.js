import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import axios from "axios";
import EditPolicyModal from "../Modals/editPolicyModal/editPolicyModal";

const DynamicTable = ({ filteredData }) => {

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [policyIdToDelete, setPolicyIdToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPolicyData, setEditPolicyData] = useState(null);
  

  const handleDeletePolicy = (id) => {
    setShowConfirmation(true);
    setPolicyIdToDelete(id);
  };
  const handleEditPolicy = (data) => {
    setEditPolicyData(data);
    setIsModalOpen(true);
  };

  const handleSavePolicy = (editedData) => {
    // Implement logic to save the edited data
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("CabinetToken");

    axios({
      method: "DELETE",
      url: `http://192.168.0.24:9000/policy/${policyIdToDelete}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {

        toast(`${response.data.message}`);

        setShowConfirmation(false);
      })
      .catch((error) => {
        toast(`${error.response.data.message}`);
        setShowConfirmation(false);
      });
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <Paper style={{ overflowX: "auto" }}>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table
          style={{
            backgroundColor: "#000435",
            border:"2px solid #fff",
            boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
          }}>
          <TableHead>
            <TableRow>
              {/* <TableCell style={{ color: "white" }}>Policy ID</TableCell> */}
              <TableCell style={{ color: "white" }}>Policy Name</TableCell>
              <TableCell style={{ color: "white" }}>
                Start Data (Start Date TO End Date){" "}
              </TableCell>
              <TableCell style={{ color: "white" }}>
                End Data (Start Date TO End Date){" "}
              </TableCell>{" "}
              <TableCell style={{ color: "white" }}>Start Time</TableCell>
              <TableCell style={{ color: "white" }}>End Time</TableCell>
              <TableCell>
                <span style={{ marginLeft: "35px", color: "white" }}>
                  Action
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {/* <TableCell style={{ color: "white" }}>{row?._id}</TableCell> */}
                <TableCell style={{ color: "white" }}>
                  {row?.policyName}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {`${row?.startDates[0]} To ${
                    row?.startDates[row?.startDates.length - 1]
                  }`}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {`${row?.endDates[0]} To ${
                    row?.endDates[row?.endDates.length - 1]
                  }`}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {row?.startTime}
                </TableCell>
                <TableCell style={{ color: "white" }}>{row?.endTime}</TableCell>
                <TableCell>
                  <EditIcon
                    style={{
                      marginLeft: "20px",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEditPolicy(row)}
                  />
                  <DeleteIcon
                    style={{
                      marginLeft: "20px",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeletePolicy(row._id)}
                  />

                  {/* Confirmation Dialog */}
                  {showConfirmation && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000435",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999, // Adjust the z-index as needed
                      }}>
                      <div
                        style={{
                          background: "#000435",
                          boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
                          color: "#fff",
                          padding: "20px",
                          borderRadius: "8px",
                        }}>
                        <p>Are you sure want to delete this policy?</p>
                        <button
                          style={{
                            background: "#000435",
                            boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
                            color: "#fff",
                            borderRadius: "8px",
                          }}
                          onClick={handleConfirmDelete}>
                          Yes
                        </button>
                        <button
                          style={{
                            background: "#000435",
                            boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
                            color: "#fff",
                            borderRadius: "8px",
                            marginLeft: "10px",
                          }}
                          onClick={handleCancelDelete}>
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


        {/* Edit Policy Modal */}
        {isModalOpen && (
          <EditPolicyModal
            isOpen={isModalOpen}
            data={editPolicyData}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSavePolicy}
          />
        )}
      </div>
    </Paper>
  );
};

export default DynamicTable;
