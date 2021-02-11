import React, { useContext } from "react";
import { Arr } from "../Context/ArrContext";
import Todolists from "../Form/Todolists";
import FormInput from "../Form/FormInput";
import MyCalendar from "../Calendar/MyCalendar";
import ClockWatch from "../Clock/ClockWatch";
import Time from "../Clock/Time";
import Jokes from "../Jokes/Jokes";
// import Picture from "../Picture/Picture";
import Links from "../Shortcuts/Links";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Divider, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    padding: theme.spacing(5, 3, 0, 3),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("xl")]: {
      padding: theme.spacing(5, 30, 0, 30),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(0, 10),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 3),
    },
  },
  mainContainer: {
    flexDirection: "column",
    Width: "100%",
  },
  time: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "50px",
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
              sm={12}
              md={6}
              lg={4}
              className={classes.mainContainer}
            >
              <div className={classes.time}>
                <Time />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ClockWatch />
                  <div style={{ margin: "10px, 0" }}>
                    {new Date().toLocaleDateString("en")}
                  </div>
                </div>
              </div>
              <MyCalendar /> <Divider />
              <Hidden smDown>
                <div style={{ margin: "10px" }}>
                  <Jokes />
                </div>
              </Hidden>
              {/* <div className={classes.gridItem}>
                <Picture />
              </div> */}
            </Grid>
            <Grid
              item
              container
              sm={12}
              md={6}
              lg={4}
              className={classes.mainContainer}
            >
              <FormInput />
              <Todolists />
            </Grid>
            <Grid
              item
              container
              sm={12}
              md={6}
              lg={4}
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
