// frontend/src/pages/admin/AdminSettingsPage.tsx
import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Tabs,
  Typography,
  message,
} from "antd";

const { Title, Text } = Typography;

const { TabPane } = Tabs; // If TS complains, we’ll switch to items API, but this works with most versions.

const notificationChannels = [
  { label: "Email", value: "email" },
  { label: "In-App", value: "in_app" },
];

const timezones = [
  { label: "Africa/Lagos", value: "Africa/Lagos" },
  { label: "UTC", value: "UTC" },
  { label: "Europe/London", value: "Europe/London" },
];

const AdminSettingsPage = () => {
  const [savingCompany, setSavingCompany] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [savingSystem, setSavingSystem] = useState(false);

  const [companyForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();
  const [systemForm] = Form.useForm();

  const handleSaveCompany = async () => {
    try {
      const values = await companyForm.validateFields();
      setSavingCompany(true);
      console.log("Company settings (mock save):", values);
      message.success("Company settings saved (mock).");
    } catch (err) {
      console.log("Validation failed", err);
    } finally {
      setSavingCompany(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      const values = await notificationsForm.validateFields();
      setSavingNotifications(true);
      console.log("Notification settings (mock save):", values);
      message.success("Notification settings saved (mock).");
    } catch (err) {
      console.log("Validation failed", err);
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleSaveSystem = async () => {
    try {
      const values = await systemForm.validateFields();
      setSavingSystem(true);
      console.log("System settings (mock save):", values);
      message.success("System settings saved (mock).");
    } catch (err) {
      console.log("Validation failed", err);
    } finally {
      setSavingSystem(false);
    }
  };

  return (
    <>
      <Title level={3}>Admin Settings</Title>
      <Text type="secondary">
        Configure company information, notifications, and system behavior.
      </Text>

      <Card style={{ marginTop: 16 }}>
        <Tabs defaultActiveKey="company">
          {/* 🏢 COMPANY SETTINGS */}
          <TabPane tab="Company" key="company">
            <Form
              layout="vertical"
              form={companyForm}
              initialValues={{
                companyName: "Saypeace Solutions",
                companyEmail: "admin@saypeace.example",
                companyPhone: "+234 800 000 0000",
                timezone: "Africa/Lagos",
              }}
            >
              <Form.Item
                name="companyName"
                label="Company Name"
                rules={[{ required: true, message: "Company name is required" }]}
              >
                <Input placeholder="Enter company name" />
              </Form.Item>

              <Form.Item
                name="companyEmail"
                label="Company Email"
                rules={[
                  { required: true, message: "Company email is required" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input placeholder="Enter company email" />
              </Form.Item>

              <Form.Item name="companyPhone" label="Company Phone">
                <Input placeholder="Enter company phone (optional)" />
              </Form.Item>

              <Form.Item
                name="timezone"
                label="Default Timezone"
                rules={[{ required: true, message: "Timezone is required" }]}
              >
                <Select
                  options={timezones}
                  placeholder="Select default timezone"
                  showSearch
                />
              </Form.Item>

              <Space style={{ marginTop: 8 }}>
                <Button type="primary" loading={savingCompany} onClick={handleSaveCompany}>
                  Save Company Settings
                </Button>
              </Space>
            </Form>
          </TabPane>

          {/* 🔔 NOTIFICATION SETTINGS */}
          <TabPane tab="Notifications" key="notifications">
            <Form
              layout="vertical"
              form={notificationsForm}
              initialValues={{
                taskAssigned: true,
                taskUpdated: true,
                taskOverdue: true,
                digestEnabled: true,
                digestHour: "08:00",
                channels: ["email", "in_app"],
              }}
            >
              <Form.Item
                label="Task Events"
                style={{ marginBottom: 8 }}
              >
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Choose when notifications should be sent to users.
                </Text>
              </Form.Item>

              <Form.Item
                name="taskAssigned"
                valuePropName="checked"
                label="New Task Assigned"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="taskUpdated"
                valuePropName="checked"
                label="Task Updated (status, deadline, priority)"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="taskOverdue"
                valuePropName="checked"
                label="Task Overdue Reminder"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="digestEnabled"
                valuePropName="checked"
                label="Daily Email Digest"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="digestHour"
                label="Digest Send Time"
                extra="Time of day to send daily summary emails to users."
              >
                <Input placeholder="e.g. 08:00" />
              </Form.Item>

              <Form.Item
                name="channels"
                label="Default Notification Channels"
              >
                <Select
                  mode="multiple"
                  options={notificationChannels}
                  placeholder="Select default channels"
                />
              </Form.Item>

              <Space style={{ marginTop: 8 }}>
                <Button
                  type="primary"
                  loading={savingNotifications}
                  onClick={handleSaveNotifications}
                >
                  Save Notification Settings
                </Button>
              </Space>
            </Form>
          </TabPane>

          {/* ⚙️ SYSTEM SETTINGS */}
          <TabPane tab="System" key="system">
            <Form
              layout="vertical"
              form={systemForm}
              initialValues={{
                allowExternalUsers: true,
                requireStrongPasswords: true,
                autoAssignTasks: false,
              }}
            >
              <Form.Item
                name="allowExternalUsers"
                valuePropName="checked"
                label="Allow External Contractors"
                extra="If disabled, admins cannot create users with 'external' role."
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="requireStrongPasswords"
                valuePropName="checked"
                label="Require Strong Passwords"
                extra="Minimum length and complexity rules will be enforced."
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="autoAssignTasks"
                valuePropName="checked"
                label="Enable Auto Assignment (Future)"
                extra="This will later power rule-based task assignment."
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="frontendUrl"
                label="Frontend URL"
                extra="Base URL of the web app (used for emails, links, etc.)"
              >
                <Input placeholder="https://app.saypeace.example" />
              </Form.Item>

              <Form.Item
                name="apiBaseUrl"
                label="API Base URL"
                extra="Base URL for backend API calls."
              >
                <Input placeholder="https://api.saypeace.example" />
              </Form.Item>

              <Space style={{ marginTop: 8 }}>
                <Button
                  type="primary"
                  loading={savingSystem}
                  onClick={handleSaveSystem}
                >
                  Save System Settings
                </Button>
              </Space>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default AdminSettingsPage;
