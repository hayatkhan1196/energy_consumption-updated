import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Input,
} from "@mui/material";


const DynamicTable = ({ filteredData }) => {
  return (
    <>
      <Paper>
        <Table
          style={{
            backgroundColor: "#000435",
            border:"2px solid #fff",
            boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
          }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>Device Name</TableCell>
              <TableCell style={{ color: "white" }}>Device ID</TableCell>
              <TableCell style={{ color: "white" }}>Total Control</TableCell>
              <TableCell style={{ color: "white" }}>Total Energy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row, index) => (
              <TableRow key={index}>
                <TableCell style={{ color: "white" }}>
                  {row.deviceName}
                </TableCell>
                <TableCell style={{ color: "white" }}>{row.deviceId}</TableCell>
                <TableCell style={{ color: "white" }}>
                  {row.totalDeviceStatusChanges}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {row.totalEnergyConsumption}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default DynamicTable;
