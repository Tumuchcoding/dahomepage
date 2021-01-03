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
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

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

function Login() {
  const classes = useStyles();
  const [logInput, setLogInput] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogInput({ ...logInput, [e.target.id]: e.target.value });
  };
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let gotError;
    try {
      await auth.signInWithEmailAndPassword(logInput.email, logInput.password);
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
          Login
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={logInput.password}
            onChange={handleOnChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link2 href="#" variant="body2">
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to="/passwordreset"
                >
                  Forgot password?
                </Link>
              </Link2>
            </Grid>
            <Grid item>
              <Link2 href="#" variant="body2">
                <Link
                  to="/register"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {"Don't have an account? Sign Up"}{" "}
                </Link>
              </Link2>
            </Grid>
          </Grid>
        </form>
        {error}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
