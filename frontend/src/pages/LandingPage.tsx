// frontend/src/pages/LandingPage.tsx
import { Button, Layout, Typography, Space } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const LandingPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <Title level={4} style={{ color: "#fff", margin: 0 }}>
          Saypeace HR
        </Title>
        <Space>
          <Link to="/login">
            <Button type="default">User Login</Button>
          </Link>
          <Link to="/login?mode=admin">
            <Button type="primary">Admin Login</Button>
          </Link>
        </Space>
      </Header>

      <Content
        style={{
          padding: "48px 16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 720, textAlign: "center" }}>
          <Title>Centralized Task & Operations Management</Title>
          <Paragraph style={{ fontSize: 16 }}>
            Saypeace HR helps you manage internal employees and external
            contractors in one place: tasks, deadlines, performance, and
            communication — all in a clean dashboard.
          </Paragraph>

          <Space direction="vertical" size="large" style={{ marginTop: 24 }}>
            <Space wrap>
              <Link to="/login?mode=admin">
                <Button type="primary" size="large">
                  Login as Admin
                </Button>
              </Link>
              <Link to="/login">
                <Button size="large">Login as User</Button>
              </Link>
            </Space>

            <Text type="secondary">
              This is a demo build. Authentication is using mock credentials
              until the backend is connected.
            </Text>
          </Space>
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        <Text type="secondary">
          © {new Date().getFullYear()} Saypeace Solutions — Internal Operations
          System
        </Text>
      </Footer>
    </Layout>
  );
};

export default LandingPage;
