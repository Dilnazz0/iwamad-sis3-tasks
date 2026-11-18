import React, { createContext, useContext, useState } from 'react';
import { Task, TaskPriority } from '../types/task';

interface TasksContextValue {
  tasks: Task[];
  addTask: (title: string, notes: string, priority: TaskPriority) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Go to MEGA Park & eat Bahandi',
    notes: 'get the combo with cheese sause, a fountain Coke, and a chicken cheeseburger :).',
    priority: 'High',
    completed: false,
    createdAt: '18-11-2026',
  },
  {
    id: 2,
    title: 'Enterprise Architecture Assignment',
    notes: 'need to complete and submit assignment before deadline :(.',
    priority: 'Medium',
    completed: false,
    createdAt: '18-11-2026',
  },
  {
    id: 3,
    title: 'Accounting Information Systems Certification',
    notes: 'need pass the online certification exam that cost 20 points at final grade :o.',
    priority: 'High',
    completed: false,
    createdAt: '18-11-2026',
  },
  {
    id: 4,
    title: 'Clean the room before mom gets mad',
    notes: 'vacuum the floor, wash the dishes, and so on :(.',
    priority: 'High',
    completed: false,
    createdAt: '18-11-2026',
  },
  {
    id: 5,
    title: 'Go to the lecture',
    notes: 'try not to be late, for once, as usual :).',
    priority: 'Medium',
    completed: false,
    createdAt: '18-11-2026',
  },
  {
    id: 6,
    title: 'Get some sleep',
    notes: 'play a video on youtube and fall asleep :).',
    priority: 'Low',
    completed: false,
    createdAt: '18-11-2026',
  },
];

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const addTask = (title: string, notes: string, priority: TaskPriority) => {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(
      now.getMonth() + 1
    ).padStart(2, '0')}-${now.getFullYear()}`;

    const newTask: Task = {
      id: nextId,
      title: title.trim(),
      notes: notes.trim(),
      priority,
      completed: false,
      createdAt: formattedDate,
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks(): TasksContextValue {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}