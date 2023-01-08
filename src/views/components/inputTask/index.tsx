import React, { MouseEvent, useState } from "react";
import style from "./index.module.scss";
import img from "../../../assets/deleteTask.png";
import img2 from "../../../assets/editTask.png";
import img3 from "../../../assets/saveTask.png";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditmode, setisEditMode] = useState(false);
  const [value, setValue] = useState(title);
  return (
    <div className={style.inputTask}>
      <label className={style.inputTask__body}>
        <input
          type={"checkbox"}
          disabled={isEditmode}
          checked={checked}
          className={style.inputTask__checkbox}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              onDone(id);
            }
          }}
        />
        {isEditmode ? (
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className={style.inputTask__edit}
          />
        ) : (
          <h3>{title}</h3>
        )}
      </label>

      {isEditmode ? (
        <img
          src={img3}
          aria-label="Save"
          onClick={() => {
            onEdited(id, value);
            setisEditMode(false);
          }}
          className={style.inputTask__editBtnSave}
        />
      ) : (
        <img
          src={img2}
          aria-label="Edit"
          className={style.inputTask__editBtn}
          onClick={() => {
            setisEditMode(true);
          }}
        />
      )}

      <img
        src={img}
        aria-label="Remove"
        className={style.inputTask__btn}
        onClick={() => {
          if (confirm("are you sure?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};
