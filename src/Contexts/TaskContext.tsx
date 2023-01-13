
import { collection, getDocs, limit, orderBy, query, where, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, TasksCollectionRef } from "../Services/Firebase";
import { AuthContextType, ITask, TaskContextType } from "../types/Task";
import { AuthContext } from "./Auth/AuthContext";

export const TasksContext = createContext<TaskContextType | null>(null);

export const TasksProvider = ({ children }: { children: JSX.Element }) => {



  const { currentUser } = useContext(AuthContext) as AuthContextType


  const [tasks, setTasks] = useState<ITask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalLoading, setIsModalLoading] = useState(false)

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
        setIsLoading(false)
      } else {
        setTasks([] as ITask[])
      }
    }
  }

  async function saveTasks(TaskData: ITask) {
    try {
      setIsModalLoading(true)
      await addDoc(collection(db, "Tasks"), TaskData);
      getTasks()
      setIsModalLoading(false)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function updateSnapshot(id: number) {
    getSpecificTaskID(id).then(data =>
      onSnapshot(doc(db, "Tasks", data[0]), (doc) => {
        getTasks()
      })
    )

  }

  function updateTasks(id: number, upTask: ITask) {
    getSpecificTaskID(id).then(async data =>
      await updateDoc(doc(db, "Tasks", data[0]), {
        title: upTask.title,
        description: upTask.description
      })
    )

    updateSnapshot(id)

    // updateSnapshot("gkyQM8vLMYueVYg8aOwa")
  }

  function deleteTask(id: number) {
    try {
      getSpecificTaskID(id).then(data => {
        deleteDoc(doc(db, "Tasks", data[0]));
      })

      getTasks()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
        isLoading,
        isModalLoading,
        deleteTask,
        saveTasks,
        updateTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
