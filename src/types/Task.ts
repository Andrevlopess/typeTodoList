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
    saveTasks: (TaskData: ITask) => Promise<void>;
    updateTasks: (id: number, upTask: ITask) => void;
}

export type AuthContextType = {
    currentUser: User | null;
    cleanUser: () => void
    signInWithGoogle: () => void
}