// frontend/src/pages/admin/AdminDashboardPage.tsx
import {
  Card,
  Col,
  List,
  Row,
  Statistic,
  Typography,
  Tag,
  Table,
  Space,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import {
  type AdminActivityItem,
  type UpcomingTaskItem,
} from "../../mock/adminDashboard";
import { TaskPriorityTag } from "../../components/tasks/TaskPriorityTag";
import { TaskStatusTag } from "../../components/tasks/TaskStatusTag";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const { Title, Text } = Typography;

const STATUS_COLORS: string[] = ["#52c41a", "#1890ff", "#faad14", "#ff4d4f"];

const AdminDashboardPage = () => {
  const {
    stats,
    statusChart,
    weeklyChart,
    dailyChart,
    activity,
    upcomingTasks,
  } = useAdminDashboard();

  // ✅ Cast statusChart to the type Recharts expects
  // ✅ Cast statusChart to the type Recharts expects
  const statusChartData = statusChart as any[];
  const upcomingColumns: ColumnsType<UpcomingTaskItem> = [
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <Text style={{ maxWidth: 220 }} ellipsis>
          {text}
        </Text>
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assigneeName",
      key: "assigneeName",
      render: (text) => (
        <Text style={{ fontSize: 12 }} type="secondary">
          {text}
        </Text>
      ),
      width: 180,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => <TaskPriorityTag priority={priority} />,
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <TaskStatusTag status={status} />,
      width: 140,
    },
    {
      title: "Due",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (value?: string) =>
        value ? new Date(value).toLocaleString() : "-",
      width: 180,
    },
  ];

  return (
    <>
      <Title level={3}>Admin Dashboard</Title>

      {/* KPI CARDS */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="Total Tasks" value={stats.totalTasks} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="Completed" value={stats.completedTasks} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="In Progress" value={stats.inProgressTasks} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="Overdue" value={stats.overdueTasks} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="Users" value={stats.totalUsers} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="Active Users" value={stats.activeUsers} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="External Users" value={stats.externalUsers} />
          </Card>
        </Col>
      </Row>

      {/* CHARTS ROW */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* STATUS PIE */}
        <Col xs={24} lg={8}>
          <Card title="Task Status Distribution" size="small">
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    {statusChartData.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${entry.name ?? index}`}
                        fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* WEEKLY BAR */}
        <Col xs={24} lg={8}>
          <Card title="Tasks Created vs Completed (Weekly)" size="small">
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={weeklyChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="created" name="Created" />
                  <Bar dataKey="completed" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* DAILY LINE */}
        <Col xs={24} lg={8}>
          <Card title="Daily Completions (Last 7 Days)" size="small">
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={dailyChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" name="Completed" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ACTIVITY + UPCOMING TASKS */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          <Card
            title="Recent Activity"
            size="small"
            bodyStyle={{ paddingTop: 8 }}
          >
            <List<AdminActivityItem>
              itemLayout="vertical"
              dataSource={activity}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Space
                    direction="vertical"
                    size={2}
                    style={{ width: "100%" }}
                  >
                    <Space>
                      <Text strong>{item.title}</Text>
                      {item.type === "task" && <Tag color="blue">Task</Tag>}
                      {item.type === "user" && <Tag color="purple">User</Tag>}
                    </Space>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.description}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card title="Upcoming Deadlines" size="small">
            <Table
              size="small"
              rowKey="id"
              columns={upcomingColumns}
              dataSource={upcomingTasks}
              pagination={false}
              scroll={{ x: "max-content" }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboardPage;
