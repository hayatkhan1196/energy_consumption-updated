import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeIcon from "@mui/icons-material/LightMode";
import styles from "./streetLightData.module.scss";
import EnergyToggleButton from "../../EnergyToggleButton/EnergyToggleButton";
import TungstenIcon from "@mui/icons-material/Tungsten";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { energyConsumption } from "../../../Redux/actions/EnergyConsumption/EnergyConsumption";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/styles";

const StreetLightModal = ({ liveDeviceData, isOpen, closeModalReq }) => {
  const [value, setValue] = useState(0);
  const marks = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 25,
      label: "25%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];

  const ColoredLabelSlider = withStyles({
    markLabel: {
      color: "white", // Set the color of the mark labels to white
    },
  })(Slider);
  const geoEnergyliveData = useSelector(
    (state) => state?.getLiveEnergyData?.data
  );
  const dispatch = useDispatch();
  const columns = Object.entries(liveDeviceData);
  const keyStyle = {
    color: "#fff", // Set the text color to white
  };
  const [isOn, setIsOn] = React.useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn); // Toggle the state (0 or 1)
  };
  const energyData = {
    deviceId: parseInt(liveDeviceData.deviceId),
    deviceState: isOn ? 1 : 0,
  };
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const saveHandle = () => {
    // dispatch(energyConsumption(energyData));
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
              onClick={() => closeModalReq(false)}>
              X
            </div>
            <div
              style={{
                boxShadow: "0 4px 18px rgba(221, 221, 62, 1)",
                height: "10rem",
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
                        color: isOn ? "green" : "red",
                      }}>
                      {isOn ? "On" : "Off"}
                    </span>
                  </strong>
                </div>
                <div>
                  <EnergyToggleButton
                    toggleBtn={toggleSwitch}
                    isOn={liveDeviceData?.deviceState == 1}
                  />
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
              <div
                style={{
                  display: "flex",
                  marginBottom: 20,
                }}>
                <p
                  style={{
                    marginLeft: 15,
                    fontSize: 16,
                    color: "#fff",
                    marginBottom: 10,
                  }}>
                  Dimming Level
                </p>
                <div style={{ width: 250, marginLeft: 45 }}>
                  <ColoredLabelSlider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    marks={marks}
                    step={25}
                    min={0}
                    max={100}
                    valueLabelFormat={(value) => `${value}%`}
                  />
                </div>
              </div>
            </div>

            <div />
            <div
              style={{
                display: "flex",
              }}>
              {" "}
              <TungstenIcon style={{ color: "#fff", marginTop: "12px" }} />
              <h4 style={{ color: "#fff", marginLeft: "7px" }}>
                Street Lights Data
              </h4>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "10px",
                marginTop: "30px",
              }}>
              <div>
                {columns.map(([key, value], index) => {
                  if (["name", "power", "deviceState"].includes(key)) {
                    return (
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
                    );
                  }
                  return null;
                })}
              </div>
              <div>
                {columns.map(([key, value], index) => {
                  if (["latitude", "longitude", "address"].includes(key)) {
                    return (
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
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* <div
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
                      {console.log(`"value===>"${value} "key===>"${key}`)}
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
            </div> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default StreetLightModal;
