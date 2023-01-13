
import { collection, getDocs, limit, orderBy, query, where, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { auth, db, TasksCollectionRef } from "../Services/Firebase";
import { AuthContextType, ITask, TaskContextType } from "../types/Task";
import { AuthContext } from "./Auth/AuthContext";

export const TasksContext = createContext<TaskContextType | null>(null);

export const TasksProvider = ({ children }: { children: JSX.Element }) => {



  const { currentUser } = useContext(AuthContext) as AuthContextType


  const [tasks, setTasks] = useState<ITask[]>([])
  const [isDeleteTaskLoading, setIsDeleteTaskLoading] = useState(false)
  const [isConcludeTaskLoading, setIsConcludeTaskLoading] = useState(false)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

      setIsLoading(true)
      const tasksSnapshot = await getDocs(TasksCol);
      const taskList = tasksSnapshot.docs.map(doc => doc.data());

      console.log("atualizado");

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

  function deleteTask(id: number) {

    try {
      getSpecificTaskID(id).then(async id => {
        setIsDeleteTaskLoading(true)
        await deleteDoc(doc(db, "Tasks", id[0]));
        getTasks()
        setIsDeleteTaskLoading(false)
      })

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

  function concludeTask(id: number) {
    try {
      getSpecificTaskID(id).then(async id => {
        setIsConcludeTaskLoading(true)
        await updateDoc(doc(db, "Tasks", id[0]), { done: true })
        getTasks()
        setIsConcludeTaskLoading(false)
      })

    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  async function getFilterTasks(type: "Done" | "Pending" | "Important") {
    if (currentUser) {
      const TasksCol =
        query(TasksCollectionRef,
          where("userId", "==", currentUser.uid),
          type == "Done" ? where("done", "==", true) : where("done", "==", false),
          type == "Important" ? where("type", "==", "Impotant") : where("type", "==", "normal"),
          orderBy("createdAt")
        );

      setIsLoading(true)
      const tasksSnapshot = await getDocs(TasksCol);
      const taskList = tasksSnapshot.docs.map(doc => doc.data());

      console.log("atualizado");

      if (taskList) {
        setTasks(taskList as ITask[])
        setIsLoading(false)
      } else {
        setTasks([] as ITask[])
      }
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
        isDeleteTaskLoading,
        isConcludeTaskLoading,

        deleteTask,
        concludeTask,
        saveTasks,
        updateTasks,

        getFilterTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
