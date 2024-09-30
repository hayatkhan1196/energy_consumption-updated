import React from "react";
import styles from "./circularProgressBar.module.scss"; // Import your CSS file
import pngImage from "../../assets/images/energy-icon.png";
const CircularProgressBar = () => {
  return (
    <div className={`${styles.circularProgress}`}>
      <div className={`${styles.progress}`}>
        <div className={`${styles.progressBar}`}></div>
      </div>
      <div className={`${styles.iconContainer}`}>
        <img src={pngImage} alt="Progress" />
      </div>
    </div>
  );
};

export default CircularProgressBar;
