import type { AppNotification } from "../types/notification";

export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "task_assigned",
    title: "New task assigned",
    message: "You have been assigned: Prepare client report",
    isRead: false,
    createdAt: "2025-11-24T09:00:00Z",
  },
  {
    id: "n2",
    type: "reminder",
    title: "Task due tomorrow",
    message: "Task 'Fix mobile app bug #231' is due in 24 hours.",
    isRead: false,
    createdAt: "2025-11-26T10:00:00Z",
  },
  {
    id: "n3",
    type: "task_updated",
    title: "Task updated",
    message: "Priority changed for 'Update onboarding docs'.",
    isRead: true,
    createdAt: "2025-11-22T14:30:00Z",
  },
];
