import { IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Arr } from "../Context/ArrContext";
import { storage, db } from "../Firebase/firebase";

function Picture() {
  const [pic, setPic] = useState<string | null | ArrayBuffer | FileReader>(
    null
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [picUrl, setPicUrl] = useState("");
  const { user } = useContext(Arr);

  const filePreview = (e: { target: HTMLInputElement }) => {
    const { files } = e.target;
    if (!files) return null;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      const target: FileReader | null = e.target;
      if (target) setPic(target.result);
    };
  };
  const handleClearPic = () => {
    setPic("");
    if (inputRef && inputRef.current) inputRef.current.value = "";
  };
  const PreviewPic: any = pic;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const getUrl = async () => {
      if (pic !== null) {
        const refFile = storage.ref().child("images/pic1");
        const res = await refFile.putString(PreviewPic, "data_url");
        const url = await res.ref.getDownloadURL();
        db.collection(`channels/${user?.uid}/images`)
          .doc("one")
          .set({ image: url });
        setPicUrl(url);
        if (inputRef && inputRef.current) inputRef.current.value = "";
      }
    };
    getUrl();
    handleClearPic();
  };
  useEffect(() => {
    db.collection(`channels/${user?.uid}/images`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          setPicUrl(doc.data().image);
        });
      });
  }, [user?.uid]);

  const removeFromDB = () => {
    if (picUrl) storage.refFromURL(picUrl).delete();
    db.collection(`channels/${user?.uid}/images`).doc("one").delete();
    setPicUrl("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={filePreview}
          ref={inputRef}
          id="icon-button-file"
          style={{ display: "none" }}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <button>Submit</button>
      </form>
      {pic && (
        <div>
          <img src={PreviewPic} alt="" width="50px" height="50px" />
          <button onClick={handleClearPic}>clear</button>
        </div>
      )}
      {picUrl && (
        <>
          <img src={picUrl} alt="pic" />
          <button onClick={() => removeFromDB()}>delete</button>{" "}
        </>
      )}
    </div>
  );
}

export default Picture;
