import React, { useState, useEffect } from "react";
import { Input, List, Button } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

const SearchUsers = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch all registered users from Firestore
    const fetchUsers = async () => {
      const usersRef = collection(firestore, "users");
      const snapshot = await getDocs(usersRef);
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
      setFilteredUsers(usersList);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on the search term
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  return (
    <div>
      <Input
        placeholder="Search for users by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <List
        bordered
        dataSource={filteredUsers}
        renderItem={(user) => (
          <List.Item>
            <span>
              {user.name} ({user.email})
            </span>
            <Button type="primary" onClick={() => onSelectUser(user)}>
              Message
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchUsers;
