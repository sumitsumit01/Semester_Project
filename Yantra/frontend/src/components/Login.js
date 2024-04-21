
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      console.log("Login successful:", response.data);

      // Set token in local storage
      localStorage.setItem("token", response.data.token);

      alert("Login successful!");
      navigate("/admin/add-event");
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        backgroundColor: "#f4f4f4",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "300px",
        }}
      >
        <h2 style={{ color: "#333", textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ marginBottom: "5px", color: "#666" }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div>
            <label style={{ marginBottom: "5px", color: "#666" }}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#5cb85c",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              Login
            </button>
            <br />
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#5cb85c" }}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
