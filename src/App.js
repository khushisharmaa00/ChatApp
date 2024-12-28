import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Layout } from "antd";
import AppHeader from "./Components/Header";
import InputMsg from "./Components/InputMsg";
import SearchUsers from "./Components/Search";
import ChatMessages from "./Components/ChatMessages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./Components/register/register";
import Login from "./Components/login/login";
import Logout from "./Components/logout";
import { auth } from "./Components/firebase";
import { firestore } from "./Components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import Cookies from "js-cookie";

const { Content, Footer } = Layout;

const App = () => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [directMessages, setDirectMessages] = useState([]);

  useEffect(() => {
    const userToken = Cookies.get("authToken");

    if (userToken) {
      setUser({ accessToken: userToken });
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        Cookies.set("authToken", currentUser.accessToken, { expires: 7 });
        setUser(currentUser);
      } else {
        Cookies.remove("authToken");
        setUser(null);
      }
    });

    const messagesQuery = query(
      collection(firestore, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const conversationId =
        user?.uid < selectedUser.uid
          ? `${user?.uid}_${selectedUser.uid}`
          : `${selectedUser.uid}_${user?.uid}`;
      const directMessagesQuery = query(
        collection(firestore, "directMessages"),
        where("conversationId", "==", conversationId),
        orderBy("createdAt", "asc")
      );

      const unsubscribeDirectMessages = onSnapshot(
        directMessagesQuery,
        (snapshot) => {
          const fetchedDirectMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDirectMessages(fetchedDirectMessages);
        }
      );

      return () => unsubscribeDirectMessages();
    }
  }, [selectedUser, user]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      if (selectedUser) {
        // Sending a private message
        const conversationId =
          user?.uid < selectedUser.uid
            ? `${user?.uid}_${selectedUser.uid}`
            : `${selectedUser.uid}_${user?.uid}`;
        try {
          await addDoc(collection(firestore, "directMessages"), {
            text: newMessage,
            senderId: user?.uid,
            recipientId: selectedUser.uid,
            conversationId,
            createdAt: new Date(),
          });
          setNewMessage("");
        } catch (error) {
          console.error("Error sending private message:", error);
        }
      } else {
        // Sending a public message
        try {
          await addDoc(collection(firestore, "messages"), {
            text: newMessage,
            userId: user?.uid,
            email: user?.email || "Anonymous",
            createdAt: new Date(),
          });
          setNewMessage("");
        } catch (error) {
          console.error("Error sending public message:", error);
        }
      }
    }
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader user={user} />
        <Content className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <div style={{ display: "flex", gap: "16px" }}>
                    <SearchUsers onSelectUser={setSelectedUser} />
                    <div style={{ flex: 1 }}>
                      {selectedUser ? (
                        <>
                          <h3>Chat with {selectedUser.name}</h3>
                          <ChatMessages
                            messages={directMessages.map(
                              (msg) =>
                                `${
                                  msg.senderId === user?.uid
                                    ? "You"
                                    : selectedUser.name
                                }: ${msg.text}`
                            )}
                          />
                        </>
                      ) : (
                        <>
                          <h3>Public Chat</h3>
                          <ChatMessages
                            messages={messages.map(
                              (msg) =>
                                `${msg.email || "Anonymous"}: ${msg.text}`
                            )}
                          />
                        </>
                      )}
                      <InputMsg
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        handleSendMessage={handleSendMessage}
                      />
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
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
