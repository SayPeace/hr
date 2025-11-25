import { Card, List, Typography } from "antd";

const { Title } = Typography;

const UserDashboard = () => {
  return (
    <>
      <Title level={3}>My Dashboard</Title>
      <Card>
        <List
          dataSource={[
            { id: 1, title: "Complete setup", status: "In Progress" },
            { id: 2, title: "Review tasks", status: "Not Started" },
          ]}
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

export default UserDashboard;
