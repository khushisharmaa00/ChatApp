import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import "./register.css";
import { collection, addDoc } from "firebase/firestore";
import { notification } from "antd";
// import Cookies from "js-cookie";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; // user object
      console.log("User registered:", user);
      await addDoc(collection(firestore, "ChatApp"), {
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });
      // Cookies.set("authToken", user.accessToken, { expires: 7 });
      // Show success notification
      notification.success({
        message: "Signup Successful",
        description: "You have successfully registered. Please log in.",
        placement: "topRight",
      });

      // Redirect to login page
      // Stop loader
      navigate("/login");
    } catch (error) {
      console.error("Error registering user or saving data:", error);
      if (error.code === "auth/email-already-in-use") {
        notification.error({
          message: "Email Already Registered",
          description: "This email is already associated with an account.",
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Signup Failed",
          description: error.message,
          placement: "topRight",
        });
      }

      setLoading(false);
      // Stop loading
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
            {loading ? "Signing Up..." : "Sign Up"}
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
