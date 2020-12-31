import React, { useState, useEffect } from "react";
import { db } from "../Firebase/firebase";
import FormModel from "./FormModel";
import TreeRender from "./TreeRender";

function Links() {
  const [folderArr, setFolderArr] = useState([]);
  useEffect(() => {
    return db.collection(`channels/test/folder`).onSnapshot((snapshot) => {
      const folders = [];
      snapshot.forEach((folder) => {
        folders.push({ ...folder.data(), folder: folder.id });
      });
      setFolderArr(folders);
    });
  }, []);

  return (
    <>
      <FormModel folderArr={folderArr} setFolderArr={setFolderArr} />
      <TreeRender folderArr={folderArr} />
    </>
  );
}

export default Links;
