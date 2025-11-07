// src/Components/UserPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserEmployees from "./UserEmployees";

function parseJwt(token) {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export default function UserPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // no token -> go to login
      navigate("/login", { replace: true });
      return;
    }

    const payload = parseJwt(token);
    const isExpired = payload?.exp && Date.now() >= payload.exp * 1000;
    if (!payload || isExpired) {
      // expired/invalid -> clear and go to login
      localStorage.clear();
      navigate("/login", { replace: true });
      return;
    }

    // if user is actually ADMIN, send them to admin page
    const effectiveRole = (payload.role || localStorage.getItem("role") || "").toUpperCase();
    if (effectiveRole === "ADMIN") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const username = localStorage.getItem("username") || "";
  const role = (localStorage.getItem("role") || "").toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>User Interface</h1>
      <p>
        Welcome, <b>{username}</b>! You are logged in as <b>{role}</b>.
      </p>

      <button
        onClick={handleLogout}
        style={{ padding: "8px 16px", marginBottom: 16 }}
      >
        Logout
      </button>

      {/* Employees Read-only */}
      <UserEmployees />
    </div>
  );
}
