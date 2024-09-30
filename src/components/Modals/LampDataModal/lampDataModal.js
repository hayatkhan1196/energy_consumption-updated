// import React from "react";

// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Canvas from "@mui/material/Canvas";
// import SvgIcon from "@mui/material/SvgIcon";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import LightModeIcon from "@mui/icons-material/LightMode";
// const LightControl = () => {
//   return (
//     <Paper elevation={3}>
//       <Box p={3}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Grid container alignItems="center">
//               <Grid item>
//                 <SvgIcon
//                   component={LightModeIcon}
//                   viewBox="0 0 40 40"
//                   fontSize="large"
//                 />
//               </Grid>
//               <Grid item>
//                 <Typography variant="h6">Light Controller Overview</Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={6}>
//             <Box textAlign="center">
//               {/* <Canvas id="lighting" width={60} height={60} /> */}
//               <Typography variant="h4" color="primary">
//                 --.--
//               </Typography>
//               <Typography variant="subtitle1">Lighting(%)</Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box textAlign="center">
//               {/* <Canvas id="online" width={60} height={60} /> */}
//               <Typography variant="h4" color="primary">
//                 --.--
//               </Typography>
//               <Typography variant="subtitle1">Online Lights(%)</Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Typography variant="body1">
//               On Lights
//               <Typography variant="h6" color="primary">
//                 0
//               </Typography>
//             </Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <Typography variant="body1">
//               Off Lights
//               <Typography variant="h6" color="primary">
//                 0
//               </Typography>
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Box borderBottom={1} mt={2} mb={2} />
//           </Grid>
//           <Grid item xs={6}>
//             <Typography variant="body1">
//               Online Light Control
//               <Typography variant="h6" color="primary">
//                 0
//               </Typography>
//             </Typography>
//             625
//           </Grid>
//           <Grid item xs={6}>
//             <Typography variant="body1">
//               Light Control
//               <Typography variant="h6" color="primary">
//                 0
//               </Typography>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// };

// export default LightControl;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeIcon from "@mui/icons-material/LightMode";
// import styles from "./lampDataModal.scss";
import EnergyToggleButton from "../../EnergyToggleButton/EnergyToggleButton";
import TungstenIcon from "@mui/icons-material/Tungsten";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { energyConsumption } from "../../../Redux/actions/EnergyConsumption/EnergyConsumption";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const LampLight = ({ liveDeviceData, isOpen, closeModalReq, closeModal }) => {
  const geoEnergyliveData = useSelector(
    (state) => state?.getLiveEnergyData?.data
  );
  const dispatch = useDispatch();
  const columns = Object.entries(liveDeviceData);
  const keyStyle = {
    color: "#fff", // Set the text color to white
  };
  const [isOn, setIsOn] = React.useState(false);
  // Default to "Off" state

  // Simulating the deviceState (0 or 1) for demonstration purposes
  const deviceState = liveDeviceData.deviceState; // Replace this with your actual device state value

  useEffect(() => {
    // Set the isOn state based on the deviceState
    setIsOn(deviceState);
  }, [deviceState]);
  const toggleSwitch = () => {
    setIsOn((prevIsOn) => (prevIsOn === 1 ? 0 : 1)); // Toggle the state (0 or 1)
  };
  const energyData = {
    deviceId: parseInt(liveDeviceData.deviceId),
    deviceState: isOn ? 1 : 0,
  };
  const saveHandle = () => {
    dispatch(energyConsumption(energyData));
    toast.success("Data saved successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Automatically close after 3 seconds
    });
  };

  return (
    <>
      <ToastContainer />
      {isOpen ? (
        <div
          // className={`${styles.main}`}
          style={{
            // backgroundColor: "rgba(0,4,53,0.9)",
            // background:
            //   " linear-gradient(135deg, rgba(0, 4, 53, 0.8) 0%, rgba(0, 4, 53, 0.8) 100%)",
            // backgroundColor: "#fff",

            // border: "1px solid #87CEEB",
            // boxShadow: " 0 0px 18px rgba(221, 221, 62, 1)",
            position: "relative",
            borderRadius: "0 0 12px 12px",
            height: "24rem",
            width: "430px",
          }}>
          <div className="position-absolute w-100" style={{ width: "10rem" }}>
            <div
              style={{
                right: 10,
                color: "#FFF",
                cursor: "pointer",
                marginLeft: "95%",
              }}
              onClick={() => {
                // closeModalReq(false);
                // Call another method here
                closeModal(false);
              }}
            >
              X
            </div>
            <div
              style={{
                boxShadow: "0 4px 18px rgba(221, 221, 62, 1)",
                height: "6rem",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <div style={{ color: "#fff", margin: "10px" }}>
                  <h5>device Id :{liveDeviceData.deviceId} </h5>
                </div>
                <div style={{ color: "#fff", margin: "10px" }}>
                  <h5> Device Name:{liveDeviceData.name}</h5>
                </div>
              </div>
              <div
                style={{
                  color: "#fff",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",

                  // boxShadow: " 0 0px 18px rgba(221, 221, 62, 1)",
                }}>
                <div>
                  {" "}
                  Lights Turned{" "}
                  <strong>
                    <span
                      style={{
                        fontSize: "18px",
                        color: isOn == 1 ? "green" : "red",
                      }}>
                      {isOn == 1 ? "On" : "Off"}
                    </span>
                  </strong>
                </div>
                <div>
                  <EnergyToggleButton toggleBtn={toggleSwitch} isOn={isOn} />
                </div>
                <Button
                  onClick={() => saveHandle()}
                  size="small"
                  style={{
                    background:
                      " linear-gradient(135deg, rgba(0, 4, 53, 0.8) 0%, rgba(0, 4, 53, 0.8) 100%)",
                    color: "#fff",
                    marginBottom: "5px",
                    boxShadow: " 0 0px 18px rgba(221, 221, 62, 1)",
                  }}>
                  Save
                </Button>
              </div>
            </div>
            <div />
            <div
              style={{
                display: "flex",
              }}>
              {" "}
              <TungstenIcon style={{ color: "#fff", marginTop: "3px" }} />
              <h5 style={{ color: "#fff", marginLeft: "5px" }}>Cabinet Data</h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "10px",
              }}>
              <div>
                {columns
                  .slice(0, Math.ceil(columns.length / 2))
                  .map(([key, value], index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#fff",
                      }}>
                      <strong style={{ color: "#fff" }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </strong>
                      :{" "}
                      {key === "deviceState"
                        ? value === 1
                          ? "On"
                          : "Off"
                        : key === "doorState"
                        ? value === 1
                          ? "Open"
                          : "Close"
                        : value}
                    </div>
                  ))}
              </div>
              <div>
                {columns
                  .slice(Math.ceil(columns.length / 2))
                  .map(([key, value], index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#fff",
                      }}>
                      <strong style={{ color: "#fff" }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </strong>
                      :{" "}
                      {key === "deviceState"
                        ? value === 1
                          ? "On"
                          : "Off"
                        : key === "doorState"
                        ? value === 1
                          ? "Open"
                          : "Close"
                        : value}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LampLight;
