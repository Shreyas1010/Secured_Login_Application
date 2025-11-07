import { useEffect, useState } from "react";
import api from "../api";

export default function UserEmployees() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/api/employees").then(res => setRows(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "1rem auto" }}>
      <h2>Employees (Read-only)</h2>
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
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.department}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: "center" }}>No employees yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
