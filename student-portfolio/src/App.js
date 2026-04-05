import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', course: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:3000/student/view')
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editId) {
      axios.put(`http://localhost:3000/student/update/${editId}`, form)
        .then(() => {
          setEditId(null);
          setForm({ name: '', email: '', course: '' });
          fetchStudents();
        });
    } else {
      axios.post('http://localhost:3000/student/add', form)
        .then(() => {
          setForm({ name: '', email: '', course: '' });
          fetchStudents();
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/student/delete/${id}`)
      .then(() => fetchStudents());
  };

  const handleEdit = (s) => {
    setForm({ name: s.name, email: s.email, course: s.course });
    setEditId(s._id);
  };

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1>🎓 Student Hub</h1>
        <p>Manage student records efficiently</p>
      </div>

      <div style={styles.grid}>

        {/* FORM */}
        <div style={styles.formCard}>
          <h2>{editId ? "Edit Student" : "New Student"}</h2>

          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" />
          <input name="course" value={form.course} onChange={handleChange} placeholder="Course" />

          <button onClick={handleSubmit}>
            {editId ? "Update" : "Add Student"}
          </button>
        </div>

        {/* LIST */}
        <div style={styles.listCard}>
          <h2>All Students</h2>

          {students.length === 0 && <p>No students found</p>}

          {students.map(s => (
            <div key={s._id} style={styles.card}>
              <div>
                <h3>{s.name}</h3>
                <p>{s.email}</p>
                <span>{s.course}</span>
              </div>

              <div>
                <button style={styles.editBtn} onClick={() => handleEdit(s)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(s._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    minHeight: '100vh',
    padding: '20px',
    color: '#fff',
    fontFamily: 'Arial'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '20px'
  },
  formCard: {
    background: '#ffffff',
    color: '#000',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  listCard: {
    background: '#ffffff',
    color: '#000',
    padding: '20px',
    borderRadius: '12px'
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f1f5f9',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '8px'
  },
  editBtn: {
    marginRight: '10px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px'
  },
  deleteBtn: {
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px'
  }
};

export default App;