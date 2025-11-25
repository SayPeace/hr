import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const AdminTasksPage = () => {
  return (
    <>
      <Title level={3}>Admin Tasks</Title>
      <Card>
        <Paragraph>
          This is the Admin Tasks page. We will plug in the real tasks table here.
        </Paragraph>
      </Card>
    </>
  );
};

export default AdminTasksPage;
