import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Switch,
  Table,
  Tag,
  Typography,
  Space,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  mockAdminUsers,
  type AdminUser,
  type AdminUserRole,
} from "../../mock/adminUsers";
import { PlusOutlined } from "@ant-design/icons";
import {
  AddUserModal,
  type AddUserFormValues,
} from "./AddUserModal";
import { mockAdminTasks, type AdminTask } from "../../mock/adminTasks";
import { UserDetailDrawer } from "./UserDetailDrawer"


const { Title, Text } = Typography;
const { Search } = Input;

const roleOptions: { value: AdminUserRole | "all"; label: string }[] = [
  { value: "all", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "user", label: "Employee" },
  { value: "external", label: "External" },
];

const AdminUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<AdminUserRole | "all">("all");
  const [showInactive, setShowInactive] = useState(false);

  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers);
  const [addOpen, setAddOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filtered = users.filter((user) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      (user.jobTitle ?? "").toLowerCase().includes(term) ||
      (user.department ?? "").toLowerCase().includes(term);

    const matchesRole =
      roleFilter === "all" ? true : user.role === roleFilter;

    const matchesActive = showInactive ? true : user.isActive;

    return matchesSearch && matchesRole && matchesActive;
  });

  const handleCreateUser = (values: AddUserFormValues) => {
    const newUser: AdminUser = {
      id: `u-${Date.now()}`,
      name: values.name,
      email: values.email,
      role: values.role,
      isActive: values.isActive,
      jobTitle: values.jobTitle,
      department: values.department,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    setUsers((prev) => [newUser, ...prev]);
  };

  const handleToggleActive = (userId: string, isActive: boolean) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive } : u))
    );
  };

  const openUser = (user: AdminUser) => {
    setSelectedUser(user);
    setDetailOpen(true);
  };

  const columns: ColumnsType<AdminUser> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.email}
          </Text>
        </div>
      ),
      width: 240,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        if (role === "admin") return <Tag color="geekblue">Admin</Tag>;
        if (role === "external") return <Tag color="purple">External</Tag>;
        return <Tag color="green">Employee</Tag>;
      },
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Space>
          <Switch
            size="small"
            checked={isActive}
            onChange={(checked) => handleToggleActive(record.id, checked)}
          />
          {isActive ? (
            <Badge status="success" text="Active" />
          ) : (
            <Badge status="default" text="Inactive" />
          )}
        </Space>
      ),
      width: 180,
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      render: (jobTitle) => jobTitle || "-",
      width: 160,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (dept) => dept || "-",
      width: 140,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => new Date(value).toLocaleDateString(),
      width: 140,
      responsive: ["md"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => openUser(record)}>
          View
        </Button>
      ),
      width: 100,
      fixed: "right",
    },
  ];

  // tasks for the selected user (by name, for mock data)
  const selectedUserTasks: AdminTask[] =
    selectedUser == null
      ? []
      : mockAdminTasks.filter(
          (t) => t.assigneeName === selectedUser.name
        );

  return (
    <>
      <Title level={3}>User Management</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Search
              placeholder="Search users by name, email, title..."
              allowClear
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>

          <Col xs={12} md={6}>
            <Select
              style={{ width: "100%" }}
              value={roleFilter}
              options={roleOptions}
              onChange={(value) => setRoleFilter(value)}
            />
          </Col>

          <Col xs={12} md={6}>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Switch
                checked={showInactive}
                onChange={setShowInactive}
                size="small"
              />
              <Text>Show inactive users</Text>
            </div>
          </Col>

          <Col xs={24} md={4}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              block
              onClick={() => setAddOpen(true)}
            >
              Add User
            </Button>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filtered}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </Card>

      <AddUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={handleCreateUser}
      />

      <UserDetailDrawer
        open={detailOpen}
        user={selectedUser}
        tasks={selectedUserTasks}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
};

export default AdminUsersPage;
