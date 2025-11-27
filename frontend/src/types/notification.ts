export type AppNotificationType =
  | "task_assigned"
  | "task_updated"
  | "comment"
  | "reminder";

export interface AppNotification {
  id: string;
  type: AppNotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string; // ISO string
}
