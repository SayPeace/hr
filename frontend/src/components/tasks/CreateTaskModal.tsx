import { type FC, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Typography,
} from "antd";
import type { TaskPriority } from "../../types/task";
import dayjs, { Dayjs } from "dayjs";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Dragger } = Upload;
const { Text } = Typography;

export type AssigneeRole = "internal" | "external";

export interface CreateTaskFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  assigneeName: string;
  assigneeRole: AssigneeRole;
  dueDate: Dayjs;
  tags?: string[];
}

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (values: CreateTaskFormValues) => void;
  assignees: { value: string; label: string }[];
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({
  open,
  onClose,
  onCreate,
  assignees,
}) => {
  const [form] = Form.useForm<CreateTaskFormValues>();
  const [fileList, setFileList] = useState<any[]>([]); // UI-only for now

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
      form.resetFields();
      setFileList([]);
      onClose();
    } catch {
      // validation errors are shown automatically
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  return (
    <Modal
      title="Create New Task"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create Task"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          priority: "medium",
          assigneeRole: "internal",
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a task title" }]}
        >
          <Input placeholder="e.g. Prepare monthly report" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter a task description" },
          ]}
        >
          <TextArea rows={3} placeholder="Describe the task in detail..." />
        </Form.Item>

        <Form.Item
          label="Assignee"
          name="assigneeName"
          rules={[{ required: true, message: "Please select an assignee" }]}
        >
          <Select
            showSearch
            placeholder="Select user"
            options={assignees}
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          label="Assignee Type"
          name="assigneeRole"
          rules={[{ required: true, message: "Please select assignee type" }]}
        >
          <Select
            options={[
              { value: "internal", label: "Internal" },
              { value: "external", label: "External" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Please select a priority" }]}
        >
          <Select
            options={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please select a due date" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Add tags (e.g. urgent, client-work)"
          />
        </Form.Item>

        <Form.Item label="Attachments">
          <Dragger
            multiple
            fileList={fileList}
            beforeUpload={() => false} // prevent auto upload
            onChange={({ fileList: newList }) => setFileList(newList)}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag files to this area to attach
            </p>
            <Text type="secondary" style={{ fontSize: 12 }}>
              UI only for now — files won&apos;t be uploaded until backend is
              connected.
            </Text>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};
