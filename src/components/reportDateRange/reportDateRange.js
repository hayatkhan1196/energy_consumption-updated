import React, { useState } from "react";

const DatePicker = () => {
  const [size, setSize] = useState("default");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const shortcuts = [
    {
      text: "Last week",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        return [start, end];
      },
    },
    {
      text: "Last month",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end];
      },
    },
    {
      text: "Last 3 months",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end];
      },
    },
  ];

  return (
    <div
      className="demo-date-picker"
      style={{ marginLeft: "200px", marginTop: "100" }}>
      <div className="block">
        <input
          type="daterange"
          value={value1}
          placeholder="Start date to End date"
          onChange={(e) => setValue1(e.target.value)}
          size={size}
        />
      </div>
    </div>
  );
};

export default DatePicker;
