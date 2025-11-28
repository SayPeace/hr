import { Avatar, Button, Card, Form, Input, Space, Typography } from "antd";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

interface ProfileFormValues {
  name: string;
  jobTitle?: string;
  department?: string;
}

const UserProfilePage = () => {
  const { user, updateUser } = useAuth();

  if (!user) {
    return <Text>No user loaded</Text>;
  }

  const [form] = Form.useForm<ProfileFormValues>();

  const handleFinish = (values: ProfileFormValues) => {
    updateUser(values);
  };

  return (
    <>
      <Title level={3}>My Profile</Title>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Space>
            <Avatar size={64} src={user.avatarUrl}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <Title level={4} style={{ margin: 0 }}>
                {user.name}
              </Title>
              <Text type="secondary">{user.email}</Text>
              <br />
              <Text>{user.jobTitle || "No job title set"}</Text>
              <br />
              <Text type="secondary">
                {user.department
                  ? `Department: ${user.department}`
                  : "No department set"}
              </Text>
            </div>
          </Space>

          <Form<ProfileFormValues>
            form={form}
            layout="vertical"
            initialValues={{
              name: user.name,
              jobTitle: user.jobTitle,
              department: user.department,
            }}
            onFinish={handleFinish}
            style={{ maxWidth: 480 }}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Job Title" name="jobTitle">
              <Input placeholder="e.g. Frontend Engineer" />
            </Form.Item>

            <Form.Item label="Department" name="department">
              <Input placeholder="e.g. Engineering" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </>
  );
};

export default UserProfilePage;
