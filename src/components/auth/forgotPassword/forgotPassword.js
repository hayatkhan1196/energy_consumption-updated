import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import ResetImage from "../../../assets/images/forgot-password.png";
import styles from "./forgot.module.scss";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../Redux/actions/forgotPassword/forgotpassword";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
    toast.success("sent email Successfully");
    setEmail("");
  };
  // Handle reset password logic

  return (
    <section className={`container ${styles.auth}`}>
      <ToastContainer />
      <div className={styles.img}>
        <img src={ResetImage} alt="reset password" width="400px" />
      </div>
      <Paper elevation={6} className={styles.paper}>
        <div className={styles.form}>
          <span className={`${styles.heading}`}>Reset Password</span>
          <form onSubmit={resetPasswordHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="input"
                  sx={{ width: "23rem" }}
                  id="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={styles.btn}
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: " #e93380" }}>
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>

          <span className={styles.reset}>
            <p>
              <Link to="/login">login</Link>
            </p>
          </span>
        </div>
      </Paper>
    </section>
  );
};

export default ResetPasswordForm;
