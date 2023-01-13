
import { dblClick } from "@testing-library/user-event/dist/types/setup/directApi";
import { collection, getDocs, limit, orderBy, query, where, onSnapshot, doc, addDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, TasksCollectionRef } from "../Services/Firebase";
import { AuthContextType, ITask, TaskContextType } from "../types/Task";
import { AuthContext } from "./Auth/AuthContext";

export const TasksContext = createContext<TaskContextType | null>(null);

export const TasksProvider = ({ children }: { children: JSX.Element }) => {



  const { currentUser } = useContext(AuthContext) as AuthContextType


  const [tasks, setTasks] = useState<ITask[]>([])

  async function getSpecificTaskID(id: number) {
    const TasksCol =
      query(collection(db, 'Tasks'),
        where("id", "==", id));

    const tasksSnapshot = await getDocs(TasksCol);
    const SpecificTask = tasksSnapshot.docs.map(doc => doc.id);

    return SpecificTask
  }


  async function getTasks() {
    if (currentUser) {
      const TasksCol =
        query(TasksCollectionRef,
          where("userId", "==", currentUser.uid),
          orderBy("createdAt")
          );

      const tasksSnapshot = await getDocs(TasksCol);
      const taskList = tasksSnapshot.docs.map(doc => doc.data());

      if (taskList) {
        setTasks(taskList as ITask[])
      } else {
        setTasks([] as ITask[])
      }
    }
  }

  async function saveTasks(TaskData: ITask) {
    try {
      await addDoc(collection(db, "Tasks"), TaskData);
      getTasks()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const updateTasks = (id: number, upTask: ITask) => {

    getSpecificTaskID(id).then(data =>
      updateDoc(doc(db, "Tasks", data[0]), {
        title: upTask.title,
        description: upTask.description
      })
    )
  }


  useEffect(() => {

    if (currentUser) {
      getTasks()
    }
  }, [currentUser])

  // * //////////////////////////////////////////////////////////////////////////////////////////////////    


  return (
    <TasksContext.Provider
      value={{
        tasks,
        saveTasks,
        updateTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
