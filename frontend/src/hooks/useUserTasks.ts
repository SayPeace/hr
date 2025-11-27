import { useMemo, useState } from "react";
import type { Task, TaskStatus } from "../types/task";
import { mockTasks } from "../mock/tasks";
import { useAuth } from "../context/AuthContext";

export const useUserTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  // Only tasks assigned to the logged-in user
  const myTasks = useMemo(() => {
    if (!user) return [];
    return tasks.filter((task) => task.assigneeId === user.id);
  }, [tasks, user]);

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  // Basic analytics for user dashboard
  const stats = useMemo(() => {
    const total = myTasks.length;
    const completed = myTasks.filter((t) => t.status === "completed").length;
    const inProgress = myTasks.filter((t) => t.status === "in_progress").length;
    const notStarted = myTasks.filter((t) => t.status === "not_started").length;
    const overdue = myTasks.filter((t) => {
      const due = new Date(t.dueDate).getTime();
      const now = Date.now();
      return due < now && t.status !== "completed" && t.status !== "cancelled";
    }).length;

    return { total, completed, inProgress, notStarted, overdue };
  }, [myTasks]);

  return {
    tasks: myTasks,
    updateTaskStatus,
    stats,
  };
};
