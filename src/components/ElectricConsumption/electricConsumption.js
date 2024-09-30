import React from "react";
import styles from "./electricConsumption.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Yellow from "../../assets/images/yellow.png";
import Blue from "../../assets/images/blue.png";
import Actual from "../../assets/images/total-energy.png";
import pngImage from "../../assets/images/circle1.png";
import { useSelector } from "react-redux";

const ElectricConsumption = () => {
  const totalEnergy = useSelector((state) => state?.lightController?.data);
  const TotalEnergyconsumption = parseFloat(
    totalEnergy?.totalEnergy.toFixed(2)
  );
  return (
    <div className={`${styles.main}`}>
      <Box>
        <Grid container spacing={2} style={{ padding: 0 }}>
          <Grid item xs={12}>
            <Grid container className={` ${styles.title}`}>
              <Grid item className={`${styles.arrow}`}></Grid>
              <Grid>
                <Typography
                  className={`${styles.overView}`}
                  style={{ lineHeight: " 32px", fontSize: "14px" }}>
                  Electricity Consumption
                </Typography>
              </Grid>

              <div className={`${styles.tileContain}`}>
                <div className={`${styles.yellow}`}>
                  <img src={Yellow} alt="yellow" />{" "}
                </div>
                <div>
                  <p>Actual</p>
                </div>
                <div className={`${styles.blue}`}>
                  <img src={Blue} alt="blue" />{" "}
                </div>
                <div>
                  <p>Save</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <div className={`${styles.bodyMain}`}>
        <div className={`${styles.right}`}>
          <div className={styles.centeredContent} style={{ color: "#fff" }}>
            <span>{TotalEnergyconsumption}</span>
            <img src={Actual} alt="image-actual" />
          </div>
        </div>

        <div className={`${styles.left}`}>
          <div className={`${styles.leftInner}`}>
            <div className={`${styles.image1}`}>
              <img src={pngImage} alt="Progress" />
              <h6 className={`${styles.normal}`}>Normal</h6>
            </div>
          </div>
          <div className={`${styles.leftBottom}`}>
            <div className={`${styles.imagecircle}`}>
              <br />
              <h6 className={`${styles.saving}`}>Saving%</h6>

              <img src={pngImage} alt="Progress" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricConsumption;
