import "antd/dist/antd.css";
import React, { useState } from "react";
import "./App.css";
import { Layout } from "antd";
import AppHeader from "./Components/Header";
import InputMsg from "./Components/InputMsg";
import ChatMessages from "./Components/ChatMessages";

const { Content, Footer } = Layout;

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Content className="app-content">
        <ChatMessages messages={messages} />
        <InputMsg
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </Content>

      <Footer className="app-footer">
        Chat App ©2024
        <p>
          Privacy Policy {" | "}
          Terms of Service
        </p>
      </Footer>
    </Layout>
  );
};

export default App;
