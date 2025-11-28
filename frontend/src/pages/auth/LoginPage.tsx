// src/pages/auth/LoginPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  Alert,
  Space,
} from "antd";
import { useAuth } from "../../context/AuthContext";

const { Title, Text } = Typography;

const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect based on role
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/app");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      // Build a mocked AuthUser object from the provided credentials (demo mode).
      // Use the email local-part as the name and infer role from the email prefix.
      const authUser = {
        id: values.email,
        name: values.email.split("@")[0],
        email: values.email,
        role: values.email.startsWith("admin") ? "admin" : "user",
      } as any;

      login(authUser);
      // Redirect happens in useEffect when `user` is updated
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background:
          "radial-gradient(circle at top, #e6f7ff 0, #ffffff 45%, #fafafa 100%)",
      }}
    >
      <Card
        style={{ maxWidth: 400, width: "100%" }}
        bordered={false}
        bodyStyle={{ padding: 24 }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div style={{ textAlign: "center" }}>
            <Title level={3} style={{ marginBottom: 4 }}>
              Saypeace HR Portal
            </Title>
            <Text type="secondary">
              Sign in to manage your tasks and workspace
            </Text>
          </div>

          {error && (
            <Alert
              type="error"
              message={error}
              showIcon
            />
          )}

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="admin@saypeace.test or user@saypeace.test" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="Enter any password for now" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
