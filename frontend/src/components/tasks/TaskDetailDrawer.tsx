import { type FC, useEffect, useState } from "react";
import {
  Drawer,
  Descriptions,
  Tag,
  Typography,
  Space,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Timeline,
  Divider,
  message,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { TaskStatusTag } from "./TaskStatusTag";
import { TaskPriorityTag } from "./TaskPriorityTag";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";
import type { AdminTask } from "../../mock/adminTasks";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

type Mode = "admin" | "user";

interface TaskDetailDrawerProps {
  open: boolean;
  task: (Task | AdminTask) | null;
  onClose: () => void;
  mode?: Mode;
  onUpdateTask?: (task: AdminTask) => void; // only used in admin mode
}

interface EditableFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Dayjs;
}

export const TaskDetailDrawer: FC<TaskDetailDrawerProps> = ({
  open,
  task,
  onClose,
  mode = "user",
  onUpdateTask,
}) => {
  const [form] = Form.useForm<EditableFormValues>();
  const [saving, setSaving] = useState(false);

  // fake history (UI only for now)
  const historyItems = task
    ? [
        {
          time: dayjs(task.createdAt).format("YYYY-MM-DD HH:mm"),
          label: "Task created",
        },
        {
          time: dayjs(task.dueDate).format("YYYY-MM-DD HH:mm"),
          label: "Due date set",
        },
      ]
    : [];

  useEffect(() => {
    if (task && mode === "admin") {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: dayjs(task.dueDate),
      });
    } else {
      form.resetFields();
    }
  }, [task, mode, form]);

  const handleSave = async () => {
    if (!task || mode !== "admin" || !("assigneeName" in task)) return;
    if (!onUpdateTask) return;

    try {
      setSaving(true);
      const values = await form.validateFields();

      const updated: AdminTask = {
        ...(task as AdminTask),
        title: values.title,
        description: values.description,
        priority: values.priority,
        status: values.status,
        dueDate: values.dueDate.toISOString(),
      };

      onUpdateTask(updated);
      message.success("Task updated (mock)");
    } catch {
      // validation error
    } finally {
      setSaving(false);
    }
  };

  const isAdmin = mode === "admin";

  return (
    <Drawer
      title="Task Details"
      open={open}
      width={480}
      onClose={onClose}
      destroyOnClose
      extra={
        isAdmin && task ? (
          <Space>
            <Button danger>Cancel Task</Button>
            <Button type="primary" loading={saving} onClick={handleSave}>
              Save Changes
            </Button>
          </Space>
        ) : null
      }
    >
      {!task ? (
        <Text type="secondary">No task selected</Text>
      ) : (
        <>
          {/* Top summary */}
          <Space
            direction="vertical"
            style={{ width: "100%", marginBottom: 16 }}
          >
            {isAdmin ? (
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please enter a title" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Please enter a description" },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>

                <Space
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16,
                  }}
                >
                  <Form.Item
                    label="Status"
                    name="status"
                    style={{ flex: 1, minWidth: 140 }}
                  >
                    <Select
                      options={[
                        { value: "not_started", label: "Not Started" },
                        { value: "in_progress", label: "In Progress" },
                        { value: "completed", label: "Completed" },
                        { value: "cancelled", label: "Cancelled" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Priority"
                    name="priority"
                    style={{ flex: 1, minWidth: 140 }}
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
                    style={{ flex: 1, minWidth: 200 }}
                  >
                    <DatePicker showTime style={{ width: "100%" }} />
                  </Form.Item>
                </Space>
              </Form>
            ) : (
              <>
                <Title level={4} style={{ marginBottom: 0 }}>
                  {task.title}
                </Title>
                <Paragraph>{task.description}</Paragraph>
              </>
            )}

            <Space wrap>
              <TaskStatusTag status={task.status} />
              <TaskPriorityTag priority={task.priority} />
              {"assigneeName" in task && (
                <Tag>{task.assigneeName}</Tag>
              )}
            </Space>
          </Space>

          <Descriptions
            size="small"
            column={1}
            style={{ marginBottom: 16 }}
          >
            {"assigneeName" in task && (
              <Descriptions.Item label="Assignee">
                {task.assigneeName}
              </Descriptions.Item>
            )}
            {"assigneeRole" in task && (
              <Descriptions.Item label="Assignee Type">
                {task.assigneeRole === "internal" ? "Internal" : "External"}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Due Date">
              {new Date(task.dueDate).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(task.createdAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* Comments placeholder (UI only for now) */}
          <Title level={5}>Comments</Title>
          <Text type="secondary">
            Comments UI will be wired when backend is ready. For now this is a
            placeholder.
          </Text>

          <Divider />

          {/* History timeline */}
          <Title level={5}>Activity Timeline</Title>
          <Timeline
            items={historyItems.map((h) => ({
              children: (
                <Space direction="vertical" size={0}>
                  <Text>{h.label}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {h.time}
                  </Text>
                </Space>
              ),
            }))}
          />
        </>
      )}
    </Drawer>
  );
};
