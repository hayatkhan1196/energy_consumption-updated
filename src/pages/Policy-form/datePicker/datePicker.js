import React, { useState } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import "./style.css";

const moment = extendMoment(originalMoment);

const DatePicker = () => {
  const today = moment();

  const [calendar, setCalendar] = useState({
    dates: null,
    value: moment.range(
      today.clone().startOf("week"),
      today.clone().endOf("week")
    ),
    states: "",
    initialYear: new Date().getFullYear(),
    initialMonths: new Date().getMonth(),
    minimumDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
    maximumDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
    start: moment
      .range(today.clone().startOf("week"), today.clone().endOf("week"))
      .start.format("YYYY-MM-DD"),
    end: moment
      .range(today.clone().startOf("week"), today.clone().endOf("week"))
      .end.format("YYYY-MM-DD"),
    showNewMonth: false,
  });

  const stateDefinitions = {
    available: {
      // selectable: false,
      color: null,
      label: "Available",
    },
    enquire: {
      color: "#ffd200",
      label: "Enquire",
    },
    unavailable: {
      // selectable: false,
      color: "#ff80ff",
      label: "Unavailable",
    },
  };

  const dateRangePickerSelect = (range, states, dates, start, end, value) => {
    let obj = {
      start: moment(range.start.format()).startOf("week"),
      end: moment(range.end.format()).endOf("week"),
    };
    obj = moment.range(obj.start.format(), obj.end.format());

    setCalendar({
      ...calendar,
      value: obj,
      states: states,
      start: obj.start.format("YYYY-MM-DD"),
      end: obj.end.format("YYYY-MM-DD"),
      showNewMonth: false,
    });
  };
  const displaySelectedDates = () => {
    return (
      <div>
        <div className="d-inline-block text-bold color-blue">
          <p>
            <input
              style={{
                width: "200px",
                backgroundColor: "#000435",
                color: "#fff",
              }}
              value={`${calendar.start} - ${calendar.end}`}
              readOnly
              onClick={() => setCalendar({ ...calendar, showNewMonth: true })}
            />{" "}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>{displaySelectedDates()}</div>
      {calendar.showNewMonth && (
        <DateRangePicker
          selectionType="range"
          singleDateRange
          initialFromValue
          stateDefinitions={stateDefinitions}
          // dateStates={[]}
          defaultState="available"
          value={calendar.value}
          onSelect={dateRangePickerSelect}
          numberOfCalendars={2}
          initialMonth={calendar.initialMonths}
          initialYear={calendar.initialYear}
          minimumDate={calendar.minimumDate}
          maximumDate={calendar.maximumDate}
        />
      )}
    </div>
  );
};

export default DatePicker;
