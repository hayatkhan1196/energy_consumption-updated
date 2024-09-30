import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Checkbox,
  Switch,
} from "@mui/material";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const EditPolicyModal = ({ isOpen, data, onClose, onSave }) => {
  const liveLatestData = useSelector(
    (state) => state?.getLiveLatestEnergyData?.data
  );
  const [devices, setDevices] = useState(liveLatestData);
  const [policyName, setPolicyName] = useState("");
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startData, setStartDeviceData] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [endData, setEndDeviceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && data) {
      setPolicyName(data?.policyName || "");
      setStartDates(data?.startDates || []);
      setEndDates(data?.endDates || []);
      setStartTime(data?.startTime || "");
      setEndTime(data?.endTime || "");
    }
  }, [isOpen, data]);
  const editedData = {
    policyName,
    startDates,
    endDates,
    startTime,
    endTime,
    activeStatus: true,
    startData,
    endData,
  };

  function findInArray(arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var el = arr[i];
      if (el.deviceId == id) return i;
    }
    return -1;
  }
  const handleCheckboxClick = (deviceId, deviceState, e) => {
    const startDeviceArray = [...startData];
    const StartIndex = findInArray(startDeviceArray, deviceId);

    if (StartIndex == -1 && e.target.checked) {
      const startdeviceObject = {
        deviceId: deviceId,
        deviceState: deviceState == true ? 1 : 0,
      };

      startDeviceArray.push(startdeviceObject);

      setStartDeviceData(startDeviceArray);
    }
    if (StartIndex !== -1 && e.target.checked == false) {
      startDeviceArray.splice(StartIndex, 1);

      setStartDeviceData(startDeviceArray);
    }

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

  const handleToggle = (deviceId, e) => {
    setStartDeviceData((prevDevices) =>
      prevDevices.map((device) => {
        return device.deviceId === deviceId
          ? { ...device, deviceState: e.target.checked ? 1 : 0 }
          : device;
      })
    );
  };

  const [selectedEndDateDevices, setSelectedEndDateDevices] = useState([]);

  const [devicesEndDateData, setEndDateDataDevices] = useState(liveLatestData);
  // end Date  data function
  function findInEndArray(arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var el = arr[i];
      if (el.deviceId == id) return i;
    }
    return -1;
  }
  const handleEndDateCheckboxClick = (deviceId, deviceState, e) => {
    const endDeviceArray = [...endData];
    const StartIndex = findInEndArray(endDeviceArray, deviceId);

    if (StartIndex == -1 && e.target.checked) {
      const endDeviceObject = {
        deviceId: deviceId,
        deviceState: deviceState == true ? 1 : 0,
      };
      endDeviceArray.push(endDeviceObject);
      setEndDeviceData(endDeviceArray);
    }
    if (StartIndex !== -1 && e.target.checked == false) {
      endDeviceArray.splice(StartIndex, 1);

      setEndDeviceData(endDeviceArray);
    }
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

  //  End Date data

  const handleEndDateToggle = (deviceId, e) => {
    setEndDeviceData((prevDevices) =>
      prevDevices.map((device) => {
        return device.deviceId === deviceId
          ? { ...device, deviceState: e.target.checked ? 1 : 0 }
          : device;
      })
    );
  };

  const handlePolicyEdit = () => {
    setIsLoading(true);
    const token = localStorage.getItem("CabinetToken");

    axios({
      method: "PUT",
      url: `http://192.168.0.24:9000/policy/${data._id}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: editedData,
    })
      .then((response) => {
        toast(`${response.data.message}`);

        setTimeout(() => {
          setIsLoading(false);
          onClose();
          // Additional logic after successful API call
        }, 1000);
      })
      .catch((error) => {
        toast(`${error.response.data.message}`);
      });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        backgroundColor: "#000435",
        boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
        borderRadius: "8px",
        zIndex: 1000,
        marginTop: "20px",
        height: "80vh",
        overflowY: "auto",
        display: isOpen ? "block" : "none",
        width: "600px",
      }}>
      <h2 style={{ marginBottom: "20px", color: "#fff" }}>Edit Policy</h2>

      {/* Input fields for editing */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px", color: "#fff" }}>
          Policy Name:
        </label>
        <input
          type="text"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "10PX",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px", color: "#fff" }}>
          Start Dates:
        </label>
        <input
          type="text"
          value={startDates.join(", ")}
          onChange={(e) => setStartDates(e.target.value.split(", "))}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "10PX",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px", color: "#fff" }}>
          Start Time:
        </label>
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "10PX",
          }}
        />
      </div>

      <TableContainer
        component={Paper}
        style={{
          marginBottom: "20px",
          overflowY: "auto",
          // height: "15rem"
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
          <TableBody>
            {devices &&
              devices?.map((device) => (
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

      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px", color: "#fff" }}>
          End Dates:
        </label>
        <input
          type="text"
          value={endDates.join(", ")}
          onChange={(e) => setEndDates(e.target.value.split(", "))}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "10PX",
          }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px", color: "#fff" }}>
          End Time:
        </label>
        <input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "10PX",
          }}
        />
      </div>
      <TableContainer
        component={Paper}
        style={{
          marginBottom: "20px",
          overflowY: "auto",
          // height: "15rem"
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
          <TableBody>
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
                      onChange={(e) => handleEndDateToggle(device?.deviceId, e)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button
        onClick={handlePolicyEdit}
        style={{
          backgroundColor: "#000435",
          boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} spin /> // Show a spinning icon while loading
        ) : (
          "Save"
        )}
      </button>
      <button
        onClick={onClose}
        style={{
          backgroundColor: "#000435",
          boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          marginLeft: "10px",
          cursor: "pointer",
        }}>
        Close
      </button>
    </div>
  );
};

export default EditPolicyModal;
