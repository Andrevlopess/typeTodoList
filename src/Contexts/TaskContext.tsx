import { log } from "console";
import { createContext, useEffect, useState } from "react";
import { TextSpan } from "typescript";
import { ITask, TaskContextType } from "../types/Task";

export const TasksContext = createContext<TaskContextType | null>(null);

export const TasksProvider = ({ children }: { children: JSX.Element }) => {
  const getAllTasks = () => {
    const savedTasks: ITask[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    if (savedTasks) {
      return savedTasks;
    } else {
      return [];
    }
  };
  const getDoneTasks = (): ITask[] => {
    const savedTasks: ITask[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    const doneTasks = savedTasks.filter((tasks) => tasks.done === true);
    return doneTasks;
  };

  const getPendingTasks = (): ITask[] => {
    const savedTasks: ITask[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    const pendingTasks = savedTasks.filter((tasks) => tasks.done === false);
    return pendingTasks;
  };

  const getImportantTasks = () => {
    const savedTasks: ITask[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    const pendingTasks = savedTasks.filter((tasks) => tasks.type === 'Important');
    return pendingTasks;
  }

  const [tasks, setTasks] = useState<ITask[]>(getAllTasks());
  const [currentTasks, setCurrentTasks] = useState<ITask[]>(tasks);

  useEffect(() => {
    setCurrentTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const saveTasks = (task: ITask) => {

    const gotTask: ITask[] = getAllTasks();

    console.log(task);

    const newTask: ITask = {
      id: task.id,
      title: task.title,
      description: task.description,
      done: false,
      type: task.type,
      color: task.color,
    };

    gotTask.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(gotTask));
    setTasks([...tasks, newTask]);
  };

  const concludeTasks = (id: number) => {
    tasks.filter((task: ITask) => {
      if (task.id === id) {
        task.done = true;
        setTasks([...tasks]);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });
  };

  const deleteTask = (id: number) => {
    const deletedTask = tasks.filter((tasks: ITask) => tasks.id !== id);
    setTasks(deletedTask);
    localStorage.setItem("tasks", JSON.stringify(deletedTask));
  };

  const updateTasks = (id: number, upTask: ITask) => {
    tasks.filter((task: ITask) => {
      if (task.id === id) {
        task.title = upTask.title;
        task.description = upTask.description;
        setTasks([...tasks]);
      }
    });
  };

  const defineCurrentTasks = (
    taskStatus: "AllTasks" | "doneTasks" | "pendingTasks" | "ImportantTasks"
  ) => {
    if (taskStatus === "doneTasks") {
      setCurrentTasks(getDoneTasks());
    } else if (taskStatus === "pendingTasks") {
      setCurrentTasks(getPendingTasks());
    } else if (taskStatus === "AllTasks") {
      setCurrentTasks(getAllTasks());
    } else if (taskStatus === "ImportantTasks") {
      setCurrentTasks(getImportantTasks());
    }
  };
  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <TasksContext.Provider
      value={{
        currentTasks,
        getAllTasks,
        getDoneTasks,
        getPendingTasks,
        getImportantTasks,
        saveTasks,
        updateTasks,
        concludeTasks,
        deleteTask,
        defineCurrentTasks,
        clearTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
