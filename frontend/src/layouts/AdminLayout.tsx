import { Layout, Menu, Typography } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout = () => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ padding: 16 }}>
          <Title level={4} style={{ color: "white", margin: 0 }}>
            Admin – Saypeace HR
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            { key: "/admin", label: <Link to="/admin">Dashboard</Link> },
            { key: "/admin/tasks", label: <Link to="/admin/tasks">Tasks</Link> },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 16px" }}>
          <Title level={4} style={{ margin: 0 }}>Admin Panel</Title>
        </Header>
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
