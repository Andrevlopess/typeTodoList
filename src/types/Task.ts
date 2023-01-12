import { User } from "firebase/auth";

export interface ITask {
    id: number;
    title: string;
    description: string;
    done: boolean;
    type: string;
    color: string;
    userId: string;
}

export type TaskContextType = {
    currentTasks: ITask[];

    getDoneTasks(): ITask[];
    getPendingTasks(): ITask[];   
    getImportantTasks(): ITask[];
    
    updateTasks: (id: number, upTask: ITask) => void;
    concludeTasks: (id: number) => void;
    deleteTask: (id: number) => void;
    defineCurrentTasks: (taskStatus: "AllTasks" | "doneTasks" | "pendingTasks" | "ImportantTasks") => void;
    clearTasks: () => void;
}

export type AuthContextType = {
    user: User;
    signInWithGoogle: () => void
}