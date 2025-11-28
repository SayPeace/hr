// frontend/src/mock/adminDashboard.ts
import type { TaskPriority, TaskStatus } from "../types/task";

export interface AdminDashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  totalUsers: number;
  activeUsers: number;
  externalUsers: number;
}

export interface StatusChartItem {
  name: string;
  value: number;
}

export interface WeeklyTasksChartItem {
  week: string;
  created: number;
  completed: number;
}

export interface DailyCompletionChartItem {
  day: string;
  completed: number;
}

export interface AdminActivityItem {
  id: string;
  type: "task" | "user";
  title: string;
  description: string;
  createdAt: string;
}

export interface UpcomingTaskItem {
  id: string;
  title: string;
  assigneeName: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

// ---- MOCK STATS ----
export const adminDashboardStats: AdminDashboardStats = {
  totalTasks: 24,
  completedTasks: 14,
  inProgressTasks: 6,
  overdueTasks: 4,
  totalUsers: 12,
  activeUsers: 10,
  externalUsers: 3,
};

// ---- STATUS PIE CHART ----
export const adminStatusChartData: StatusChartItem[] = [
  { name: "Completed", value: 14 },
  { name: "In Progress", value: 6 },
  { name: "Not Started", value: 4 },
  { name: "Cancelled", value: 2 },
];

// ---- WEEKLY BAR CHART ----
export const adminWeeklyTasksData: WeeklyTasksChartItem[] = [
  { week: "Week 1", created: 5, completed: 3 },
  { week: "Week 2", created: 8, completed: 5 },
  { week: "Week 3", created: 6, completed: 4 },
  { week: "Week 4", created: 7, completed: 6 },
];

// ---- DAILY LINE CHART ----
export const adminDailyCompletionData: DailyCompletionChartItem[] = [
  { day: "Mon", completed: 1 },
  { day: "Tue", completed: 3 },
  { day: "Wed", completed: 2 },
  { day: "Thu", completed: 4 },
  { day: "Fri", completed: 3 },
  { day: "Sat", completed: 1 },
  { day: "Sun", completed: 0 },
];

// ---- ACTIVITY FEED ----
export const adminActivityFeed: AdminActivityItem[] = [
  {
    id: "a1",
    type: "task",
    title: "Task #T-104 marked as Completed",
    description: "User John Doe completed 'Prepare weekly report'.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "a2",
    type: "user",
    title: "New external contractor added",
    description: "Admin added 'Jane Smith' as external user.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "a3",
    type: "task",
    title: "New task assigned",
    description: "Task 'Client onboarding follow-up' assigned to Umar.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "a4",
    type: "task",
    title: "Task deadline updated",
    description: "Deadline moved for 'Update HR policy document'.",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
];

// ---- UPCOMING DEADLINES TABLE ----
export const upcomingTasks: UpcomingTaskItem[] = [
  {
    id: "t1",
    title: "Prepare payroll for March",
    assigneeName: "John Doe",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // +1 day
    priority: "high",
    status: "in_progress",
  },
  {
    id: "t2",
    title: "Client onboarding - ACME Corp",
    assigneeName: "Jane Smith",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // +2 days
    priority: "high",
    status: "not_started",
  },
  {
    id: "t3",
    title: "Internal security audit checklist",
    assigneeName: "Umar",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(), // +3 days
    priority: "medium",
    status: "in_progress",
  },
  {
    id: "t4",
    title: "Update HR handbook",
    assigneeName: "Mary Johnson",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 96).toISOString(), // +4 days
    priority: "low",
    status: "not_started",
  },
  {
    id: "t5",
    title: "Invoice review - Q1 vendors",
    assigneeName: "External: FinTrack Ltd",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 120).toISOString(), // +5 days
    priority: "medium",
    status: "not_started",
  },
];
