// frontend/src/pages/auth/LoginPage.tsx
import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Typography, Alert } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Title,  } = Typography;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If query param ?mode=admin, pre-fill admin email
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    if (mode === "admin") {
      form.setFieldsValue({
        email: "admin@saypeace.com",
      });
    }
  }, [location.search, form]);

  const onFinish = async (values: { email: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      const user = await login(values.email, values.password);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/app", { replace: true });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Card style={{ width: "100%", maxWidth: 400 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Sign in
        </Title>
       


        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ marginTop: 8 }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
