import { Task } from './tasks.types';
// In-memory store 
let tasks: Task[] = [
  { id: '1', title: 'Learn Codex', userId: 'user1' },
  { id: '2', title: 'Master GitHub CLI', userId: 'user1' }
];

export const TaskService = {
   getAll: (userId: string) => tasks.filter(t => t.userId === userId),
  // The Agent can use this when it generates the DELETE route
  delete: (id: string, userId: string) => { 
    tasks = tasks.filter(t => !(t.id === id && t.userId === userId)); 
  },

  // The Agent can use this for the POST route
  create: (title: string, userId: string) => {
    const newTask = { 
      id: Math.random().toString(36).substr(2, 9), 
      title, 
      userId 
    };
    tasks.push(newTask);
    return newTask;
  }
};




  
 
