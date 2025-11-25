import { Avatar, Card, Col, Form, Input, Row, Typography, Button, message } from "antd";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

const UserProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [form] = Form.useForm();

  if (!user) return null;

  const onFinish = (values: any) => {
    updateUser(values);
    message.success("Profile updated");
  };

  return (
    <>
      <Title level={3}>My Profile</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card style={{ textAlign: "center" }}>
            <Avatar
              src={user.avatarUrl}
              size={96}
              style={{ marginBottom: 16 }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Title level={4} style={{ marginBottom: 4 }}>
              {user.name}
            </Title>
            <Text type="secondary">{user.email}</Text>
            <div>
              <Text type="secondary">
                {user.jobTitle || "Role: User"}
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Edit Profile">
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                name: user.name,
                jobTitle: user.jobTitle,
                department: user.department,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Job Title" name="jobTitle">
                <Input />
              </Form.Item>

              <Form.Item label="Department" name="department">
                <Input />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserProfilePage;
