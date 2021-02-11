import React, { useEffect, useState, useContext } from "react";
import { db } from "../Firebase/firebase";
import { Arr } from "../Context/ArrContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}
const filter = createFilterOptions<FilmOptionType>();

type Props = {
  folderlink: (url: string) => void;
  setFolderArr: React.Dispatch<React.SetStateAction<{}[]>>;
};

export function FolderSelect({ folderlink, setFolderArr }: Props) {
  const [folderID, setFolderID] = useState<any[]>([]);
  const [value, setValue] = useState<FilmOptionType | null | any>({
    title: "default",
  });
  const { user } = useContext(Arr);

  useEffect(() => {
    return db
      .collection(`channels/${user?.uid}/folder`)
      .onSnapshot((snapshot) => {
        const docs: any[] = [];
        snapshot.forEach((doc) => {
          docs.push(doc.id);
        });
        setFolderID(docs);
      });
  }, [user?.uid]);

  useEffect(() => {
    db.collection(`channels/${user?.uid}/renderlist`).doc(value?.title).set({});
    return folderlink(value?.title);
  }, [folderlink, setFolderArr, user?.uid, value]);

  let newArr: {}[] = [];
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
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select or Create new folder"
          variant="standard"
        />
      )}
    />
  );
}
