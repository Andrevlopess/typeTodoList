import { User } from "firebase/auth";

export interface ITask {
    id: number;
    title: string;
    description: string;
    done: boolean;
    type: string;
    color: string;
    userId: string;
    createdAt: string;
}

export type TaskContextType = {
    tasks: ITask[];
    isLoading: boolean;
    isModalLoading: boolean;
    isDeleteTaskLoading: boolean;
    isConcludeTaskLoading: boolean;

    deleteTask: (id: number) => void
    concludeTask: (id: number)=> void
    saveTasks: (TaskData: ITask) => Promise<void>;
    updateTasks: (id: number, upTask: ITask) => void;

   getFilterTasks: (type: "Done"| "Pending"| "Important") => void
}

export type AuthContextType = {
    currentUser: User | null;
    cleanUser: () => void
    signInWithGoogle: () => void
}