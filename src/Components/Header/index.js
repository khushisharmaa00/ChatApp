import React from "react";
import { Layout, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Firebase's signOut function
import { auth } from "../firebase"; // Firebase auth instance
import "./index.css";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = ({ user }) => {
  // Receive user prop
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Log the user out using Firebase's signOut method
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show error notification here
    }
  };

  return (
    <Header className="header">
      <Title level={3} className="header-title">
        Chat App
      </Title>
      {/* Conditionally render logout button if the user is logged in */}
      {user && (
        <Button
          type="primary"
          onClick={handleLogout}
          style={{ float: "right" }}
        >
          Logout
        </Button>
      )}
    </Header>
  );
};

export default AppHeader;
