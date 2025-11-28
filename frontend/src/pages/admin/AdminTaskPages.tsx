import { useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";

import { mockAdminTasks, type AdminTask } from "../../mock/adminTasks";
import { TaskPriorityTag } from "../../components/tasks/TaskPriorityTag";
import { TaskStatusTag } from "../../components/tasks/TaskStatusTag";
import { TaskDetailDrawer } from "../../components/tasks/TaskDetailDrawer";
import { PlusOutlined } from "@ant-design/icons";
import {
  CreateTaskModal,
  type CreateTaskFormValues,
} from "../../components/tasks/CreateTaskModal";
import dayjs, { Dayjs } from "dayjs";

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const statusOptions = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const priorityWeight: Record<string, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

const AdminTasksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);
  const [dueRange, setDueRange] = useState<[Dayjs, Dayjs] | null>(null);

  // local tasks state so admin can create/update
  const [tasks, setTasks] = useState<AdminTask[]>(mockAdminTasks);

  const [selectedTask, setSelectedTask] = useState<AdminTask | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  // Unique assignees for dropdown filter
  const assignees = [...new Set(tasks.map((t) => t.assigneeName))].map(
    (name) => ({
      value: name,
      label: name,
    })
  );

  // Filtering logic
  const filteredTasks = tasks.filter((task) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term) ||
      task.assigneeName.toLowerCase().includes(term);

    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesPriority = priorityFilter
      ? task.priority === priorityFilter
      : true;
    const matchesAssignee = assigneeFilter
      ? task.assigneeName === assigneeFilter
      : true;

    const matchesDue =
      dueRange === null
        ? true
        : (() => {
            const [start, end] = dueRange;
            const due = dayjs(task.dueDate);
            return (
              due.isAfter(start.startOf("day")) &&
              due.isBefore(end.endOf("day"))
            );
          })();

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesAssignee &&
      matchesDue
    );
  });

  const openTask = (task: AdminTask) => {
    setSelectedTask(task);
    setDetailOpen(true);
  };

  const handleCreateTask = (values: CreateTaskFormValues) => {
    const newTask: AdminTask = {
      id: `t-${Date.now()}`,
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: "not_started",
      dueDate: values.dueDate.toISOString(),
      createdAt: new Date().toISOString(),
      assigneeId: "temp-user-id",
      assigneeName: values.assigneeName,
      assigneeRole: values.assigneeRole,
      // tags: values.tags,
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (updated: AdminTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setSelectedTask(updated);
  };

  const columns: ColumnsType<AdminTask> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Button type="link" onClick={() => openTask(record)}>
          {text}
        </Button>
      ),
      width: 220,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Assignee",
      dataIndex: "assigneeName",
      key: "assigneeName",
      width: 180,
      sorter: (a, b) => a.assigneeName.localeCompare(b.assigneeName),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => <TaskPriorityTag priority={priority} />,
      width: 120,
      sorter: (a, b) =>
        priorityWeight[a.priority] - priorityWeight[b.priority],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <TaskStatusTag status={status} />,
      width: 150,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (value) => new Date(value).toLocaleString(),
      width: 180,
      sorter: (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => new Date(value).toLocaleDateString(),
      width: 140,
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      responsive: ["lg"],
    },
  ];

  return (
    <>
      <Title level={3}>Manage Tasks</Title>

      {/* Filters & Actions */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Search
              placeholder="Search tasks..."
              allowClear
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>

          <Col xs={12} md={4}>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Status"
              options={statusOptions}
              onChange={(v) => setStatusFilter(v ?? null)}
            />
          </Col>

          <Col xs={12} md={4}>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Priority"
              options={priorityOptions}
              onChange={(v) => setPriorityFilter(v ?? null)}
            />
          </Col>

          <Col xs={12} md={4}>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Assignee"
              options={assignees}
              onChange={(v) => setAssigneeFilter(v ?? null)}
            />
          </Col>

          <Col xs={12} md={6}>
            <RangePicker
              style={{ width: "100%" }}
              onChange={(values) =>
                setDueRange(
                  values && values[0] && values[1]
                    ? [values[0], values[1]]
                    : null
                )
              }
              placeholder={["Due from", "Due to"]}
            />
          </Col>

          <Col xs={24} md={6}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              block
              onClick={() => setCreateOpen(true)}
            >
              Create Task
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Tasks Table */}
      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredTasks}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      {/* Task Drawer */}
      <TaskDetailDrawer
        open={detailOpen}
        task={selectedTask}
        mode="admin"
        onClose={() => setDetailOpen(false)}
        onUpdateTask={handleUpdateTask}
      />

      {/* Create Task Modal */}
      <CreateTaskModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateTask}
        assignees={assignees}
      />
    </>
  );
};

export default AdminTasksPage;
