import React, { useContext } from "react";
import { Arr } from "../Context/ArrContext";
import Todolists from "../Form/Todolists";
import FormInput from "../Form/FormInput";
import MyCalendar from "../Calendar/MyCalendar";
import ClockWatch from "../Clock/ClockWatch";
import Time from "../Clock/Time";
import Jokes from "../Jokes/Jokes";
import Picture from "../Picture/Picture";
import Links from "../Shortcuts/Links";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Divider, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0, 15),
  },
  mainContainer: {
    flexDirection: "column",
    minHeight: "90vh",
  },
  gridItem: {
    padding: theme.spacing(2),
    margin: "10px",
  },
  clock: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: theme.spacing(0, 2, 2, 2),
    margin: "0 10px 10px 10px",
  },
}));

export default function Main() {
  const { isLoading } = useContext(Arr);
  const classes = useStyles();

  return (
    <>
      {isLoading ? (
        <>
          <h1>"it is uploading"</h1>
        </>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={5}>
            <Grid
              item
              container
              xs={false}
              sm={4}
              className={classes.mainContainer}
            >
              <div className={classes.clock}>
                <Time />
                <ClockWatch />
              </div>
              <Divider />
              <div className={classes.gridItem}>
                <MyCalendar />{" "}
              </div>

              <Divider />

              <Jokes />
              <Divider />

              <Paper className={classes.gridItem}>
                <Picture />
              </Paper>
            </Grid>
            <Grid
              item
              container
              xs={false}
              sm={4}
              className={classes.mainContainer}
            >
              <FormInput />
              <Todolists />
            </Grid>
            <Grid
              item
              container
              xs={false}
              sm={4}
              className={classes.mainContainer}
            >
              <Links />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
