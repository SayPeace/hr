import { Card, Typography, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <Card>
      <Title level={2}>Welcome to Saypeace HR</Title>
      <Paragraph>This is the frontend foundation. We'll grow it step by step.</Paragraph>

      <Link to="/login">
        <Button type="primary">Go to Login</Button>
      </Link>
    </Card>
  );
};

export default HomePage;
