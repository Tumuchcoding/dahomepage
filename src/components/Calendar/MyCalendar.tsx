import { useCallback, useContext, useEffect } from "react";
import { Arr } from "../Context/ArrContext";
import { db } from "../Firebase/firebase";
import Calendar from "react-calendar";
import "./MyCalendar.css";

function MyCalendar() {
  const { setArr, value, onChange, user } = useContext(Arr);

  let day = value.toDateString();
  const getDay = useCallback(() => {
    const unsubscribe = db
      .collection(`channels/${user?.uid}/${day}`)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        const docs: {
          text: string;
          createdAt: string;
          lineThrough: boolean | null;
          id: string;
        }[] = [];
        snapshot.forEach((doc: { id: string; data: any }) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setArr(docs);
      });
    return unsubscribe;
  }, [day, setArr, user?.uid]);
  useEffect(() => {
    getDay();
  }, [day, getDay]);

  return (
    <Calendar
      onChange={onChange}
      value={value}
      onClickDay={getDay}
      showNavigation={false}
    />
  );
}

export default MyCalendar;
