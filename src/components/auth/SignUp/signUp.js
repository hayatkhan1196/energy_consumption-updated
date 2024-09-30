import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styles from "../SignUp/Signup.module.scss";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { Alert, Stack } from "@mui/material";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import backVideo from "../../../assets/images/bg01.mp4";
import VideoPlayer from "react-background-video-player";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Avatar from "@mui/material/Avatar";


const SignUp = () => {
  // const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const history = useHistory();
  // const [profileImage, setProfileImage] = useState("");

  const errors = {};
  const handleSubmit = (e) => {
    e.preventDefault();
  

    if (!password || password.length < 5 || password.length > 20) {
      errors.password =
        "Password is set btw 5 - 20 characters long. Please Re-Enter";
    }

    if (!phone) {
      errors.phone = "Phone is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors(null);
  };
  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    // setPhone(inputPhone);

    const phoneRegex = /^(\+92-|\+92|0)?\d{3}-?\d{7}$/;
    const formattedPhone = inputPhone.replace(
      /^(\+92-|\+92|0)?(\d{3})(\d{7})$/,
      "+92-$2-$3"
    );
    if (phoneRegex.test(inputPhone)) {
      setPhone(formattedPhone);
      setFormErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    } else {
      setPhone(inputPhone);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Invalid phone number",
      }));
    }
  };
  const handleCnicChange = (e) => {
    const inputCnic = e.target.value;

    const cnicRegex = /^(\d{5}-\d{7}-\d{1})?$/;
    const formattedCnic = inputCnic.replace(
      /(\d{5})(\d{7})(\d{1})/,
      "$1-$2-$3"
    );
    if (cnicRegex.test(inputCnic)) {
      setCnic(formattedCnic);
      setFormErrors((prevErrors) => ({ ...prevErrors, cnic: "" }));
    } else {
      setCnic(inputCnic);
      setFormErrors((prevErrors) => ({ ...prevErrors, cnic: "Invalid CNIC" }));
    }
  };

  const signUpHnadler = () => {
    const token = localStorage.getItem("CabinetToken");

    const signupData = {
      email: email,
      phoneNumber: phone,
      firstName: firstName,
      lastName: lastName,
      cnic: cnic,
      password: password,
      dateOfBirth: dateOfBirth,
      address: address,
    };

    axios({
      method: "POST",
      url: "http://192.168.0.24:9000/user/register",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: signupData,
    })
      .then(async (response) => {
        history.push("/");

      })
      .catch((error) => {
        console.log("This is error: ", error.response);
      });
  };

  return (
    <div className={`${styles.sectionSignUp}`}>
      <VideoPlayer
        className={styles.videoBackground}
        src={backVideo}
        autoPlay={true}
        muted={true}
      />

      <div
        style={{
          zIndex: 1,
          marginTop: "6rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Paper
          elevation={6}
          className={styles.paper}
          style={{
            backgroundColor: "#000435",
            boxShadow: "0 0px 18px rgba(221, 221, 62, 1)",
            borderRadius: "10px",
            width: "25rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <h2 className={styles.heading}>Sign Up</h2>
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            style={{ display: "none" }}
            id="upload-image"
          />

          <label htmlFor="upload-image">
            <Avatar
              alt="Profile Image"
              src={profileImage ? URL.createObjectURL(profileImage) : ""}
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto", // Center the profile image
                marginBottom: "20px", // Add margin to separate the profile image from the form
                cursor: "pointer", // Add pointer cursor to the profile image
              }}
            />
          </label> */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="First Name"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#fff" }, // set the label color to white
                  }}
                  // InputProps={{
                  //   classes: {
                  //     root: classes.root,
                  //   },
                  // }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Last Name"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  InputLabelProps={{
                    style: { color: "white" }, // set the label color to white
                  }}
                  InputProps={{
                    style: { color: "white" }, // set the input text color to white
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Email"
                  type="email"
                  sx={{ width: "100%" }}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={{
                    style: { color: "white" }, // set the label color to white
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                      }, // change the underline color
                    }, // set the input text color to white
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Password"
                  type="password"
                  sx={{ width: "100%" }}
                  error={!!formErrors?.password}
                  helperText={formErrors?.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{
                    style: { color: "white" }, // set the label color to white
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                      }, // change the underline color
                    }, // set the input text color to white
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Phone"
                  placeholder="+92-349-5200899"
                  required
                  error={!!formErrors?.phone}
                  helperText={formErrors?.phone}
                  value={phone}
                  onChange={handlePhoneChange}
                  InputLabelProps={{
                    style: { color: "white" }, // set the label color to white
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                      }, // change the underline color
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="CNIC"
                  placeholder="37456-1234932-7"
                  error={!!formErrors?.cnic}
                  helperText={formErrors?.cnic}
                  required
                  value={cnic}
                  onChange={handleCnicChange}
                  InputLabelProps={{
                    style: { color: "white" }, // set the label color to white
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                      },
                    },
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Age"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  InputLabelProps={{
                    style: { color: "white" }, // set the label color to white
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                      }, // change the underline color
                    },
                  }}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  InputLabelProps={{
                    style: { color: "white" }, // set the label color to white
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Date of Birth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "white",
                      }, // change the underline color
                    },
                    endAdornment: (
                      <CalendarTodayIcon
                        style={{ color: "white", cursor: "pointer" }}
                      />
                    ),
                    style: { color: "white" }, // set the input text color to white
                  }}
                  required
                />
              </Grid>
            </Grid>
            <input
              onClick={signUpHnadler}
              type="submit"
              value="SignUp"
              disabled={
                email.length > 2 &&
                password.length > 7 &&
                firstName.length > 4 &&
                lastName.length > 2
                  ? false
                  : true
              }
              className={
                firstName.length > 4 &&
                lastName.length > 2 &&
                email.length > 5 &&
                password.length > 7 &&
                !formErrors
                  ? "isActive"
                  : ""
              }
              style={{
                marginTop: "18px",
                backgroundColor: "#000435",
                boxShadow: "0 0px 18px rgba(221, 221, 62, 1)",
                borderRadius: "10px",
                color: "white",
                border: "none",
                padding: "10px",
                width: "100%", // set the width to 100%
              }}
            />
          </form>
          <div className={`${styles.signup}`}>
            <a
              style={{
                color: "#fff",
              }}>
              Already have an account?
            </a>
            <small
              style={{
                fontSize: "12px",
                paddingLeft: "5px",
              }}>
              <Link to="/">Login</Link>
            </small>
          </div>
        </Paper>
      </div>
      {/* {formValid && (
          <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
            <Alert severity="error" size="small">
              {formValid}
            </Alert>
          </Stack> */}
      {/* )} */}
    </div>
  );
};

export default SignUp;
