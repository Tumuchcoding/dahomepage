import React, { useEffect, useState, useContext } from "react";
import { db } from "../Firebase/firebase";
import { Arr } from "../Context/ArrContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

export function FolderSelect({ folderlink, setFolderArr }) {
  const [folderID, setFolderID] = useState([]);
  const [value, setValue] = useState({
    title: "default",
  });
  const { user } = useContext(Arr);

  useEffect(() => {
    return db
      .collection(`channels/${user?.uid}/folder`)
      .onSnapshot((snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push(doc.id);
        });
        setFolderID(docs);
      });
  }, [user?.uid]);

  useEffect(() => {
    if (value !== "")
      db.collection(`channels/${user?.uid}/renderlist`)
        .doc(value?.title)
        .set({});
    return folderlink(value?.title);
  }, [folderlink, setFolderArr, user?.uid, value]);

  let newArr = [];
  folderID.map((array) => newArr.push({ title: array }));

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `Create "${params.inputValue}" folder`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={newArr}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }

        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(option) => {
        return option.title;
      }}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Free solo with text demo"
          variant="outlined"
        />
      )}
    />
  );
}
