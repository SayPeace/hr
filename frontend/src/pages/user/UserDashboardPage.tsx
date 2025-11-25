import { Card, List, Typography } from "antd";

const { Title } = Typography;

const mockMyTasks = [
  { id: 1, title: "Complete onboarding docs", status: "In Progress" },
  { id: 2, title: "Review client feedback", status: "Not Started" },
];

const UserDashboardPage = () => {
  return (
    <>
      <Title level={3}>My Dashboard</Title>
      <Card title="My Tasks">
        <List
          dataSource={mockMyTasks}
          renderItem={(task) => (
            <List.Item>
              <List.Item.Meta
                title={task.title}
                description={`Status: ${task.status}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default UserDashboardPage;
