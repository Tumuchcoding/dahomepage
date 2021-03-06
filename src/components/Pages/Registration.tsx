import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link2 from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Registration() {
  const classes = useStyles();
  const [regInput, setRegInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const [error, setError] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegInput({ ...regInput, [e.target.id]: e.target.value });
  };
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let gotError;
    try {
      await auth.createUserWithEmailAndPassword(
        regInput.email,
        regInput.password
      );
    } catch (error) {
      setError(error.message);
      if (error) gotError = error;
    }
    if (!gotError) history.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Your Name"
                autoFocus
                value={regInput.name}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={regInput.email}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={regInput.password}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox required value="allowExtraEmails" color="primary" />
                }
                label={`By signing up, you agreed to our Terms.`}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#31cace", color: "white" }}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/login"
              >
                Already have an account? Sign in{" "}
              </Link>
            </Grid>
          </Grid>
        </form>
        {error}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Registration;
