import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Header from "./Pages/Header";
import Registration from "./Pages/Registration";
import Main from "./Pages/Main";
import { Arr } from "./Context/ArrContext";

function Routes() {
  const { user } = useContext(Arr);
  return (
    <Router>
      <Header />
      {user ? (
        <Route exact path="/">
          <Main />
        </Route>
      ) : (
        <>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
        </>
      )}
    </Router>
  );
}

export default Routes;
