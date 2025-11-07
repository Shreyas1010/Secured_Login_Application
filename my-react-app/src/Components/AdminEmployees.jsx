import { useEffect, useState } from "react";
import api from "../api";

export default function AdminEmployees() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", department: "" });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const res = await api.get("/api/employees");
    setRows(res.data);
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const create = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/api/employees", form);
      setForm({ name: "", email: "", department: "" });
      setMsg("Created!");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Create failed");
    }
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setForm({ name: row.name, email: row.email, department: row.department });
  };

  const saveEdit = async () => {
    try {
      await api.put(`/api/employees/${editingId}`, form);
      setEditingId(null);
      setForm({ name: "", email: "", department: "" });
      setMsg("Updated!");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Update failed");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", email: "", department: "" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this employee?")) return;
    try {
      await api.delete(`/api/employees/${id}`);
      setMsg("Deleted!");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "1rem auto" }}>
      <h2>Employees (Admin CRUD)</h2>

      {/* create / edit form */}
      <form onSubmit={editingId ? (e)=>{e.preventDefault(); saveEdit();} : create}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, marginBottom: 12 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={onChange} required />
        {editingId ? (
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">Save</button>
            <button type="button" onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add</button>
        )}
      </form>

      {msg && <p style={{ color: "#555" }}>{msg}</p>}

      {/* table */}
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.department}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <button onClick={() => startEdit(r)}>Edit</button>
                <button onClick={() => remove(r.id)} style={{ background: "#ff4d4d", color: "#fff" }}>Delete</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan="5" style={{ textAlign: "center" }}>No employees yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
