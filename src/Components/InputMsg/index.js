import React from "react";

import { Input, Button, Space } from "antd";
import "./index.css";

const InputMsg = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input
        value={newMessage}
        onChange={(click) => setNewMessage(click.target.value)}
        placeholder="type your message"
        className="input"
      />

      <Button className="btn" type="primary" onClick={handleSendMessage}>
        Send Message
      </Button>
    </Space>
  );
};

export default InputMsg;
