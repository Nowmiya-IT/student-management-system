import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  // 🔐 Login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // 📦 Student data
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );

  // 📝 Form
  const [form, setForm] = useState({
    name: "",
    age: "",
    dept: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // ✏️ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add / Update
  const handleAdd = () => {
    if (!form.name || !form.age || !form.dept) {
      alert("Fill all fields");
      return;
    }

    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = form;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, form]);
    }

    setForm({ name: "", age: "", dept: "" });
  };

  // ✏️ Edit
  const editStudent = (index) => {
    setForm(students[index]);
    setEditIndex(index);
  };

  // ❌ Delete
  const deleteStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div className="app-container">
          <h2>Student Management System</h2>

          {/* FORM */}
          <div className="form">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />

            <input
              name="dept"
              placeholder="Department"
              value={form.dept}
              onChange={handleChange}
            />

            <button onClick={handleAdd}>
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          {/* SEARCH */}
          <input
            className="search"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* TABLE */}
          <table>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students
                .filter((s) =>
                  s.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((s, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{s.name}</td>
                    <td>{s.age}</td>
                    <td>{s.dept}</td>
                    <td>
                      <button onClick={() => editStudent(i)}>
                        <FaEdit />
                      </button>

                      <button onClick={() => deleteStudent(i)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* LOGOUT */}
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default App;

