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

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeIcon from "@mui/icons-material/LightMode";
import styles from "./lightControl.module.scss";
import CircularProgressBar from "../circularProgress/circularProgressbar";
import CircularProgress from "./../circularProgress/circularProgress";
import { useDispatch, useSelector } from "react-redux";
import { lightController } from "../../Redux/actions/LightController/lightController";

const LightControl = () => {
  const lightControlData = useSelector((state) => state?.lightController?.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(lightController());
  }, []);

  return (
    <Paper
      className={`${styles.main}`}
      style={{
        // backgroundColor: "rgba(0,4,53,0.9)",
        background:
          " linear-gradient(135deg, rgba(0, 4, 53, 0.8) 0%, rgba(0, 4, 53, 0.8) 100%)",
        // backgroundColor: "#fff",

        // border: "1px solid #87CEEB",
        boxShadow: " 0 0px 18px rgba(221, 221, 62, 1)",
        width: "22rem",
        borderRadius: "0 0 12px 12px",
        height: "18rem",
      }}>
      <div>
        <Box p={3}>
          <Grid container spacing={2} style={{ padding: 0 }}>
            <Grid item xs={12}>
              <Grid container className={` ${styles.backImage}`}>
                <Grid item className={`${styles.arrow}`}></Grid>
                <Grid>
                  <Typography style={{ lineHeight: " 32px", fontSize: "14px" }}>
                    Light Controller Overview
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <div className="contain">
          <div className={`${styles.itemBox}`}>
            <div className={`${styles.left}`}>
              <div className={`${styles.square}`} style={{ color: "#fff" }}>
                <CircularProgressBar />
              </div>
              <div className={`${styles.info}`}>
                {/* <p className={styles.infoIcon}>--.--</p> */}
                <p className={`${styles.name}`}>Off Lights</p>
                <span className={`${styles.zero}`}>
                  {" "}
                  {lightControlData?.offDevices}
                </span>
              </div>
            </div>

            {/* <div className={`${styles.lights}`}>
              <p>
                On Lights
                <span className={`${styles.zero}`}>
                  {lightControlData?.onDevices}
                </span>
              </p>
              <hr style={{ backgroundColor: "gray" }} />
              <p>
                Off lights
                <span className={`${styles.zero}`}>
                  {lightControlData?.offDevices}
                </span>
              </p>
            </div> */}
          </div>
          <div className={`${styles.itemBox2}`}>
            <div className={`${styles.left}`}>
              <div className={`${styles.square}`} style={{ color: "#fff" }}>
                <CircularProgress />
              </div>

              <div className={`${styles.info}`}>
                {/* <p className={styles.infoIcon}>--.--</p> */}

                <p className={`${styles.name}`}>Online Lights</p>
                <span className={`${styles.zero}`}>
                  {" "}
                  {lightControlData?.onDevices}
                </span>
              </div>
            </div>

            {/* <div className={`${styles.lights}`}>
              <p>
                Online Light Control
                <span className={`${styles.zero}`}>
                  {" "}
                  {lightControlData?.onlineDevices}
                </span>
              </p>
              <hr style={{ backgroundColor: "gray" }} />
              <p>
                off light Control
                <span className={`${styles.zero}`}>
                  {" "}
                  {lightControlData?.offlineDevices}
                </span>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default LightControl;
