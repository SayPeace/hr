import {
  Drawer,
  Descriptions,
  Space,
  Typography,
  Grid,
} from "antd";
import type { Task } from "../../types/task";
import { TaskPriorityTag } from "./TaskPriorityTag";
import { TaskStatusTag } from "./TaskStatusTag";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

interface TaskDetailDrawerProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
}

export const TaskDetailDrawer = ({
  open,
  task,
  onClose,
}: TaskDetailDrawerProps) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  if (!task) return null;

  return (
    <Drawer
      title="Task Details"
      open={open}
      onClose={onClose}
      width={isMobile ? "100%" : 480}
      destroyOnClose
    >
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <div>
          <Title level={4} style={{ marginBottom: 4 }}>
            {task.title}
          </Title>
          <Space wrap>
            <TaskPriorityTag priority={task.priority} />
            <TaskStatusTag status={task.status} />
          </Space>
        </div>

        <div>
          <Title level={5}>Description</Title>
          <Paragraph>
            {task.description || (
              <Text type="secondary">No description</Text>
            )}
          </Paragraph>
        </div>

        <Descriptions
          column={isMobile ? 1 : 2}
          size="small"
          bordered
        >
          <Descriptions.Item label="Assignee">
            {task.assigneeName}{" "}
            <Text type="secondary">
              ({task.assigneeRole === "internal" ? "Internal" : "External"})
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Due Date">
            {new Date(task.dueDate).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(task.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Task ID">
            {task.id}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Drawer>
  );
};
