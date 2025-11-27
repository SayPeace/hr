import React from "react";
import {
  Badge,
  Button,
  Dropdown,
  List,
  Space,
  Typography,
} from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useUserNotifications } from "../../hooks/useUserNotifications";

const { Text } = Typography;

export const NotificationBell: React.FC = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
  } = useUserNotifications();

  const dropdownContent = (
    <div style={{ width: 320, maxWidth: "100%" }}>
      <Space
        style={{
          padding: "8px 12px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text strong>Notifications</Text>
        {notifications.length > 0 && (
          <Button type="link" size="small" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </Space>

      {notifications.length === 0 ? (
        <div style={{ padding: "8px 12px" }}>
          <Text type="secondary">No notifications</Text>
        </div>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={notifications}
          style={{ maxHeight: 320, overflowY: "auto" }}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              style={{
                background: item.isRead ? "#fff" : "#f5f5f5",
                cursor: "pointer",
                padding: "8px 12px",
              }}
              onClick={() => markAsRead(item.id)}
              actions={[
                <Button
                  key="clear"
                  type="link"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotification(item.id);
                  }}
                >
                  Clear
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Space>
                    <Text strong>{item.title}</Text>
                    {!item.isRead && (
                      <Badge
                        status="processing"
                        text="New"
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </Space>
                }
                description={
                  <>
                    <Text>{item.message}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </Text>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );

  return (
    <Dropdown
      dropdownRender={() => dropdownContent}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Badge count={unreadCount} size="small">
        <Button
          type="text"
          icon={<BellOutlined />}
          style={{ fontSize: 18 }}
        />
      </Badge>
    </Dropdown>
  );
};
