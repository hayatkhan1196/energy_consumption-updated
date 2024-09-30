import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ApexChart from "./../../components/statisticsLightGraph/statisticsLightGraph";
import { useLocation } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import DateRangePicker from "rsuite/DateRangePicker";
import styles from "./StatisticalAnalysisFullWidth.module.scss";

const StatisticalAnalysisFullWidth = () => {
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const location = useLocation();
  const { options, series } = location.state || {};

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
          overflowX: "auto",
        }}>
        <Box
          sx={{
            // display: "flex",
            // flexWrap: "wrap",
            // justifyContent: "space-evenly",
            backgroundColor: "#000435",
            marginTop: "10rem",
            padding: "1rem",
          }}>
          <div
            style={{
              background: "#000435",
              boxShadow: "0 0px 24px rgba(221, 221, 62, 1)",
              marginLeft: "50rem",
              borderRadius: "5px",
              width: "220px",
              height: "40px",
              color: "#fff",
              display: "flex",
              alignItems: "center",
            }}>
            <DateRangePicker appearance="subtle" onChange={handleSelect} />
            <div className={styles.timeSelector}>
              <button className={`${styles.btn} ${styles.dayBtn}`}>
                <span>Day</span>
              </button>
              <button className={`${styles.btn} ${styles.monthBtn}`}>
                <span>Month</span>
              </button>
            </div>
          </div>{" "}
          {/* First Chart */}
          <Card
            sx={{
              backgroundColor: "#000450",
              height: "50%",
              marginLeft: "4rem",
              marginTop: "10px",
              // width: "100%",
            }}>
            <CardContent style={{ width: 1000, marginLeft: "4rem" }}>
              <ReactApexChart options={options} series={series} />
            </CardContent>
          </Card>
        </Box>
      </div>
    </Container>
  );
};

export default StatisticalAnalysisFullWidth;
