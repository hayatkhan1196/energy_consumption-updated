import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./statisticalDateRange.mdule.scss";

const MyComponent = () => {
  const [size, setSize] = useState("default");
  const [value1, setValue1] = useState([null, null]);
  const [value2, setValue2] = useState([null, null]);

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
    <div>
      {/* <RadioGroup
        value={size}
        onChange={(e) => setSize(e.target.value)}
        aria-label="size control"
        row>
        <FormControlLabel value="large" control={<Radio />} label="large" />
        <FormControlLabel value="default" control={<Radio />} label="default" />
        <FormControlLabel value="small" control={<Radio />} label="small" />
      </RadioGroup> */}
      <div className={styles.demoDatePicker}>
        {/* <div className={styles.block}>
          <span className={styles.demonstration}>Default</span>
          <DatePicker
            selectsRange
            startDate={value1[0]}
            endDate={value1[1]}
            onChange={(update) => setValue1(update)}
            isClearable
            placeholderText="Start date - End date"
            dateFormat="MMMM d, yyyy"
            className={`${styles.datePicker} ${styles[size]}`}
          />
        </div> */}
        <div className={styles.block}>
          {/* <span className={styles.demonstration}>With quick options</span> */}
          <DatePicker
            selectsRange
            startDate={value2[0]}
            endDate={value2[1]}
            onChange={(update) => setValue2(update)}
            isClearable
            placeholderText="Start date - End date"
            dateFormat="MMMM d, yyyy"
            className={`${styles.datePicker} ${styles[size]}`}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div>
                <button onClick={decreaseMonth}>&lt;</button>
                <span>{date.toLocaleDateString()}</span>
                <button onClick={increaseMonth}>&gt;</button>
              </div>
            )}
          />
          <div>
            {shortcuts.map((shortcut, index) => (
              <button key={index} onClick={() => setValue2(shortcut.value())}>
                {shortcut.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
