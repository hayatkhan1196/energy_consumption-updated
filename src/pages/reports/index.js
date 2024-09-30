// import React, { useState } from "react";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import { Paper } from "@material-ui/core";
// import Box from "@mui/material/Box";
// // import CustomNavLink from "../../components/navbar/customLink";

// import Button from "@mui/material/Button";
// import { Input } from "@mui/material";
// import DynamicTable from "../../components/policyTable/policyTable";
// // import PolicyForm from "../PolicyForm/policyForm";
// // import PolicyModalForm from "../../components/Modals/PolicyFormModal/PolicyForm";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { useHistory } from "react-router-dom";
// import DatePicker from "../../components/reportDateRange/reportDateRange";
// // import PolicyForm from "../../components/policyForm/policyForm";
// // import PolicyForm from "./../PolicyForm/policyForm";
// const jsonData = [
//   {
//     Index: 1,
//     name: "Policy 1",
//     StartDate: "2023-01-01",
//     EndDate: "2023-12-31",
//     StartTime: "09:00 AM",
//     EndTime: "05:00 PM",
//   },
//   {
//     Index: 2,
//     name: "Policy 2",
//     StartDate: "2023-02-01",
//     EndDate: "2023-11-30",
//     StartTime: "08:00 AM",
//     EndTime: "04:30 PM",
//   },
//   {

//     Index: 3,
//     name: "Policy 3",
//     StartDate: "2023-02-01",
//     EndDate: "2023-11-30",
//     StartTime: "08:00 AM",
//     EndTime: "04:30 PM",
//   },
//   {
//     Index: 4,
//     name: "Policy 4",
//     StartDate: "2023-02-01",
//     EndDate: "2023-11-30",
//     StartTime: "08:00 AM",
//     EndTime: "04:30 PM",
//   },
//   // Add more data as needed
// ];

// const Reports = () => {
//   const history = useHistory(); // Import useHistory from react-router-dom

//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredData = jsonData.filter((row) =>
//     row?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   console.log(
//     "🚀 ~ file: policyTable.js:22 ~ DynamicTable ~ row:",
//     filteredData
//   );
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: null,
//       key: "selection",
//     },
//   ]);
//   console.log(
//     "🚀 ~ file: ruleManagement.js:74 ~ RuleManagement ~ dateRange:",
//     dateRange
//   );

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handlePolicyForm = () => {
//     history.push("/formPolicy");
//   };

//   return (
//     <Container style={{ marginLeft: "8rem" }}>
//       <div
//         style={{
//           backgroundColor: "#000435",
//           // background:
//           //   "linear-gradient(135deg, rgba(0, 4, 53, 0.8) 0%, rgba(0, 4, 53, 0.8) 100%)",
//           position: "fixed",
//           height: "100vh",
//           width: "90%",
//         }}>
//         {/* <div> */}

//         {/* <Input
//           style={{
//             background: " #fff",
//             boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
//             marginLeft: "100px",
//             borderRadius: "5px",
//             width: "200px", // Set the width to 200 pixels
//             height: "40px",
//             marginTop: "13rem",
//           }}
//           inputProps={{
//             style: {
//               color: "white", // Input text color
//             },
//             placeholder: "Search by Policy Name",
//           }}
//           placeholder="Search by Policy Name"
//           variant="outlined"
//           value={searchQuery}
//           onChange={handleSearch}
//         /> */}
//         <DatePicker />
//         <div
//           style={{
//             background: "#000435",
//             boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
//             marginLeft: "100px",
//             borderRadius: "5px",
//             width: "200px", // Set the width to 200 pixels
//             height: "40px",
//             color: "#fff",
//             marginTop: "12.5rem",
//             display: "flex",
//             justifyContent: "center", // Center horizontally
//             alignItems: "center", // Center vertically
//           }}>
//           <h3>Reports</h3>
//         </div>

//         <div
//           style={{
//             backgroundColor: "#fff",
//             width: "88%",
//             marginLeft: "90px",
//           }}>
//           {" "}
//           <div variant="body1" component="div" style={{ marginTop: 50 }}>
//             <DynamicTable filteredData={filteredData} />
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Reports;
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Paper } from "@material-ui/core";
import Box from "@mui/material/Box";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/dist/rsuite.min.css";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import DynamicTable from "../../components/reportTable/reportTable";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useHistory } from "react-router-dom";
import DatePicker from "../../components/reportDateRange/reportDateRange";
import axios from "axios";

