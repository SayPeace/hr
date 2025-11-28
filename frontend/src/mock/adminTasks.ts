import type { Task, TaskPriority, TaskStatus } from "../types/task";

export interface AdminTask extends Task {
  assigneeId: string;
  assigneeName: string;
  // NOTE: assigneeRole comes from Task and is "internal" | "external"
}

const daysFromNow = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

export const mockAdminTasks: AdminTask[] = [
  {
    id: "t1",
    title: "Prepare client monthly report",
    description: "Compile KPIs and insights for Client X.",
    priority: "high" as TaskPriority,
    status: "in_progress" as TaskStatus,
    dueDate: daysFromNow(1),
    createdAt: daysFromNow(-2),
    assigneeId: "u1",
    assigneeName: "Usman Umar Garba",
    assigneeRole: "internal", // ✅ valid value
  },
  {
    id: "t2",
    title: "Update onboarding documentation",
    description: "Add new mobile app setup steps.",
    priority: "medium" as TaskPriority,
    status: "not_started" as TaskStatus,
    dueDate: daysFromNow(3),
    createdAt: daysFromNow(-1),
    assigneeId: "u2",
    assigneeName: "Jane Doe",
    assigneeRole: "internal",
  },
  {
    id: "t3",
    title: "Review contractor invoices",
    description: "Check November invoices and approve for payment.",
    priority: "high" as TaskPriority,
    status: "completed" as TaskStatus,
    dueDate: daysFromNow(-1),
    createdAt: daysFromNow(-5),
    assigneeId: "u3",
    assigneeName: "John Smith",
    assigneeRole: "external", // contractor
  },
  {
    id: "t4",
    title: "Fix mobile app bug #231",
    description: "Crash on login when network is slow.",
    priority: "high" as TaskPriority,
    status: "in_progress" as TaskStatus,
    dueDate: daysFromNow(2),
    createdAt: daysFromNow(-1),
    assigneeId: "u1",
    assigneeName: "Usman Umar Garba",
    assigneeRole: "internal",
  },
  {
    id: "t5",
    title: "Clean up staging database",
    description: "Remove old test data and reset seed.",
    priority: "low" as TaskPriority,
    status: "not_started" as TaskStatus,
    dueDate: daysFromNow(7),
    createdAt: daysFromNow(0),
    assigneeId: "sys1",
    assigneeName: "DevOps Bot",
    assigneeRole: "internal", // treat system as internal
  },
];
