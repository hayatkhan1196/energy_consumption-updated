import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useHistory } from "react-router-dom";

const ApexChart = () => {
  const history = useHistory();

  const data = [0, 20, 40, 60, 80, 100];
  const [series] = useState([
    {
      name: "Lights",
      data: data,
    },
  ]);
  const [options] = useState({
    chart: {
      height: 300,
      type: "line",
      zoom: {
        enabled: false,
      },
      background: "#000450",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      colors: "#FFFFFF",
    },
    title: {
      text: "Lighting(%)",
      align: "left",
      style: {
        color: "#FFFFFF",
      },
    },
    xaxis: {
      categories: [
        4 - 21,
        4 - 23,
        4 - 25,
        4 - 27,
        4 - 29,
        5 - 1,
        5 - 3,
        5 - 5,
        5 - 7,
        5 - 9,
        5 - 11,
        5 - 13,
        5 - 15,
        5 - 17,
        5 - 19,
        5 - 20,
      ],
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
      axisBorder: {
        color: "#FFFFFF",
      },
      axisTicks: {
        color: "#FFFFFF",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
      axisBorder: {
        color: "#FFFFFF",
      },
      axisTicks: {
        color: "#FFFFFF",
      },
    },
    grid: {
      borderColor: "#FFFFFF",
    },
  });

  const redirectToNextPage = () => {
    history.push({
      pathname: "/StatisticalAnalysisFullWidth",
      state: { options, series },
    });
  };

  return (
    <div>
      <div>
        <button
          onClick={redirectToNextPage}
          style={{
            // position: "absolute",
            // top: "10px",
            marginLeft: "260px",

            background: "none",
            border: "none",
            cursor: "pointer",
          }}>
          <span
            style={{
              color: "#fff",
              // float: "right",
            }}>
            <ZoomOutMapIcon />
          </span>
        </button>
      </div>
      <div>
        {" "}
        <ReactApexChart options={options} series={series} type="line" />
      </div>
    </div>
  );
};

export default ApexChart;
