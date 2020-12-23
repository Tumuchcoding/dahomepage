import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useContext } from "react";
import { Arr } from "../Context/ArrContext";
import useFormAction from "./useFormAction";

export default function Todolists() {
  const { arr, updateOn } = useContext(Arr);
  const { lineOver, update, remove } = useFormAction();

  return (
    <ul>
      {arr.map((list) => (
        <li key={list.id}>
          <List style={{ cursor: "pointer" }}>
            <ListItem
              onClick={() => lineOver(list)}
              // className={list.lineThrough ? styles.crossedLine : null}
            >
              <ListItemText primary={list.text} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => update(list.id)}
                  disabled={updateOn}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => remove(list.id)}
                  disabled={updateOn}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          {/* <span
            style={{ cursor: "pointer" }}
            // className={list.lineThrough ? styles.crossedLine : null}
            onClick={() => lineOver(list)}
          >
            {list.text}
          </span>

          <div>
            <button onClick={() => update(list.id)} disabled={updateOn}>
              update
            </button>
            <button onClick={() => remove(list.id)} disabled={updateOn}>
              delete
            </button>
          </div> */}
        </li>
      ))}
    </ul>
  );
}
