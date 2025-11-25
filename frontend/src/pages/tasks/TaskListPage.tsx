import { useMemo, useState } from "react";
import { Button, Card, Input, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Task } from "../../types/task";
import { mockTasks } from "../../mock/tasks";
import { TaskPriorityTag } from "../../components/tasks/TaskPriorityTag";
import { TaskStatusTag } from "../../components/tasks/TaskStatusTag";

const { Title } = Typography;
const { Search } = Input;

const TaskListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = useMemo(() => {
    if (!searchTerm.trim()) return mockTasks;
    const term = searchTerm.toLowerCase();
    return mockTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.assigneeName.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const columns: ColumnsType<Task> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Assignee",
      dataIndex: "assigneeName",
      key: "assigneeName",
      render: (text, record) =>
        `${text} (${record.assigneeRole === "internal" ? "Internal" : "External"})`,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => <TaskPriorityTag priority={priority} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <TaskStatusTag status={status} />,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <>
      <Title level={3}>Tasks</Title>
      <Card>
        <Space
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Search
            placeholder="Search by title, description, assignee..."
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: 400 }}
          />
          <Button type="primary">Create Task</Button>
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredTasks}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </>
  );
};

export default TaskListPage;
