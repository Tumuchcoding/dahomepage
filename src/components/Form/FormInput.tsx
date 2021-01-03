import { useContext } from "react";
import { Arr } from "../Context/ArrContext";
import TextField from "@material-ui/core/TextField";
import useFormAction from "./useFormAction";

function FormInput() {
  const { input, setInput } = useContext(Arr);
  const { handleSubmit } = useFormAction();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, text: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Goals for today.."
        value={input.text}
        variant="outlined"
        onChange={handleChange}
        inputRef={(input) => input && input.focus()}
        style={{ width: "100%", background: "white" }}
        autoComplete="off"
      />
    </form>
  );
}

export default FormInput;
