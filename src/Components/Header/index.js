import React from "react";
import { Layout, Typography } from "antd";
import "./index.css";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  return (
    <Header className="header">
      <Link to="/register">Sign Up</Link>
      <Title level={3} className="header-title">
        Chat App
      </Title>
    </Header>
  );
};

export default AppHeader;