const jsonData = [
  {
    Index: 1,
    name: "Policy 1",
    StartDate: "2023-01-01",
    EndDate: "2023-12-31",
    StartTime: "09:00 AM",
    EndTime: "05:00 PM",
  },
  {
    Index: 2,
    name: "Policy 2",
    StartDate: "2023-02-01",
    EndDate: "2023-11-30",
    StartTime: "08:00 AM",
    EndTime: "04:30 PM",
  },
  {
    Index: 3,
    name: "Policy 3",
    StartDate: "2023-02-01",
    EndDate: "2023-11-30",
    StartTime: "08:00 AM",
    EndTime: "04:30 PM",
  },
  {
    Index: 4,
    name: "Policy 4",
    StartDate: "2023-02-01",
    EndDate: "2023-11-30",
    StartTime: "08:00 AM",
    EndTime: "04:30 PM",
  },
  // Add more data as needed
];

const Reports = () => {
  const history = useHistory(); // Import useHistory from react-router-dom

  const [searchQuery, setSearchQuery] = useState("");

  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");

  const [reportTableData, setReportTableData] = useState([]);
  const [tableDataLoading, setTableDataLoading] = useState(false);

  const filteredData = jsonData.filter((row) =>
    row?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePolicyForm = () => {
    history.push("/formPolicy");
  };

  const fetchReportData = () => {
    const Newtoken = localStorage.getItem("CabinetToken");

    axios({
      method: "POST",
      url: "http://192.168.0.24:9000/report/generateReport",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Newtoken}`,
      },
      data: {
        startDate: firstDate,
        endDate: lastDate,
      },
    })
      .then((response) => {
        let initialData = response.data.data.devices;
        console.log("data === ", initialData);
        setReportTableData(initialData);
        setTableDataLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownload = () => {
    // Replace the URL with your actual CSV download URL
    const csvDownloadUrl = `http://192.168.0.24:9000/report/downloadReport?startDate=${firstDate}&endDate=${lastDate}`;

    axios.get(csvDownloadUrl, { responseType: "blob" }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;
      a.download = "report.csv";
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  };

  const handleSelect = (range) => {
    if (!range || range.length < 2) {
      return;
    }

    const startDate = range[0];
    const endDate = range[1];

    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);

    const startYear = startDateObject.getFullYear();
    const startMonth = (startDateObject.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const startDay = startDateObject.getDate().toString().padStart(2, "0");

    const endYear = endDateObject.getFullYear();
    const endMonth = (endDateObject.getMonth() + 1).toString().padStart(2, "0");
    const endDay = endDateObject.getDate().toString().padStart(2, "0");

    const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
    const formattedendDate = `${endYear}-${endMonth}-${endDay}`;

    setFirstDate(formattedStartDate);
    setLastDate(formattedendDate);
  };

  return (
    <Container style={{ marginLeft: "8rem" }}>
      <div
        style={{
          backgroundColor: "#000435",
          position: "fixed",
          height: "100vh",
          width: "90%",
        }}>
        {/* <div> */}

        {/* <Input
          style={{
            background: " #fff",
            boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
            marginLeft: "100px",
            borderRadius: "5px",
            width: "200px", // Set the width to 200 pixels
            height: "40px",
            marginTop: "13rem",
          }}
          inputProps={{
            style: {
              color: "white", // Input text color
            },
            placeholder: "Search by Policy Name",
          }}
          placeholder="Search by Policy Name"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
        /> */}
        <DatePicker />
        <div className="row" style={{ display: "flex" }}>
          <div
            className="col-4"
            style={{
              background: "#000435",
              boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
              marginLeft: "100px",
              borderRadius: "5px",
              width: "220px", // Set the width to 200 pixels
              height: "40px",
              color: "#fff",
              marginTop: "12.5rem",
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
            }}>
            <DateRangePicker appearance="subtle" onChange={handleSelect} />
          </div>
          <div className="col-4">
            <Button
              onClick={fetchReportData}
              variant="contained"
              size="small"
              style={{
                marginLeft: "1%",
                marginTop: "12.6rem",
                padding: "8px",
                background:
                  " linear-gradient(135deg, rgba(0, 4, 53, 0.8) 0%, rgba(0, 4, 53, 0.8) 100%)",
                boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
              }}>
              Generate Report
            </Button>
          </div>
          <div className="col-4">
            {tableDataLoading && (
              <Button
                onClick={handleDownload}
                variant="contained"
                size="small"
                style={{
                  marginLeft: "60%",
                  marginTop: "12.6rem",
                  padding: "8px",
                  background:
                    " linear-gradient(135deg, rgba(0, 4, 53, 0.8) 0%, rgba(0, 4, 53, 0.8) 100%)",
                  boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
                }}>
                Download Report
              </Button>
            )}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            width: "88%",
            marginLeft: "90px",
          }}>
          {" "}
          <div variant="body1" component="div" style={{ marginTop: 50 }}>
            {tableDataLoading && (
              <DynamicTable filteredData={reportTableData} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Reports;
