import { useState } from "react";

const useInput = (initialState = "") => {
  const [input, setInput] = useState(initialState);
  const handleInput = (e) => setInput(parseInt(e.target.value));
  return { handleInput, value: input };
};

export default useInput;
