import React, { useContext } from "react";
import { Arr } from "../Context/ArrContext";
import Todolists from "../Form/Todolists";
import FormInput from "../Form/FormInput";
import MyCalendar from "../Calendar/MyCalendar";
import ClockWatch from "../Clock/ClockWatch";
import Time from "../Clock/Time";
import Jokes from "../Jokes/Jokes";
import Picture from "../Picture/Picture";
import Links from "../Shortcuts/Links";

export default function Main() {
  const { isLoading } = useContext(Arr);

  return (
    <>
      {isLoading ? (
        <>
          <h1>"it is uploading"</h1>
        </>
      ) : (
        <>
          <MyCalendar />
          <FormInput />
          <Todolists />
          <ClockWatch />
          <Time />
          <Jokes />
          <Picture />
          <Links />
        </>
      )}
    </>
  );
}
