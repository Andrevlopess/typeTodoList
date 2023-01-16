
import { toast } from 'react-hot-toast'
import { collection, getDocs, limit, orderBy, query, where, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { auth, db, TasksCollectionRef } from "../Services/Firebase";
import { AuthContextType, ITask, TaskContextType } from "../types/Task";
import { AuthContext } from "./Auth/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Center, Flex, Text } from '@chakra-ui/react';

export const TasksContext = createContext<TaskContextType | null>(null);

export const TasksProvider = ({ children }: { children: JSX.Element[] }) => {



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
    setIsDeleteTaskLoading(true)

    try {
      getSpecificTaskID(id).then(async id => {
        await deleteDoc(doc(db, "Tasks", id[0]));
        getTasks()
        setIsDeleteTaskLoading(false)
        toast((t) => (
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faTrash} color='#DC0000' />
            <Text mx='10px' color='desktopBg'>Task deleted</Text>
          </Flex>
        ))
      })

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function updateSnapshot(id: number) {
    getSpecificTaskID(id).then(data =>
      onSnapshot(doc(db, "Tasks", data[0]), (doc) => {
        getTasks()
        toast((t) => (
          <Flex alignItems='center'>
            <FontAwesomeIcon icon={faEdit} color='#111' fontSize='15px' />
            <Text mx='10px' color='desktopBg'>Task Updated</Text>
          </Flex>
        ), { duration: 10000 })
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
    setIsConcludeTaskLoading(true)
    try {
      getSpecificTaskID(id).then(async id => {
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
          orderBy("createdAt")
        );

      setIsLoading(true)
      const tasksSnapshot = await getDocs(TasksCol);
      const taskListAll = tasksSnapshot.docs.map(doc => doc.data());
      switch (type) {
        case "Done":
          const Donelist = taskListAll.filter(tasks => tasks.done === true)
          setTasks(Donelist as ITask[])
          setIsLoading(false)
          break;
        case "Pending":
          const PendingList = taskListAll.filter(tasks => tasks.done === false)
          setTasks(PendingList as ITask[])
          setIsLoading(false)
          break;

        case "Important":
          const ImportantList = taskListAll.filter(tasks => tasks.type === "Important")
          setTasks(ImportantList as ITask[])
          setIsLoading(false)
          break;

        default:
          setTasks([] as ITask[])
          break;
      }
    }
  }

  function clearTasks() {
    tasks.forEach(task => {
      deleteTask(task.id)
    })
  }

  useEffect(() => {

    if (currentUser) {
      getTasks()
    }
  }, [currentUser])

  // const { isLoading:novoNome } = useQuery("sla", async () => {

  // })

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
        clearTasks,

        getTasks,
        getFilterTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
