import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import "./login.css";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom"; // To redirect after login

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully");
      navigate("/"); // Redirect to the chat page after successful login
    } catch (error) {
      setError("Invalid email or password"); // Display error message on failure
      console.log("Login error:", error);
    }
  };

  return (
    <div className="login-form">
      <h3>Login</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email Address</label>
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
            Login
          </button>
        </div>
      </form>
      <p className="forgot-password text-right">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
