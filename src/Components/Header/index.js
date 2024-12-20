import React from "react";
import { Layout, Typography } from "antd";
import "./index.css";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <Header className="header">
      <Title level={3} className="header-title">
        Chat App
      </Title>
    </Header>
  );
};

export default AppHeader;
