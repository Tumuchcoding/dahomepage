import React, { useEffect, useState, useContext } from "react";
import { db } from "../Firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FolderSelect } from "./FolderSelect";
import { Arr } from "../Context/ArrContext";
import { TextField } from "@material-ui/core";

type Props = {
  folderArr: any[];
  setFolderArr: React.Dispatch<React.SetStateAction<{}[]>>;
};

export default function FormModel({ folderArr, setFolderArr }: Props) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState("");
  const [folder, setFolder] = useState("");
  const { user } = useContext(Arr);
  const [data, setData] = useState([]);

  useEffect(() => {
    const copyDataArr = () => {
      const filterFolder = folderArr.filter(
        (foldername) => foldername?.folder === folder
      );
      const dataExist = filterFolder[0]?.url;

      if (dataExist) return dataExist;
      else return [];
    };
    const folderRef = copyDataArr();
    setData(folderRef);

    return copyDataArr();
  }, [folderArr, folder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validURL(input);
    if (valid) {
      const hostname = domain(input);
      db.collection(`channels/${user?.uid}/folder`)
        .doc(folder)
        .set({
          url: [
            ...data,
            {
              logo: `https://www.google.com/s2/favicons?domain=${hostname}`,
              hostname: hostname,
              url: input,
              id: uuidv4(),
            },
          ],
        });
    }
    setInput("");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const folderlink = (url: string) => {
    setFolder(url);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ width: "100%" }}
      >
        Create new Bookmark
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new bookmark</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Paste your url and select a folder
          </DialogContentText>
          <form>
            <div>
              <TextField
                id="outlined-basic"
                label="Your Url"
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                inputRef={(input) => input && input.focus()}
                style={{
                  width: "100%",
                  background: "white",
                  marginBottom: "30px",
                }}
                autoComplete="off"
              />
              <FolderSelect
                folderlink={folderlink}
                setFolderArr={setFolderArr}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function domain(url: string) {
  const a = document.createElement("a");
  a.href = url;
  return a.hostname;
}

function validURL(url: string) {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(url)) {
    return true;
  } else {
    return false;
  }
}
