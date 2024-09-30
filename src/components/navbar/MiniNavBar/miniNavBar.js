import React from "react";
import styles from "./miniNavBar.module.scss";

const MiniNavbar = () => {
  return (
    <div className={`${styles.titleIot}`}>
      <h4>AIOT Platform</h4>
      <span className={`${styles.nameIot}`}>
        AIOT Smart City Internet of Things Platform
      </span>
    </div>
  );
};

export default MiniNavbar;
