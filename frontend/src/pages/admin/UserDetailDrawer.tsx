import { type FC, useMemo } from "react";
import {
    Drawer,
    Typography,
    Descriptions,
    Tag,
    Row,
    Col,
    Statistic,
    Table,
} from "antd";
import type { AdminUser } from "../../mock/adminUsers";
import type { TableProps } from "antd";
import type { AdminTask } from "../../mock/adminTasks";
import { TaskPriorityTag } from "../../components/tasks/TaskPriorityTag";
import { TaskStatusTag } from "../../components/tasks/TaskStatusTag";

const { Title, Text } = Typography;

interface UserDetailDrawerProps {
    open: boolean;
    user: AdminUser | null;
    tasks: AdminTask[];
    onClose: () => void;
}

export const UserDetailDrawer: FC<UserDetailDrawerProps> = ({
    open,
    user,
    tasks,
    onClose,
}) => {
    const stats = useMemo(() => {
        if (!user) {
            return {
                total: 0,
                completed: 0,
                inProgress: 0,
                overdue: 0,
            };
        }

        const now = Date.now();

        const total = tasks.length;
        const completed = tasks.filter((t) => t.status === "completed").length;
        const inProgress = tasks.filter((t) => t.status === "in_progress").length;
        const overdue = tasks.filter((t) => {
            if (!t.dueDate) return false; // defensive check
            const due = new Date(t.dueDate).getTime();
            const isDone =
                t.status === "completed" || t.status === "cancelled";
            return due < now && !isDone;
        }).length;

        return { total, completed, inProgress, overdue };
    }, [user, tasks]);

    const columns: TableProps<AdminTask>["columns"] = [
        {
            title: "Task",
            dataIndex: "title",
            key: "title",
            render: (text) => (
                <Text style={{ maxWidth: 220 }} ellipsis>
                    {text}
                </Text>
            ),
            width: 260,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => <TaskStatusTag status={status} />,
            width: 140,
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            render: (priority) => <TaskPriorityTag priority={priority} />,
            width: 120,
        },
        {
            title: "Due",
            dataIndex: "dueDate",
            key: "dueDate",
            // ✅ value might be string | undefined → handle safely
            render: (value?: string) =>
                value ? new Date(value).toLocaleDateString() : "-",
            width: 140,
        },
    ];

    return (
        <Drawer
            title="User Details"
            open={open}
            width={520}
            onClose={onClose}
            destroyOnClose
        >
            {!user ? (
                <Text type="secondary">No user selected</Text>
            ) : (
                <>
                    <Title level={4} style={{ marginBottom: 0 }}>
                        {user.name}
                    </Title>
                    <Text type="secondary">{user.email}</Text>

                    <Descriptions
                        size="small"
                        column={1}
                        style={{ marginTop: 16, marginBottom: 16 }}
                    >
                        <Descriptions.Item label="Role">
                            {user.role === "admin" && <Tag color="geekblue">Admin</Tag>}
                            {user.role === "user" && <Tag color="green">Employee</Tag>}
                            {user.role === "external" && (
                                <Tag color="purple">External</Tag>
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Job Title">
                            {user.jobTitle || "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Department">
                            {user.department || "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Status">
                            {user.isActive ? (
                                <Tag color="green">Active</Tag>
                            ) : (
                                <Tag>Inactive</Tag>
                            )}
                        </Descriptions.Item>

                        <Descriptions.Item label="Created At">
                            {user.createdAt
                                ? new Date(user.createdAt).toLocaleString()
                                : "-"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Last Active">
                            {user.lastActiveAt
                                ? new Date(user.lastActiveAt).toLocaleString()
                                : "-"}
                        </Descriptions.Item>
                    </Descriptions>

                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col xs={12} sm={6}>
                            <Statistic title="Total Tasks" value={stats.total} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Statistic title="Completed" value={stats.completed} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Statistic title="In Progress" value={stats.inProgress} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Statistic title="Overdue" value={stats.overdue} />
                        </Col>
                    </Row>

                    <Title level={5} style={{ marginTop: 8 }}>
                        Task History
                    </Title>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        Showing tasks assigned to this user (mock data).
                    </Text>

                    <Table
                        style={{ marginTop: 8 }}
                        rowKey="id"
                        size="small"
                        columns={columns}
                        dataSource={tasks}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "max-content" }}
                    />
                </>
            )}
        </Drawer>
    );
};
