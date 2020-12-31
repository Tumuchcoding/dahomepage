import React, { useState, createContext } from "react";

const init = {
  user: null,
  setUser: () => {},
  arr: [],
  setArr: () => [],
  value: new Date(),
  onChange: () => {},
  isLoading: false,
  setIsLoading: () => {},
  updateOn: false,
  setUpDateOn: () => {},
  input: {
    text: "",
    createdAt: "",
    lineThrough: null,
    id: "",
  },
  setInput: () => {},
};

type ArrType = {
  text: string;
  createdAt: string;
  lineThrough: boolean | null;
  id: string;
};

type User = {
  uid: string;
};

type contextTypes = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  arr: ArrType[];
  setArr: React.Dispatch<React.SetStateAction<ArrType[]>>;
  value: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateOn: boolean;
  setUpDateOn: React.Dispatch<React.SetStateAction<boolean>>;
  input: {
    text: string;
    createdAt: string;
    lineThrough: null;
    id: string;
  };
  setInput: React.Dispatch<
    React.SetStateAction<{
      text: string;
      createdAt: string;
      lineThrough: null;
      id: string;
    }>
  >;
};

export const Arr = createContext<contextTypes>(init);
const ArrContext: React.FC = ({ children }) => {
  const [arr, setArr] = useState<ArrType[]>([]);
  const [value, onChange] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [updateOn, setUpDateOn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [input, setInput] = useState({
    text: "",
    createdAt: "",
    lineThrough: null,
    id: "",
  });

  const arrValue = {
    arr,
    setArr,
    value,
    onChange,
    input,
    setInput,
    isLoading,
    setIsLoading,
    updateOn,
    setUpDateOn,
    user,
    setUser,
  };

  return <Arr.Provider value={arrValue}>{children}</Arr.Provider>;
};
export default ArrContext;
