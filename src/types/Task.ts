export interface ITask {
    id: number;
    title: string;
    description: string;
    done: boolean;
    type: string;
    color: string;

}

export type TaskContextType = {
    currentTasks: ITask[];

    getAllTasks(): ITask[];
    getDoneTasks(): ITask[];
    getPendingTasks(): ITask[];   
    getImportantTasks(): ITask[];

    saveTasks: (task: ITask) => void;
    updateTasks: (id: number, upTask: ITask) => void;
    concludeTasks: (id: number) => void;
    deleteTask: (id: number) => void;
    defineCurrentTasks: (taskStatus: "AllTasks" | "doneTasks" | "pendingTasks" | "ImportantTasks") => void;
    clearTasks: () => void;
}