import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const UserTasksPage = () => {
  return (
    <>
      <Title level={3}>My Tasks</Title>
      <Card>
        <Paragraph>
          This will show only tasks assigned to the logged-in user (coming soon).
        </Paragraph>
      </Card>
    </>
  );
};

export default UserTasksPage;
