import React, { useState, useContext, useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { Arr } from "../Context/ArrContext";
import { db } from "../Firebase/firebase";

function Links() {
  const [input, setInput] = useState("");
  const { user } = useContext(Arr);
  const [arr, setArr] = useState<
    {
      id: string;
      logo: string;
      hostname: string;
      url: string;
    }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validURL(input);
    if (valid) {
      const hostname = domain(input);
      db.collection(`channels/${user?.uid}/urls`).add({
        logo: `https://www.google.com/s2/favicons?domain=${hostname}`,
        hostname: hostname,
        url: input,
      });
    }
    setInput("");
  };
  useEffect((): void => {
    db.collection(`channels/${user?.uid}/urls`).onSnapshot((snapshot) => {
      const docs: {
        id: string;
        logo: string;
        hostname: string;
        url: string;
      }[] = [];
      snapshot.forEach((doc: { id: string; data: any }) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setArr(docs);
    });
    // return unsubscribe;
  }, [user?.uid]);

  const handleDelete = (id: string) => {
    console.info("You clicked the delete icon.");
    db.collection(`channels/${user?.uid}/urls`).doc(id).delete();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <ul>
        {arr.map((link) => (
          <li key={link.id}>
            <Chip
              size="medium"
              onClick={() => window.open(link.url, "_blank")}
              avatar={
                <Avatar
                  style={{ width: "16px", height: "16px" }}
                  alt="ico"
                  src={link.logo}
                />
              }
              label={link.hostname}
              onDelete={() => handleDelete(link.id)}
              variant="outlined"
            />{" "}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Links;

function validURL(url: string) {
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

function domain(url: string) {
  const a = document.createElement("a");
  a.href = url;
  return a.hostname;
}
