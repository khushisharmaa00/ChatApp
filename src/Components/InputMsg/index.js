import React from "react";
import { Input, Button } from "antd";
import "./index.css";

const InputMsg = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    // <Space direction="vertical" style={{ width: "100%" }}>
    //   <Input
    //     value={newMessage}
    //     onChange={(click) => setNewMessage(click.target.value)}
    //     placeholder="type your message"
    //     className="input"
    //   />
    <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onPressEnter={handleSendMessage} // Send on Enter key press
        placeholder="Type your message..."
      />

      <Button className="btn" type="primary" onClick={handleSendMessage}>
        Send Message
      </Button>
      {/* </Space> */}
    </div>
  );
};

export default InputMsg;
