import React, { useState } from "react";
import { auth } from "../Firebase/firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link2 from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link2 color="inherit" href="https://dahomepage.com/">
        DahomePage
      </Link2>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#31cace",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function PasswordReset() {
  const classes = useStyles();
  const [logInput, setLogInput] = useState({
    email: "",
  });
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogInput({ ...logInput, [e.target.id]: e.target.value });
  };
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.sendPasswordResetEmail(logInput.email);
    } catch (error) {
      setError(error.message);
    }
    setOpen(true);
    setLogInput({ email: "" });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Remember Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={logInput.email}
            onChange={handleOnChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#31cace", color: "white" }}
            className={classes.submit}
          >
            Send Email
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login"
              >
                Back to login{" "}
              </Link>
            </Grid>
          </Grid>
        </form>
        {error}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Email has been sent!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default PasswordReset;
