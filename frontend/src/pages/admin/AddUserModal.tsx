import type { FC } from "react";
import { Modal, Form, Input, Select, Switch } from "antd";
import type { AdminUserRole } from "../../mock/adminUsers";

const { Option } = Select;

export interface AddUserFormValues {
  name: string;
  email: string;
  role: AdminUserRole;
  jobTitle?: string;
  department?: string;
  isActive: boolean;
}

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (values: AddUserFormValues) => void;
}

export const AddUserModal: FC<AddUserModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [form] = Form.useForm<AddUserFormValues>();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
      form.resetFields();
      onClose();
    } catch {
      // validation errors shown automatically
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New User"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create User"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          role: "user",
          isActive: true,
        }}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input placeholder="e.g. Usman Umar Garba" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="e.g. user@saypeace.com" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="user">Employee</Option>
            <Option value="external">External</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Job Title" name="jobTitle">
          <Input placeholder="e.g. Operations Lead" />
        </Form.Item>

        <Form.Item label="Department" name="department">
          <Input placeholder="e.g. HR, Finance, Operations" />
        </Form.Item>

        <Form.Item
          label="Active"
          name="isActive"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};
