import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Arr } from "../Context/ArrContext";
import { auth } from "../Firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2, 15),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2, 3),
    },
  },
  links: {
    textDecoration: "none",
  },
  logo: {
    fontSize: "28px",
    color: "#31CACE",
  },
  da: {
    fontFamily: "Yellowtail",
    color: "#000000",
  },
}));

function Header() {
  const { user } = useContext(Arr);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null
  );

  function handleClick(e: React.MouseEvent) {
    if (anchorEl === null) setAnchorEl(() => e.currentTarget);
  }
  const handleLogout = () => {
    setAnchorEl(null);
    auth.signOut();
  };
  function handleClose() {
    setAnchorEl(null);
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavLink className={classes.links} exact to="/">
        <div className={classes.logo}>
          <span className={classes.da}>Da</span>HomePage
        </div>
      </NavLink>
      {user ? (
        <div>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="Menu"
            onClick={handleClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <NavLink className={classes.links} exact to="/login">
            <Button color="inherit">Login</Button>
          </NavLink>
          <Hidden smDown>
            <NavLink className={classes.links} exact to="/register">
              <Button color="inherit">Register</Button>
            </NavLink>
          </Hidden>
        </div>
      )}
    </div>
  );
}

export default Header;
