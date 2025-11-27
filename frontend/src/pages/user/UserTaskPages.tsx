import { useState } from "react";
import { Card, Input, Select, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Task, TaskStatus } from "../../types/task";
import { TaskPriorityTag } from "../../components/tasks/TaskPriorityTag";
import { TaskStatusTag } from "../../components/tasks/TaskStatusTag";
import { useUserTasks } from "../../hooks/useUserTasks";
import { TaskDetailDrawer } from "../../components/tasks/TaskDetailDrawer";

const { Title } = Typography;
const { Search } = Input;

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const UserTasksPage = () => {
  const { tasks, updateTaskStatus } = useUserTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleRowClick = (task: Task) => {
    setSelectedTask(task);
    setDetailOpen(true);
  };

  const filtered = tasks.filter((task) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term)
    );
  });

  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => <TaskPriorityTag priority={priority} />,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Space>
          <TaskStatusTag status={status} />
          <Select<TaskStatus>
            value={status}
            size="small"
            style={{ minWidth: 130 }}
            onChange={(value) => updateTaskStatus(record.id, value)}
            options={statusOptions}
          />
        </Space>
      ),
    },
    {
      title: "Due",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (value) => new Date(value).toLocaleString(),
      responsive: ["md", "lg"],
    },
  ];

  return (
    <>
      <Title level={3}>My Tasks</Title>
      <Card>
        <Space
          style={{
            marginBottom: 16,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "space-between",
          }}
        >
          <Search
            placeholder="Search tasks..."
            allowClear
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: 400, width: "100%", flex: 1 }}
          />
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={filtered}
          pagination={{ pageSize: 5, responsive: true }}
          scroll={{ x: "max-content" }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            style: { cursor: "pointer" },
          })}
        />
      </Card>

      <TaskDetailDrawer
        open={detailOpen}
        task={selectedTask}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
};

export default UserTasksPage;
