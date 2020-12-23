import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Arr } from "../Context/ArrContext";
import { auth } from "../Firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    color: "white",
    textDecoration: "none",
  },
}));

function Header() {
  const history = useHistory();
  const { user } = useContext(Arr);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null
  );

  function handleClick(e: React.MouseEvent) {
    if (anchorEl === null) setAnchorEl(() => e.currentTarget);
  }
  const handleLogout = () => {
    auth.signOut();
    history.push("/");
  };
  function handleClose() {
    setAnchorEl(null);
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink className={classes.links} exact to="/">
              DaHomePage
            </NavLink>
          </Typography>
          {user ? (
            <>
              <IconButton
                edge="end"
                // className={classes.menuButton}
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
            </>
          ) : (
            <>
              <NavLink className={classes.links} exact to="/login">
                <Button color="inherit">Login</Button>
              </NavLink>

              <NavLink className={classes.links} exact to="/register">
                <Button color="inherit">Register</Button>
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
