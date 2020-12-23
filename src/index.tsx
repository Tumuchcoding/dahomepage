import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import ArrContext from "./components/Context/ArrContext";

ReactDOM.render(
  <ArrContext>
    <App />
  </ArrContext>,
  document.getElementById("root")
);
