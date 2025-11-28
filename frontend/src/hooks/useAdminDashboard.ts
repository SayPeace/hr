// frontend/src/hooks/useAdminDashboard.ts
import {
  adminDashboardStats,
  adminStatusChartData,
  adminWeeklyTasksData,
  adminDailyCompletionData,
  adminActivityFeed,
  upcomingTasks,
  type AdminDashboardStats,
  type StatusChartItem,
  type WeeklyTasksChartItem,
  type DailyCompletionChartItem,
  type AdminActivityItem,
  type UpcomingTaskItem,
} from "../mock/adminDashboard";

export interface UseAdminDashboardResult {
  stats: AdminDashboardStats;
  statusChart: StatusChartItem[];
  weeklyChart: WeeklyTasksChartItem[];
  dailyChart: DailyCompletionChartItem[];
  activity: AdminActivityItem[];
  upcomingTasks: UpcomingTaskItem[];
}

export const useAdminDashboard = (): UseAdminDashboardResult => {
  // later, this will call backend API
  return {
    stats: adminDashboardStats,
    statusChart: adminStatusChartData,
    weeklyChart: adminWeeklyTasksData,
    dailyChart: adminDailyCompletionData,
    activity: adminActivityFeed,
    upcomingTasks,
  };
};
