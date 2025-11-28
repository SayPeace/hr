import { useState } from "react";
import type { TaskPriority, TaskStatus } from "../types/task";
import { mockAdminTasks, type AdminTask } from "../mock/adminTasks";

export const useAdminTasks = () => {
  const [tasks, setTasks] = useState<AdminTask[]>(mockAdminTasks);

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const updateTaskPriority = (id: string, priority: TaskPriority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority } : t))
    );
  };

  return {
    tasks,
    updateTaskStatus,
    updateTaskPriority,
  };
};

export type { AdminTask };
