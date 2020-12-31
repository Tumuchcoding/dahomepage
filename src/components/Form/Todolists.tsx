import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useContext } from "react";
import { Arr } from "../Context/ArrContext";
import useFormAction from "./useFormAction";

export default function Todolists() {
  const { arr, updateOn } = useContext(Arr);
  const { lineOver, update, remove } = useFormAction();

  const useStyles = makeStyles((theme) => ({
    root: {
      "&:hover": {
        color: "red",
      },
    },
    iconHover: {
      "&:hover > div:hover": {
        opacity: 1,
      },
    },
    icons: {
      opacity: ".1",
    },
  }));
  const classes = useStyles();
  return (
    <>
      {arr?.map((list) => (
        <div
          key={list.id}
          style={
            list.lineThrough
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          <div className={classes.root}>
            <List style={{ cursor: "pointer" }}>
              <ListItem onClick={() => lineOver(list)}>
                <ListItemText
                  primary={list.text}
                  style={{ fontFamily: "Lato" }}
                />
                <ListItemSecondaryAction className={classes.iconHover}>
                  <div className={classes.icons}>
                    {" "}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => update(list.id)}
                      disabled={updateOn}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => remove(list.id)}
                      disabled={updateOn}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Divider />
          </div>
        </div>
      ))}
    </>
  );
}
