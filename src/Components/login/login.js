import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import "./login.css";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { notification } from "antd";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To display error messages
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const userToken = Cookies.get("authToken");
    if (userToken) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      notification.success({
        message: "Login Successful",
        description: "Welcome back!",
        placement: "topRight",
      });

      setLoading(false); // Stop loader
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password. Please try again.");

      notification.error({
        message: "Login Failed",
        description: "Invalid email or password. Please try again.",
        placement: "topRight",
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h3>Login</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
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
            {loading ? "Logging In..." : "Login"}
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
