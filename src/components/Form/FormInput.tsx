import { useContext } from "react";
import { Arr } from "../Context/ArrContext";
import TextField from "@material-ui/core/TextField";
import useFormAction from "./useFormAction";

function FormInput() {
  const { input, setInput, focusRef } = useContext(Arr);
  const { handleSubmit } = useFormAction();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, text: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Tu's CRUD Todo on FireBase!</h2>
      <TextField
        id="outlined-basic"
        label="Goals for Today.."
        value={input.text}
        variant="outlined"
        onChange={handleChange}
        ref={focusRef}
      />
      {/* <div>
        <input
          type="text"
          id="inputField"
          value={input.text}
          onChange={handleChange}
          ref={focusRef}
        />
      </div> */}
    </form>
  );
}

export default FormInput;
