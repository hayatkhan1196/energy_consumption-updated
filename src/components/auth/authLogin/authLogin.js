import React, { useState } from "react";
// import Loader from "../../Loader/Loader";
import styles from "../authLogin/authLogin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import loginImage from "../../../assets/images/login-track.png";
import Paper from "@mui/material/Paper";
import axios from "axios";
import LoginIcon from "@mui/icons-material/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { currentNavTab } from "../../../Redux/reducers/NavTab";
import { login } from "../../../Redux/reducers/Login";
import { Link, useHistory } from "react-router-dom";
import backVideo from "../../../assets/images/bg01.mp4";
import VideoPlayer from "react-background-video-player";
import CircularProgress from "@mui/material/CircularProgress";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState();
  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  // const [receivedData, setReceivedData] = useState(true);
  const successData = true;
  const [passwordError, setPasswordError] = useState(false);
  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const responseData = useSelector((state) => state.auth.providedData);
  const success = useSelector((state) => state.auth.providedData);
  // Handles Display and Hide Password
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }
  };
  const data = {
    email: emailInput,
    password: passwordInput,
  };

  // const handleSubmit = (event) => {
  //   setIsLoading(true);

  //   event.preventDefault();
  //   axios({
  //     method: "POST",
  //     url: `http://192.168.0.24:9000/user/login`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     data: {
  //       email: emailInput,
  //       password: passwordInput,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         localStorage.setItem("CabinetToken", response.data.data.token);
  //         localStorage.setItem("CabinetName", response.data.data.firstName);
  //         localStorage.setItem("CabinetUserId", response.data.data.userId);
  //         // dispatch(currentNavTab(2));
  //         history.push("/live-tracking");

  //       }
  //     })
  //     .catch((error) => {
  //       console.log("This is error: ", error.response);
  //       toast(`${error.response?.data.message}`);
  //     });
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    axios({
      method: "POST",
      url: `http://192.168.0.24:9000/user/login`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        email: emailInput,
        password: passwordInput,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Save data to localStorage or perform other actions upon successful login
          localStorage.setItem("CabinetToken", response.data.data.token);
          localStorage.setItem("CabinetName", response.data.data.firstName);
          localStorage.setItem("CabinetUserId", response.data.data.userId);
          // Redirect to the desired page upon successful login
          history.push("/live-tracking");
        }
      })
      .catch((error) => {
        // Display error message using toast or other UI components
        toast(`${error.response?.data.message}`);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  // Proceed to use the information passed
  // console.log("Email : " + emailInput);
  // console.log("Password : " + passwordInput);
  // console.log("Remember : " + rememberMe);

  return (
    <div className={`${styles.section}`}>
      <ToastContainer />
      <VideoPlayer
        className={styles.videoBackground}
        src={backVideo}
        autoPlay={true}
        muted={true}
      />

      <Paper
        elevation={6}
        className={styles.paper}
        style={{
          background: "#000435",
          boxShadow: "0 0px 18px rgba(221, 221, 62, 1)",
          borderRadius: "10px",
        }}>
        <h2 className={styles.heading}>Login</h2>

        <br />
        <form>
          {/* onSubmit={handleSubmit}> */}
          <div style={{ marginTop: "5px" }}>
            <TextField
              label="Email Address"
              fullWidth
              error={emailError}
              id="standard-basic"
              variant="standard"
              sx={{ width: "100%" }}
              value={emailInput}
              size="small"
              onBlur={handleEmail}
              onChange={(event) => {
                setEmailInput(event.target.value);
              }}
              InputProps={{
                style: { color: "#fff" }, // Change '#your-desired-color' to your desired text color
              }}
              InputLabelProps={{
                style: { color: "#fff" }, // Change 'red' to your desired label color
              }}
            />
          </div>
          <div style={{ marginTop: "5px" }}>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel
                style={{ color: "#fff" }}
                error={passwordError}
                htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                error={passwordError}
                onBlur={handlePassword}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  setPasswordInput(event.target.value);
                }}
                value={passwordInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? (
                        <VisibilityOff style={{ color: "#fff" }} />
                      ) : (
                        <Visibility style={{ color: "#fff" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{
                  style: { color: "#fff" }, // Change '#your-desired-color' to your desired text color
                }}
              />
            </FormControl>
          </div>
          <div style={{ fontSize: "10px", color: "#fff" }}>
            <Checkbox
              style={{ color: "#fff" }}
              {...label}
              size="small"
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            Remember Me
          </div>

          <div style={{ marginTop: "10px" }}>
            {/* <Button
              sx={{
                backgroundColor: "#000435",
                boxShadow: "0 0px 18px rgba(221, 221, 62, 1)",
              }}
              // variant="contained"

              fullWidth
              disabled={isLoading}
              type="submit"
              startIcon={<LoginIcon style={{ color: "#fff" }} />}
              onClick={handleSubmit}>
              <span style={{ color: "#fff" }}>LOGIN</span>
            </Button> */}
            <Button
              sx={{
                backgroundColor: "#000435",
                boxShadow: "0 0px 18px rgba(221, 221, 62, 1)",
              }}
              fullWidth
              type="submit"
              startIcon={<LoginIcon style={{ color: "#fff" }} />}
              onClick={handleSubmit}
              disabled={isLoading} // Disable the button when isLoading is true
            >
              {/* Show loader if isLoading is true, otherwise show "LOGIN" text */}
              {isLoading ? (
                <CircularProgress size={24} style={{ color: "#fff" }} />
              ) : (
                <span style={{ color: "#fff" }}>LOGIN</span>
              )}
            </Button>
          </div>
        </form>
        {/* Show Form Error if any */}
        {formValid && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="error" size="small">
              {formValid}
            </Alert>
          </Stack>
        )}

        {/* Show Success if no issues */}
        {/* {success && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="success" size="small">
              {success}
            </Alert>
          </Stack>
        )} */}

        <div style={{ marginTop: "7px", fontSize: "10px" }}>
          {/* <Link to="/resetpasswordform">Forgot Password</Link> */}
          <Link to="#">Forgot Password</Link>
          <br />
          <a style={{ color: "#fff" }}>Don,t have an account?</a>
          <small
            style={{
              fontSize: "12px",
              paddingLeft: "5px",
            }}>
            <Link to="/SignUp">Sign Up</Link>
            {/* <Link to="#">Sign Up</Link> */}
          </small>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
