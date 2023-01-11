
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { db, TasksCollectionRef } from "../Services/Firebase";
import { AuthContextType, ITask, TaskContextType } from "../types/Task";
import { AuthContext } from "./Auth/AuthContext";

export const TasksContext = createContext<TaskContextType | null>(null);

export const TasksProvider = ({ children }: { children: JSX.Element }) => {



  const { user } = useContext(AuthContext) as AuthContextType

  const [tasks, setTasks] = useState<ITask[]>([])


  const q = query(collection(db, "Tasks"), where("done", "==", false ));

 
  useEffect(() => {
    const getDocuments = async () => {
      const q = query(collection(db, "Tasks"), where("done", "==", false));
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
      });
    }
  
    getDocuments()
  }, [])


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


  const [currentTasks, setCurrentTasks] = useState<ITask[]>(tasks);

  useEffect(() => {
    setCurrentTasks(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const saveTasks = (task: ITask) => {
    const gotTask: ITask[] = getAllTasks();
    gotTask.push(task);
    setTasks([...tasks, task]);
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
