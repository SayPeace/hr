import { Tag } from "antd";
import type { TaskPriority } from "../../types/task";

interface TaskPriorityTagProps {
  priority: TaskPriority;
}

const priorityConfig: Record<
  TaskPriority,
  { label: string; color: string }
> = {
  high: { label: "High", color: "red" },
  medium: { label: "Medium", color: "gold" },
  low: { label: "Low", color: "green" },
};

export const TaskPriorityTag = ({ priority }: TaskPriorityTagProps) => {
  const cfg = priorityConfig[priority];
  return <Tag color={cfg.color}>{cfg.label}</Tag>;
};
