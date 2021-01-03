import { Button } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import JokeIcon from "./joke.svg";

function Jokes() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    const res = await fetch("https://icanhazdadjoke.com/slack");
    const json = await res.json();
    setJoke(json.attachments[0].text);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) getData();
  }, [getData, loading]);
  return (
    <div style={{ display: "flex" }}>
      <Button color="primary">
        <img
          src={JokeIcon}
          alt=""
          width="60px"
          onClick={() => setLoading(true)}
        />
      </Button>
      <div style={{ alignSelf: "center" }}>
        <blockquote style={{ fontWeight: 400 }}>"{joke}"</blockquote>
      </div>
    </div>
  );
}

export default Jokes;
