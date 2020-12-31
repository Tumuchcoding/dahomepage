import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FolderSelect } from "./FolderSelect";

export default function FormModel({ folderArr, setFolderArr }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState("");
  const [folder, setFolder] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    const copyDataArr = () => {
      const filterFolder = folderArr.filter(
        (foldername) => foldername.folder === folder
      );
      const dataExist = filterFolder[0]?.url;

      if (dataExist) return dataExist;
      else return [];
    };
    const folderRef = copyDataArr();
    setData(folderRef);

    return copyDataArr();
  }, [folderArr, folder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validURL(input);
    if (valid) {
      const hostname = domain(input);
      db.collection(`channels/test/folder`)
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
    setData(null);
  };
  const folderlink = (url) => {
    setFolder(url);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Paste your url and select a folder
          </DialogContentText>
          <form>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <FolderSelect folderlink={folderlink} setFolderArr={setFolderArr} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function validURL(url) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
}

function domain(url) {
  const a = document.createElement("a");
  a.href = url;
  return a.hostname;
}
