import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function StudentList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [error, setError] = useState('');

  const load = () => {
    fetch(`${API_URL}/api/students`)
      .then((r) => r.json())
      .then(setItems)
      .catch((err) => setError(err.message));
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { setForm({}); load(); } else { setError((await res.json()).error); }
  };

  const remove = async (id) => {
    await fetch(`${API_URL}/api/students/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h2>Students</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={create}>
        <input type="text" placeholder="name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="number" placeholder="grade" value={form.grade || ''} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
        <label><input type="checkbox" checked={!!form.enrolled} onChange={(e) => setForm({ ...form, enrolled: e.target.checked })} /> enrolled</label>
        <button type="submit">Add Student</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.grade} — {item.enrolled}
            <button onClick={() => remove(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
