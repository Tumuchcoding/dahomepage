import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase/firebase";

function Login() {
  const [logInput, setLogInput] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [error, setError] = useState(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogInput({ ...logInput, [e.target.id]: e.target.value });
  };
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let gotError;
    try {
      await auth.signInWithEmailAndPassword(logInput.email, logInput.password);
    } catch (error) {
      setError(error.message);
      if (error) gotError = error;
    }
    if (!gotError) history.push("/");
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          value={logInput.email}
          onChange={handleOnChange}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={logInput.password}
          onChange={handleOnChange}
        />
        <button>Login</button>
      </form>
      {error}
    </div>
  );
}

export default Login;
