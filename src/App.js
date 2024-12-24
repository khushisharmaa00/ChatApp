import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Layout } from "antd";
import AppHeader from "./Components/Header";
import InputMsg from "./Components/InputMsg";
import ChatMessages from "./Components/ChatMessages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./Components/register/register";
import Login from "./Components/login/login";
import { auth } from "./Components/firebase";
import { onAuthStateChanged } from "firebase/auth";

const { Content, Footer } = Layout;

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user when they log in or log out
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content className="app-content">
          <Routes>
            {/* Route for the main Chat App */}
            <Route
              path="/"
              element={
                user ? (
                  <>
                    <ChatMessages messages={messages} />
                    <InputMsg
                      newMessage={newMessage}
                      setNewMessage={setNewMessage}
                      handleSendMessage={handleSendMessage}
                    />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Route for the Register page */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Content>

        <Footer className="app-footer">
          Chat App ©2024
          <p>
            Privacy Policy {" | "}
            Terms of Service
          </p>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
