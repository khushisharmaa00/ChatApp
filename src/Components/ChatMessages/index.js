import React from "react";

import { List } from "antd";

import "./index.css";

const ChatMessages = ({ messages }) => {
  return (
    <List
      header={<div> Recent Messages</div>}
      bordered
      dataSource={messages}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      className="chat-messages"
    />
  );
};

export default ChatMessages;