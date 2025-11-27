import { Card, Col, List, Row, Statistic, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useUserTasks } from "../../hooks/useUserTasks";
import { useUserNotifications } from "../../hooks/useUserNotifications";
import { TaskPriorityTag } from "../../components/tasks/TaskPriorityTag";
import { TaskStatusTag } from "../../components/tasks/TaskStatusTag";
import type { Task } from "../../types/task";

const { Title, Text } = Typography;

const UserDashboardPage = () => {
  const { tasks } = useUserTasks();
  const { notifications } = useUserNotifications();

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(
    (t) => t.status === "not_started" || t.status === "in_progress"
  ).length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  const now = new Date();
  const overdueTasks = tasks.filter(
    (t) => t.status !== "completed" && new Date(t.dueDate) < now
  ).length;

  const upcomingTasks = [...tasks]
    .filter((t) => new Date(t.dueDate) >= now)
    .sort(
      (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 5);

  const recentNotifications = [...notifications]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const upcomingColumns: ColumnsType<Task> = [
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text strong>{text}</Text>,
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
      render: (status) => <TaskStatusTag status={status} />,
      responsive: ["md", "lg"],
    },
    {
      title: "Due",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (value) => new Date(value).toLocaleString(),
      responsive: ["sm", "md", "lg"],
    },
  ];

  return (
    <>
      <Title level={3} style={{ marginBottom: 16 }}>
        My Dashboard
      </Title>

      {/* Top stats cards */}
      <Row gutter={[16, 16]}>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="Total Tasks" value={totalTasks} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="Active Tasks" value={activeTasks} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Completed"
              value={completedTasks}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Overdue"
              value={overdueTasks}
              valueStyle={{ color: overdueTasks > 0 ? "#cf1322" : undefined }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* Upcoming tasks */}
        <Col xs={24} md={14}>
          <Card title="Upcoming Tasks" bodyStyle={{ paddingTop: 8 }}>
            {upcomingTasks.length === 0 ? (
              <Text type="secondary">
                You have no upcoming tasks. 🎉
              </Text>
            ) : (
              <Table
                rowKey="id"
                columns={upcomingColumns}
                dataSource={upcomingTasks}
                pagination={false}
                size="small"
                scroll={{ x: "max-content" }}
              />
            )}
          </Card>
        </Col>

        {/* Recent notifications */}
        <Col xs={24} md={10}>
          <Card title="Recent Activity" bodyStyle={{ paddingTop: 8 }}>
            {recentNotifications.length === 0 ? (
              <Text type="secondary">No recent notifications.</Text>
            ) : (
              <List
                itemLayout="vertical"
                dataSource={recentNotifications}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={<Text strong>{item.title}</Text>}
                      description={
                        <>
                          <Text>{item.message}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            {new Date(item.createdAt).toLocaleString()}
                          </Text>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserDashboardPage;
