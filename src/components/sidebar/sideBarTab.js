import React from "react";
import { Stack, Typography, Paper, IconButton } from "@mui/material";
import SearchField from "../Search/search";
import DevicesIcon from "@mui/icons-material/Devices";
import CustomTreeItem from "../customSideBar/customSideBar";
import Sidebar from "../customSideBar/customSideBar";
const NavbarTabs = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "65px",
          background: " #000435",
          color: "#fff",
        }}>
        <Stack direction="column" alignItems="center">
          <IconButton>
            <DevicesIcon fontSize="large" style={{ color: "#fff" }} />
          </IconButton>
          <Typography variant="body1" align="center">
            Devices
          </Typography>
        </Stack>
      </div>
      <SearchField />
      <Sidebar />
    </>
  );
};

export default NavbarTabs;
