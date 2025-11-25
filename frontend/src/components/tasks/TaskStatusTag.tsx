import { Tag } from "antd";
import type { TaskStatus } from "../../types/task";

interface TaskStatusTagProps {
  status: TaskStatus;
}

const statusConfig: Record<
  TaskStatus,
  { label: string; color: string }
> = {
  not_started: { label: "Not Started", color: "default" },
  in_progress: { label: "In Progress", color: "blue" },
  completed: { label: "Completed", color: "green" },
  cancelled: { label: "Cancelled", color: "red" },
};

export const TaskStatusTag = ({ status }: TaskStatusTagProps) => {
  const cfg = statusConfig[status];
  return <Tag color={cfg.color}>{cfg.label}</Tag>;
};
