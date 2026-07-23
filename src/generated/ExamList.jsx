import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ExamList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [error, setError] = useState('');

  const load = () => {
    fetch(`${API_URL}/api/exams`)
      .then((r) => r.json())
      .then(setItems)
      .catch((err) => setError(err.message));
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/exams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { setForm({}); load(); } else { setError((await res.json()).error); }
  };

  const remove = async (id) => {
    await fetch(`${API_URL}/api/exams/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h2>Exams</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={create}>
        <input type="text" placeholder="subject" value={form.subject || ''} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        <input type="date" placeholder="date" value={form.date || ''} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <button type="submit">Add Exam</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.subject} — {item.date}
            <button onClick={() => remove(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
