// app/page.jsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('Show "Hlw"');

  const handleRun = () => {
    alert("OmLang Web Compiler is coming soon! Your code: \n" + code);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1e1e1e', color: '#fff', padding: '2rem', fontFamily: 'monospace' }}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#4ade80' }}>OmLang Web IDE</h1>
        <p style={{ color: '#888', margin: '5px 0 0 0' }}>Write Once, Run Anywhere (Web, APK, Local)</p>
      </header>

      <main>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem' }}>main.om</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows="12"
            style={{
              width: '100%',
              maxWidth: '800px',
              backgroundColor: '#000',
              color: '#4ade80',
              padding: '15px',
              border: '1px solid #333',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>

        <button 
          onClick={handleRun}
          style={{
            backgroundColor: '#4ade80',
            color: '#000',
            padding: '10px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ▶ Run Code
        </button>
      </main>
    </div>
  );
}
