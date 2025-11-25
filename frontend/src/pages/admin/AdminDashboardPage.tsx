import { Card, Col, Row, Statistic, Typography } from "antd";

const { Title } = Typography;

const AdminDashboardPage = () => {
  return (
    <>
      <Title level={3}>Admin Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}><Card><Statistic title="Total Tasks" value={120} /></Card></Col>
        <Col xs={24} md={6}><Card><Statistic title="Active Tasks" value={45} /></Card></Col>
        <Col xs={24} md={6}><Card><Statistic title="Overdue Tasks" value={8} /></Card></Col>
        <Col xs={24} md={6}><Card><Statistic title="Users" value={32} /></Card></Col>
      </Row>
    </>
  );
};

export default AdminDashboardPage;
