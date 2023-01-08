import React from "react";
import style from "./index.module.scss";
import { useToDoStore } from "../../data/store/useToDoStore";
import { InputPlus } from "../components/input";
import { InputTask } from "../components/inputTask";
import vid from "../../assets/backgroundTimelaps.mp4";
export const App: React.FC = () => {
  const [task, createTask, updateTask, removeTask] = useToDoStore((state) => [
    state.task,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  return (
    <>
      <video autoPlay loop muted id="bgvideo">
        <source src={vid} type="video/mp4"></source>
      </video>
      <article className={style.article}>
        <h1 className={style.article__title}>To Do App</h1>
        <section className={style.article__section}>
          <InputPlus
            onAdd={(title) => {
              if (title) {
                createTask(title);
              }
            }}
          />
        </section>
        <section className={style.article__section}>
          {!task.length && <p className={style.article__text}>Задач нет</p>}
          {task.map((task) => (
            <InputTask
              key={task.id}
              id={task.id}
              title={task.title}
              onDone={removeTask}
              onEdited={updateTask}
              onRemoved={removeTask}
            />
          ))}
        </section>
      </article>
    </>
  );
};
