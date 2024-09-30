import React, { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const SearchField = () => {
  const textFieldRef = useRef(null);
  useEffect(() => {
    // Focus the TextField when the component mounts
    textFieldRef.current.focus();
  }, []);
  const inputProps = {
    style: { color: "white" }, // Placeholder text color
  };

  const inputLabelProps = {
    style: { color: "white" }, // Label text color (optional)
  };
  const searchIconStyle = {
    color: "white", // Search icon color
  };
  const textFieldStyle = {
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "blue", // Change this to the desired hover border color
    },
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: " #000435",
        margin: "2px",
        border: "#000435",
      }}>
      <SearchIcon style={searchIconStyle} />
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search item"
        // fullWidth
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        sx={textFieldStyle}
        inputRef={textFieldRef}
        // Add other props or event handlers as needed
      />
    </div>
  );
};

export default SearchField;
