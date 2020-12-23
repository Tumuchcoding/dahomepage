import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase/firebase";

function Registration() {
  const [regInput, setRegInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const history = useHistory();
  const [error, setError] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegInput({ ...regInput, [e.target.id]: e.target.value });
  };
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let gotError;
    try {
      await auth.createUserWithEmailAndPassword(
        regInput.email,
        regInput.password
      );
    } catch (error) {
      setError(error.message);
      if (error) gotError = error;
    }
    if (!gotError) history.push("/");
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={regInput.name}
          onChange={handleOnChange}
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          value={regInput.email}
          onChange={handleOnChange}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={regInput.password}
          onChange={handleOnChange}
        />
        <button>Register</button>
      </form>{" "}
      {error}
    </div>
  );
}

export default Registration;
