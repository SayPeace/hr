export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "not_started" | "in_progress" | "completed" | "cancelled";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeName: string;
  assigneeRole: "internal" | "external";
  dueDate: string; // ISO string
  createdAt: string;
}
