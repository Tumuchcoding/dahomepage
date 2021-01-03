import React, { useState, useEffect, useContext } from "react";
import { db } from "../Firebase/firebase";
import FormModel from "./FormModel";
import TreeRender from "./TreeRender";
import { Arr } from "../Context/ArrContext";

function Links() {
  const [folderArr, setFolderArr] = useState([]);
  const { user } = useContext(Arr);
  useEffect(() => {
    return db
      .collection(`channels/${user?.uid}/folder`)
      .onSnapshot((snapshot) => {
        const folders = [];
        snapshot.forEach((folder) => {
          folders.push({
            ...folder.data(),
            folder: folder.id,
          });
        });
        setFolderArr(folders);
      });
  }, [user?.uid]);

  return (
    <>
      <FormModel folderArr={folderArr} setFolderArr={setFolderArr} />
      <TreeRender folderArr={folderArr} />
    </>
  );
}

export default Links;
