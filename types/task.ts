export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: number;
  title: string;
  notes: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
}