import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import "react-date-range/dist/styles.css"; // Import the default styles
import "react-date-range/dist/theme/default.css"; // Import the default theme styles
import styles from "./formPolicy.module.scss";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { DatePicker, Space } from "antd";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Switch,
} from "@mui/material";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import DatePicker from "./datePicker/datePicker";
export default function FormPolicy() {
  const liveLatestData = useSelector(
    (state) => state?.getLiveLatestEnergyData?.data
  );
  console.log("livedata selector==>", liveLatestData);
  const { RangePicker } = DatePicker;
  const [formData, setFormData] = useState({
    policyName: "",
    startTime: "",
  });

  console.log(
    "🚀 ~ file: index.js:34 ~ FormPolicy ~ formData:",
    formData.startTime
  );
  const [endDateData, setEndDateData] = useState("");
  console.log("endDateData===>", endDateData);
  // console.log(
  //   "🚀 ~ file: index.js:37 ~ FormPolicy ~ formData:",
  //   formData.dateRange
  // );
  const [isLoading, setIsLoading] = useState(false);

  const [startDateData, setstartDateData] = useState("");
  console.log(
    "🚀 ~ file: index.js:53 ~ FormPolicy ~ startDateData:",
    startDateData
  );
  // console.log(
  //   "🚀 ~ file: index.js:37 ~ FormPolicy ~ formData:",
  //   formData.dateRange
  // );
  const [selectedDevices, setSelectedDevices] = useState([]);
  console.log(
    "🚀 ~ file: index.js:57 ~ FormPolicy ~ selectedDevices:",
    selectedDevices
  );
  const [selectedEndDateDevices, setSelectedEndDateDevices] = useState([]);
  console.log(
    "🚀 ~ file: index.js:59 ~ FormPolicy ~ selectedEndDateDevices:",
    selectedEndDateDevices[0]?.deviceId
  );

  const [selectedDateRange, setSelectedDateRange] = useState([]);
  console.log(" selectedDateRange:====>", selectedDateRange);
  const history = useHistory();

  // const [devices, setDevices] = useState(liveLatestData);
  // console.log("🚀 ~ file: index.js:62 ~ FormPolicy ~ devices:", devices);
  // const upDatedData = [...devices];
  // console.log(
  //   "🚀 ~ file: index.js:84 ~ FormPolicy ~ upDatedData:",
  //   upDatedData
  // );
  const [devicesEndDateData, setEndDateDataDevices] = useState(liveLatestData);

  const [startDeviceData, setStartDeviceData] = useState([]);
  console.log(
    "🚀 ~ file: index.js:77 ~ FormPolicy ~ startDeviceData:",
    startDeviceData
  );

  const [endDeviceData, setEndDeviceData] = useState([]);
  console.log(
    "🚀 ~ file: index.js:97 ~ FormPolicy ~ endDeviceData:",
    endDeviceData
  );

  // const [startDeviceState, setStartDeviceState] = useState(null);
  // console.log(
  //   "🚀 ~ file: index.js:78 ~ FormPolicy ~ startDeviceState:",
  //   startDeviceState == "true" ? 1 : 0
  // );
  // console.log(
  //   "🚀 ~ file: index.js:77 ~ FormPolicy ~ startDeviceId:",
  //   startDeviceId
  // );

  // const handleToggle = (deviceId, e) => {
  //   setDevices((prevDevices) =>
  //     prevDevices.map((device) => {
  //       console.log("🚀 ~ file: index.js:102 ~ prevDevices.map ~ device:", e);
  //       return device.deviceId === deviceId
  //         ? { ...device, deviceState: !device.deviceState }
  //         : device;
  //     })
  //   );
  // };
  const handleToggle = (deviceId, e) => {
    console.log("🚀 ~ file: index.js:127 ~ handleToggle ~ e:", e);

    setStartDeviceData((prevDevices) =>
      prevDevices.map((device) => {
        return device.deviceId === deviceId
          ? { ...device, deviceState: e.target.checked ? 1 : 0 }
          : device;
      })
    );
  };

  //  End Date data

  // const handleEndDateToggle = (deviceId ,e) => {
  //   setEndDateDataDevices((prevDevices) =>
  //     prevDevices.map((device) => {
  //       return device.deviceId === deviceId
  //         ? { ...device, deviceState: !device.deviceState }
  //         : device;
  //     })
  //   );
  // };
  const handleEndDateToggle = (deviceId, e) => {
    console.log("🚀 ~ file: index.js:146 ~ handleEndDateToggle ~ e:", e);

    setEndDeviceData((prevDevices) =>
      prevDevices.map((device) => {
        return device.deviceId === deviceId
          ? { ...device, deviceState: e.target.checked ? 1 : 0 }
          : device;
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [formattedStartTime, setFormattedSatrtTime] = useState("");
  console.log(
    "🚀 ~ file: index.js:000 ~ FormPolicy ~ formattedTime:",
    formattedStartTime
  );
  const handleSartDateDateChange = (e) => {
    const inputTime = e.target.value;
    const parsedTime = moment(inputTime, "HH:mm:ss");
    if (parsedTime.isValid()) {
      const formatted = parsedTime.format("HH:mm:ss");
      setFormattedSatrtTime(formatted);
    } else {
      setFormattedSatrtTime("Invalid time format");
    }
    setstartDateData(inputTime);
  };

  // end Date data
  const [formattedEndTime, setFormattedEndTime] = useState("");
  console.log(
    "🚀 ~ file: index.js:123 ~ FormPolicy ~ formattedTime:",
    formattedEndTime
  );
  const handleEndDateDateChange = (e) => {
    const inputTime = e.target.value;
    const parsedTime = moment(inputTime, "HH:mm:ss");
    if (parsedTime.isValid()) {
      const formatted = parsedTime.format("HH:mm:ss");
      setFormattedEndTime(formatted);
    } else {
      setFormattedEndTime("Invalid time format");
    }
    setEndDateData(inputTime);
  };

  const onChange = (dates, dateStrings) => {
    if (dates) {
      const startDate = moment(dateStrings[0]);
      const endDate = moment(dateStrings[1]);
      const datesArray = getDatesArray(startDate, endDate);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      setSelectedDateRange(datesArray);
    } else {
      setSelectedDateRange([]);
    }
  };

  const getDatesArray = (startDate, endDate) => {
    const dates = [];
    let currentDate = moment(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "days");
    }

    return dates;
  };

  //  End date data

  const [selectedEndDateDateRange, setSelectedEndDateDateRange] = useState([]);

  const onChangeEndDateData = (dates, dateStrings) => {
    if (dates) {
      const startDate = moment(dateStrings[0]);
      const endDate = moment(dateStrings[1]);
      const datesEndDateArray = getDatesEndArray(startDate, endDate);

      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);

      setSelectedEndDateDateRange(datesEndDateArray); // Update the state with the selected date range
    } else {
      setSelectedEndDateDateRange([]);
    }
  };

  // End date Data
  const getDatesEndArray = (startDate, endDate) => {
    const Seconddates = [];
    let currentEndDateData = moment(startDate);

    while (currentEndDateData <= endDate) {
      Seconddates.push(currentEndDateData.format("YYYY-MM-DD"));
      currentEndDateData = currentEndDateData.add(1, "days");
    }

    return Seconddates;
  };

  function findInArray(arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var el = arr[i];
      if (el.deviceId == id) return i;
    }
    return -1;
  }
  const handleCheckboxClick = (deviceId, deviceState, e) => {
    console.log(
      "🚀 ~ file: index.js:246 ~ handleCheckboxClick ~ deviceId, deviceState:",
      deviceId,
      deviceState
    );
    const startDeviceArray = [...startDeviceData];
    const StartIndex = findInArray(startDeviceArray, deviceId);

    if (StartIndex == -1 && e.target.checked) {
      const startdeviceObject = {
        deviceId: deviceId,
        deviceState: deviceState,
      };
      console.log(
        "🚀 ~ file: index.js:253 ~ handleCheckboxClick ~ startdeviceObject:",
        startdeviceObject
      );
      startDeviceArray.push(startdeviceObject);

      setStartDeviceData(startDeviceArray);
    }
    if (StartIndex !== -1 && e.target.checked == false) {
      startDeviceArray.splice(StartIndex, 1);

      setStartDeviceData(startDeviceArray);
    }
    console.log("event==>", e.target.checked);
    const selectedDeviceIndex = selectedDevices.findIndex(
      (device) => device.deviceId === deviceId
    );

    if (selectedDeviceIndex === -1) {
      // Device is not selected, add it to the array
      setSelectedDevices([...selectedDevices, { deviceId, deviceState }]);
    } else {
      // Device is already selected, remove it from the array
      const updatedSelectedDevices = [...selectedDevices];
      updatedSelectedDevices.splice(selectedDeviceIndex, 1);
      setSelectedDevices(updatedSelectedDevices);
    }
  };

  // end Date  data function
  function findInEndArray(arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var el = arr[i];
      if (el.deviceId == id) return i;
    }
    return -1;
  }
  const handleEndDateCheckboxClick = (deviceId, deviceState, e) => {
    const endDeviceArray = [...endDeviceData];
    const StartIndex = findInEndArray(endDeviceArray, deviceId);
    if (StartIndex == -1 && e.target.checked) {
      const endDeviceObject = {
        deviceId: deviceId,
        deviceState: deviceState == 1 ? 1 : 0,
      };
      console.log(
        "🚀 ~ file: index.js:299 ~ handleEndDateCheckboxClick ~ endDeviceObject:",
        endDeviceObject
      );
      endDeviceArray.push(endDeviceObject);

      setEndDeviceData(endDeviceArray);
    }
    if (StartIndex !== -1 && e.target.checked == false) {
      endDeviceArray.splice(StartIndex, 1);

      setEndDeviceData(endDeviceArray);
    }
    console.log("event2==>", e.target.checked);

    const selectedDeviceIndex = selectedEndDateDevices.findIndex(
      (device) => device.deviceId === deviceId
    );

    if (selectedDeviceIndex === -1) {
      // Device is not selected, add it to the array
      setSelectedEndDateDevices([
        ...selectedEndDateDevices,
        { deviceId, deviceState },
      ]);
    } else {
      // Device is already selected, remove it from the array
      const updatedSelectedDevices = [...selectedEndDateDevices];
      updatedSelectedDevices.splice(selectedDeviceIndex, 1);
      setSelectedEndDateDevices(updatedSelectedDevices);
    }
  };

  const PolicyFormData = {
    policyName: formData.policyName,
    startDates: selectedDateRange,
    endDates: selectedEndDateDateRange,
    startTime: formattedStartTime,
    endTime: formattedEndTime,
    activeStatus: true,
    startData: startDeviceData,
    endData: endDeviceData,
  };
  console.log("🚀 ~  PolicyFormDatahAYAT:", PolicyFormData);
  const token = localStorage.getItem("CabinetToken");
  const handlePolicyDevice = () => {
    setIsLoading(true);
    axios({
      method: "POST",
      url: "http://192.168.0.24:9000/policy",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: PolicyFormData,
    })
      .then((response) => {
        toast(`${response.data.message}`);

        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            history.push("/ruleManagement");
          }, 1000);
        }, 500);
      })
      .catch((error) => {
        console.log("This is error: ", error.response);
        toast(`${error.response.data.message}`);
      });
  };

  return (
    <Container style={{ marginLeft: "8rem" }}>
      <div
        style={{
          backgroundColor: "#000435",
          position: "fixed",
          height: "100vh",
          width: "90%",
          overflowY: "auto",
        }}>
        <div className={styles.formContainer}>
          <h1 style={{ color: "#fff" }}>Start Data</h1>
          <div className={styles.formField}>
            <label style={{ color: "#fff" }}>Policy Name:</label>
            <input
              type="text"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formField}>
            <label style={{ color: "#fff" }}>Date Range:</label>
            <RangePicker
              style={{ background: "#fff", width: "200px" }}
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
              }}
              onChange={onChange}
            />
          </div>
          <div className={styles.formField}>
            <label style={{ color: "#fff" }}>Start Time:</label>
            <input
              type="time"
              name="startTime"
              value={startDateData}
              onChange={handleSartDateDateChange}
            />
          </div>
          <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
            <Table
              style={{
                backgroundColor: "#000435",
                boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
                border: "1px solid #fff",
              }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#fff" }}>Checkbox</TableCell>
                  <TableCell style={{ color: "#fff" }}>Device Name</TableCell>
                  <TableCell style={{ color: "#fff" }}>Toggle Switch</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {liveLatestData &&
                  liveLatestData?.map((device) => (
                    <TableRow key={device?.deviceId}>
                      <TableCell>
                        <Checkbox
                          style={{ color: "#fff" }}
                          checked={selectedDevices.some(
                            (d) => d.deviceId === device.deviceId
                          )}
                          onClick={(e) =>
                            handleCheckboxClick(
                              device.deviceId,
                              device.deviceState,
                              e
                            )
                          }
                        />
                      </TableCell>
                      <TableCell style={{ color: "#fff" }}>
                        {device?.name}
                      </TableCell>
                      <TableCell style={{ color: "#fff" }}>
                        <Switch
                          defaultChecked={device?.deviceState === 1 ? 1 : 0}
                          onChange={(e) => handleToggle(device?.deviceId, e)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* End date DATA  */}

        <div className={styles.formContainer2}>
          <h1 style={{ color: "#fff" }}>End Date Data</h1>
          <div className={styles.formField}>
            <label style={{ color: "#fff" }}>End Date Range:</label>
            <RangePicker
              style={{ background: "#fff", width: "200px" }}
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
              }}
              onChange={onChangeEndDateData}
            />
          </div>
          <div className={styles.formField}>
            <label style={{ color: "#fff" }}>End Time:</label>
            <input
              type="time"
              name="EndTime"
              value={endDateData}
              onChange={handleEndDateDateChange}
            />
          </div>
          <TableContainer
            component={Paper}
            style={{
              marginBottom: "20px",
              // overflowY: "auto",
              // height: "15rem",
            }}>
            <Table
              style={{
                backgroundColor: "#000435",
                boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
                border: "1px solid #fff",
              }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#fff" }}>Checkbox</TableCell>
                  <TableCell style={{ color: "#fff" }}>Device Name</TableCell>
                  <TableCell style={{ color: "#fff" }}>Toggle Switch</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
              // className={styles.customTableContainer}
              >
                {devicesEndDateData &&
                  devicesEndDateData?.map((device) => (
                    <TableRow key={device?.deviceId}>
                      <TableCell>
                        <Checkbox
                          style={{ color: "#fff" }}
                          checked={selectedEndDateDevices.some(
                            (d) => d.deviceId === device.deviceId
                          )}
                          onClick={(e) =>
                            handleEndDateCheckboxClick(
                              device.deviceId,
                              device.deviceState,
                              e
                            )
                          }
                        />
                      </TableCell>
                      <TableCell style={{ color: "#fff" }}>
                        {device?.name}
                      </TableCell>
                      <TableCell style={{ color: "#fff" }}>
                        <Switch
                          defaultChecked={device?.deviceState === 1 ? 1 : 0}
                          onChange={(e) =>
                            handleEndDateToggle(device?.deviceId, e)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            style={{
              backgroundColor: "#111435",
              boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
              width: "130px",
              marginLeft: "620px",
              color: "#fff",
            }}
            onClick={handlePolicyDevice}>
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin /> // Show a spinning icon while loading
            ) : (
              "Create Policy"
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
}
