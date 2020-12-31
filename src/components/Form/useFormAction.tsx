import { FormEvent, useContext } from "react";
import { db } from "../Firebase/firebase";
import { Arr } from "../Context/ArrContext";

function useFormAction() {
  const {
    arr,
    value,
    input,
    setInput,
    setIsLoading,
    updateOn,
    setUpDateOn,
    user,
  } = useContext(Arr);
  let day = value.toDateString();
  type ArrType = {
    text: string;
    createdAt: string;
    lineThrough: boolean | null;
    id: string;
  };

  const lineOver = (list: ArrType) => {
    const dd = arr.find((arrList) => arrList.id === list.id);
    db.collection(`channels/${user?.uid}/${day}`)
      .doc(list.id)
      .set({ ...list, lineThrough: !dd?.lineThrough });
  };

  const update = (id: string) => {
    const num: ArrType | undefined = arr?.find((todo) => todo?.id === id);
    const updateInput: any = num;
    setInput(updateInput);
    setUpDateOn(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    //DB
    if (!updateOn) {
      db.collection(`channels/${user?.uid}/${day}`).add({
        text: input.text,
        lineThrough: false,
        createdAt: new Date().getTime(),
      });
    }

    if (updateOn) {
      db.collection(`channels/${user?.uid}/${day}`)
        .doc(input.id)
        .set({ ...input, text: input.text });
      setUpDateOn(false);
    }

    setInput({
      text: "",
      createdAt: "",
      lineThrough: null,
      id: "",
    });

    setIsLoading(false);
  };

  const remove = (id: string) => {
    db.collection(`channels/${user?.uid}/${day}`).doc(id).delete();
  };

  return { lineOver, update, handleSubmit, remove };
}

export default useFormAction;
