// src/Components/EmployeesReadOnly.jsx
import { useEffect, useState } from "react";
import api from "../api";

export default function EmployeesReadOnly() {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/api/employees"); // GET only
        setRows(res.data || []);
      } catch (err) {
        setMsg("Failed to load employees");
      }
    }
    load();
  }, []);

  // If your DB uses CHAR columns, you may see trailing spaces — trim for display:
  const tidy = (s) => (typeof s === "string" ? s.trim() : s);

  return (
    <div style={{ maxWidth: 900, margin: "1rem auto" }}>
      <h2>Employees</h2>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Department</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{tidy(r.name)}</td>
              <td>{tidy(r.email)}</td>
              <td>{tidy(r.department)}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: "center" }}>No employees found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
