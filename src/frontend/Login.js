import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPage from "./admin";
import "./style/Login.css"; // sesuai tampilan gambar

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-left">
          <img src="/images/zingo.png" alt="zingo" className="zingo-img" />
        </div>
        <div className="login-right">
          <h2>Hello <strong>Admin</strong></h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <button className="btn login" onClick={() => navigate("/admin")}>
              Login
            </button>          <p className="signup-text">Belum punya akun? Daftar</p>
        </div>
      </div>
    </div>
  );
}