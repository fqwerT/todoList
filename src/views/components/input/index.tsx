import img from "../images/plus.png";
import React, { useCallback, useState } from "react";
import style from "./index.module.scss";

interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);
  return (
    <div className={style.inputPlus}>
      <input
        className={style.inputPlus__input}
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            addTask();
          }
        }}
      />
      <img src={img}
        className={style.inputPlus__button}
        onClick={addTask}
        aria-label="Add"
      />
    </div>
  );
};
