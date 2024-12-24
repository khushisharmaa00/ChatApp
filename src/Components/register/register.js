import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import "./register.css";
import { collection, addDoc } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; // Get the user object
      console.log("User registered:", user);

      // Add the user data to Firestore
      await addDoc(collection(firestore, "ChatApp"), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });

      console.log("User data saved to Firestore successfully");
    } catch (error) {
      console.error("Error registering user or saving data:", error);
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleRegister}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered ? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
export default Register;
