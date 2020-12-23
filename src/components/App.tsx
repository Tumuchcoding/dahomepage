import React, { useState, useEffect, useContext } from "react";
import { Arr } from "./Context/ArrContext";
import { auth } from "./Firebase/firebase";
import Routes from "./Routes";

function App() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const { setUser } = useContext(Arr);

  useEffect(() => {
    auth.onAuthStateChanged((Auth) => {
      if (Auth) {
        // console.log(Auth);
        setUser({
          uid: Auth.uid,
        });
      } else {
        setUser(null);
      }
    });
    setInitialized(true);
  }, [setUser]);

  return <section>{initialized ? <Routes /> : "getting data..."}</section>;
}

export default App;
