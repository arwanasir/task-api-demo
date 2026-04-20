export interface Task { 
    id: string; 
    title: string; 
    userId: string; 
}

export interface CreateTaskBody {
  title: string;
}