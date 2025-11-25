import { Button, Card, Form, Input, Typography, message } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
// import { defaultUser, DEFAULT_PASSWORD } from "../../mock/users";

const { Title,  } = Typography;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  // Where to go after login (if redirected)
  const from = (location.state as any)?.from?.pathname || "/app";

  const onFinish = async (values: any) => {
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      message.error(err.message || "Login failed");
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
      <Card style={{ width: 380, maxWidth: "100%" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Saypeace HR Login
        </Title>

        {/* Temporary hint for dev/testing */}
        {/* <Paragraph type="secondary" style={{ fontSize: 12 }}>
          <Text strong>Demo credentials:</Text>
          <br />
          Email: <Text code>{defaultUser.email}</Text>
          <br />
          Password: <Text code>{DEFAULT_PASSWORD}</Text>
        </Paragraph> */}

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="user@saypeace.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
