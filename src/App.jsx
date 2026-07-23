import { useState } from 'react';
import StudentList from './generated/StudentList.jsx';
import ExamList from './generated/ExamList.jsx';

const TABS = ["Student","Exam"];

export default function App() {
  const [tab, setTab] = useState(TABS[0]);
  const components = { Student: StudentList, Exam: ExamList };
  const Active = components[tab];

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 700, margin: '2rem auto' }}>
      <h1>School Manager</h1>
      <nav style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ fontWeight: t === tab ? 'bold' : 'normal' }}>{t}</button>
        ))}
      </nav>
      <Active />
    </div>
  );
}
