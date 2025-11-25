import { Layout, Menu, Typography } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout = () => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ padding: 16 }}>
          <Title level={4} style={{ color: "white", margin: 0 }}>
            Saypeace HR
          </Title>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            { key: "/", label: <Link to="/">Dashboard</Link> },
            { key: "/admin", label: <Link to="/admin">Admin Dashboard</Link> },
            { key: "/home", label: <Link to="/home">Home</Link> },
            { key: "/tasks", label: <Link to="/tasks">Tasks</Link> },
          ]}

        />
      </Sider>

      {/* Main content */}
      <Layout>
        <Header style={{ background: "#fff", padding: "0 16px" }}>
          <Title level={4} style={{ margin: 0 }}>
            Saypeace HR – MVP
          </Title>
        </Header>

        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
