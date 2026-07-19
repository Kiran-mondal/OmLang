'use client';

import { useState } from 'react';
import { runOmLang } from '../lib/omlang/Engine'; // Importing the core engine

export default function Home() {
  // Default code showing Intermediate Features (Variables, Math, Symbols, Conditions, Matrix)
  const defaultCode = `// OmLang Basic to Intermediate Test
a = 15
b = 10

// Math and Logic using standard symbols
if a > b {
    show "A is greater than B"
}
else {
    show "B is greater or equal"
}

// Matrix Declaration
matrix M = [10, 20 | 30, 40]
show M
`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');

  const handleRun = () => {
    // Calling the external Engine to process the code
    const result = runOmLang(code);
    setOutput(result);
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
            rows="15"
            style={{
              width: '100%',
              maxWidth: '800px',
              backgroundColor: '#000',
              color: '#4ade80',
              padding: '15px',
              border: '1px solid #333',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              resize: 'vertical'
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
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ▶ Run Code
        </button>

        <div style={{ maxWidth: '800px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem', color: '#888' }}>Terminal Output</label>
          <div style={{
            backgroundColor: '#0d1117',
            color: '#e6edf3',
            padding: '15px',
            border: '1px solid #30363d',
            borderRadius: '8px',
            minHeight: '120px',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace'
          }}>
            {output}
          </div>
        </div>
      </main>
    </div>
  );
}
