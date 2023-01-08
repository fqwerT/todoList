import create from "zustand";
import { generateId } from "../helpers";
interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  task: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
  task: [],
  createTask: (title) => {
    const { task } = get();
    const newTask = {
      id: generateId(),
      title,
      createdAt: Date.now(),
    };

    set({
      task: [newTask].concat(task),
    });
  },
  updateTask: (id: string, title: string) => {
    const { task } = get();
    set({
      task: task.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      })),
    });
  },
  removeTask: (id: string) => {
    const { task } = get();
    set({ task: task.filter((task) => task.id !== id) });
  },
}));
