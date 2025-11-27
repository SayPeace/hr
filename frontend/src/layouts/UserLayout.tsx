import { Layout, Menu, Typography, Avatar, Dropdown, Space } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { NotificationBell } from "../components/common/NotificationBell";


const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { key: "/app", label: <Link to="/app">My Dashboard</Link> },
    { key: "/app/tasks", label: <Link to="/app/tasks">My Tasks</Link> },
  ];

  const profileMenuItems = [
    {
      key: "profile",
      label: "Profile",
      onClick: () => navigate("/app/profile"),
    },
    {
      key: "logout",
      label: "Logout",
      onClick: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            My Workspace
          </Title>

          {user && (
            <Space size="middle">
              <NotificationBell /> {/* This is already a component, no change needed here. */}
              <Dropdown
                menu={{ items: profileMenuItems }}
                trigger={["click"]}
              >
                <Space style={{ cursor: "pointer" }}>
                  <Avatar src={user.avatarUrl}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text strong style={{ lineHeight: 1 }}>
                      {user.name}
                    </Text>
                    <Text
                      type="secondary"
                      style={{ fontSize: 12, lineHeight: 1 }}
                    >
                      {user.jobTitle || "User"}
                    </Text>
                  </div>
                </Space>
              </Dropdown>
            </Space>
          )}
        </Header>


        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
