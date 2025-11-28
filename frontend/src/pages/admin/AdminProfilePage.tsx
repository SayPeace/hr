// frontend/src/pages/admin/AdminProfilePage.tsx
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  List,
  Space,
  Tabs,
  Typography,
  Upload,
  message,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import type { UploadProps } from "antd";

const { Title, Text } = Typography;

const mockAdminActivity = [
  {
    id: 1,
    action: "Created task: Onboard new contractor",
    timestamp: "2025-11-26 10:15",
  },
  {
    id: 2,
    action: "Updated status: Q4 Reporting to In Progress",
    timestamp: "2025-11-26 09:42",
  },
  {
    id: 3,
    action: "Deactivated user: John Doe",
    timestamp: "2025-11-25 16:20",
  },
];

const AdminProfilePage = () => {
  const { user } = useAuth();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Mock: avatar upload (does not hit backend yet)
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      message.success(`Mock upload: ${file.name} selected`);
      // prevent actual upload
      return false;
    },
    showUploadList: false,
  };

  const handleProfileSave = (values: any) => {
    console.log("Profile save (mock):", values);
    message.success("Profile updated (mock). Backend will handle this later.");
  };

  const handlePasswordChange = (values: { currentPassword: string; newPassword: string }) => {
    console.log("Password change (mock):", values);
    message.success("Password change requested (mock).");
    passwordForm.resetFields();
  };

  return (
    <>
      <Title level={3}>Admin Profile</Title>
      <Text type="secondary">
        Manage your personal account settings and security.
      </Text>

      <Card style={{ marginTop: 16 }}>
        <Tabs
          defaultActiveKey="profile"
          items={[
            {
              key: "profile",
              label: "Profile",
              children: (
                <Space
                  align="start"
                  size="large"
                  style={{ flexWrap: "wrap", width: "100%" }}
                >
                  {/* Avatar + Upload */}
                  <Space direction="vertical" align="center">
                    <Avatar
                      size={96}
                      src={user?.avatarUrl}
                      icon={!user?.avatarUrl && <UserOutlined />}
                    >
                      {!user?.avatarUrl &&
                        user?.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Change Avatar</Button>
                    </Upload>

                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Avatar upload is mock only for now.
                    </Text>
                  </Space>

                  {/* Profile Form */}
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <Form
                      form={profileForm}
                      layout="vertical"
                      initialValues={{
                        name: user?.name,
                        email: user?.email,
                        jobTitle: user?.jobTitle,
                      }}
                      onFinish={handleProfileSave}
                    >
                      <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: "Name is required" }]}
                      >
                        <Input placeholder="Enter your full name" />
                      </Form.Item>

                      <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                          { required: true, message: "Email is required" },
                          { type: "email", message: "Enter a valid email" },
                        ]}
                      >
                        <Input placeholder="Enter your email" />
                      </Form.Item>

                      <Form.Item label="Job Title" name="jobTitle">
                        <Input placeholder="Enter your job title" />
                      </Form.Item>

                      <Space>
                        <Button type="primary" htmlType="submit">
                          Save Changes
                        </Button>
                        <Button
                          onClick={() =>
                            profileForm.setFieldsValue({
                              name: user?.name,
                              email: user?.email,
                              jobTitle: user?.jobTitle,
                            })
                          }
                        >
                          Reset to current
                        </Button>
                      </Space>
                    </Form>
                  </div>
                </Space>
              ),
            },
            {
              key: "security",
              label: "Security",
              children: (
                <div style={{ maxWidth: 420 }}>
                  <Title level={5}>Change Password</Title>
                  <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
                    This is currently a mock form. We will connect it to the backend
                    when authentication is implemented.
                  </Text>
                  <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handlePasswordChange}
                  >
                    <Form.Item
                      label="Current Password"
                      name="currentPassword"
                      rules={[{ required: true, message: "Enter your current password" }]}
                    >
                      <Input.Password placeholder="Current password" />
                    </Form.Item>

                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      rules={[
                        { required: true, message: "Enter a new password" },
                        {
                          min: 6,
                          message: "Password should be at least 6 characters",
                        },
                      ]}
                    >
                      <Input.Password placeholder="New password" />
                    </Form.Item>

                    <Form.Item
                      label="Confirm New Password"
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      rules={[
                        { required: true, message: "Confirm your new password" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("newPassword") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Passwords do not match")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Confirm new password" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                      Update Password
                    </Button>
                  </Form>
                </div>
              ),
            },
            {
              key: "activity",
              label: "Activity",
              children: (
                <div style={{ maxWidth: 600 }}>
                  <Title level={5}>Recent Admin Activity</Title>
                  <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
                    This is mock data for now. Later we’ll hook it to the audit log.
                  </Text>

                  <List
                    itemLayout="vertical"
                    dataSource={mockAdminActivity}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.action}
                          description={
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {item.timestamp}
                            </Text>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              ),
            },
          ]}
        />
      </Card>
    </>
  );
};

export default AdminProfilePage;
