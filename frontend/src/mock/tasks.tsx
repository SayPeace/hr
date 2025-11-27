import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Prepare client report",
    description: "Compile performance report for Client A",
    priority: "high",
    status: "in_progress",
    assigneeId: "u1", // 👈 default user
    assigneeName: "Usman Umar Garba",
    assigneeRole: "internal",
    dueDate: "2025-11-30T17:00:00Z",
    createdAt: "2025-11-20T09:00:00Z",
  },
  {
    id: "t2",
    title: "Fix mobile app bug #231",
    description: "Crash on login screen for Android devices",
    priority: "medium",
    status: "not_started",
    assigneeId: "u1", // 👈 also default user
    assigneeName: "John Doe",
    assigneeRole: "internal",
    dueDate: "2025-11-28T12:00:00Z",
    createdAt: "2025-11-21T10:30:00Z",
  },
  {
    id: "t3",
    title: "Update company onboarding docs",
    description: "Add new HR policies for remote workers",
    priority: "low",
    status: "completed",
    assigneeId: "u2", // 👈 belongs to someone else
    assigneeName: "Michael Lee",
    assigneeRole: "internal",
    dueDate: "2025-11-15T15:00:00Z",
    createdAt: "2025-11-01T08:15:00Z",
  },
];
