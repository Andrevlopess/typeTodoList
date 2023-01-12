
import { dblClick } from "@testing-library/user-event/dist/types/setup/directApi";
import { collection, getDocs, limit, orderBy, query, where, onSnapshot, doc, addDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, TasksCollectionRef } from "../Services/Firebase";
import { AuthContextType, ITask, TaskContextType } from "../types/Task";
import { AuthContext } from "./Auth/AuthContext";

export const TasksContext = createContext<TaskContextType | null>(null);

export const TasksProvider = ({ children }: { children: JSX.Element }) => {



  const { currentUser } = useContext(AuthContext) as AuthContextType

  // * //////////////////////////////////////////////////////////////////////////////////////////////////  

  const [tasks, setTasks] = useState<ITask[]>([])


  async function getTasks() {
    if (currentUser) {

      const TasksCol =
        query(collection(db, 'Tasks'),
          where("userId", "==", currentUser.uid));

      const tasksSnapshot = await getDocs(TasksCol);
      const taskList = tasksSnapshot.docs.map(doc => doc.data());

      if (taskList) {
        return taskList as ITask[];
      } else {
        return [] as ITask[]
      }
    }
  }

  useEffect(() => {

    if (currentUser) {
      getTasks().then(data => data ? setTasks(data) : null)
    }
  }, [currentUser])


  async function saveTasks(TaskData: ITask) {
    try {
      await addDoc(collection(db, "Tasks"), TaskData);
      getTasks().then(data => data ? setTasks(data) : null)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const updateTasks = async (id: number, upTask: ITask) => {
    tasks.filter((task: ITask) => {
      if (task.id === id) {
        task.title = upTask.title;
        task.description = upTask.description;
        setTasks([...tasks]);
      }
    });
  };

  const teste = () => {
    updateDoc(doc(db, "Tasks", "zi9u9voO6wIBfCphOQki"),{
      description: "macacomacacomacaco"
    })
    }

    useEffect(() => {
      teste()
    }, [])
    


  // * //////////////////////////////////////////////////////////////////////////////////////////////////    


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

  const defineCurrentTasks = (
    taskStatus: "AllTasks" | "doneTasks" | "pendingTasks" | "ImportantTasks"
  ) => {
    if (taskStatus === "doneTasks") {
      setCurrentTasks(getDoneTasks());
    } else if (taskStatus === "pendingTasks") {
      setCurrentTasks(getPendingTasks());
    } else if (taskStatus === "AllTasks") {
      setCurrentTasks(tasks);
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
        saveTasks,
        getDoneTasks,
        getPendingTasks,
        getImportantTasks,
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
