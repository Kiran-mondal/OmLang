'use client';

import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('Show "Hlw"');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    // Basic Web Parser for OmLang
    const lines = code.split('\n');
    let currentOutput = '';

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      // Look for the "Show" command
      if (trimmedLine.startsWith('Show ')) {
        const startQuote = trimmedLine.indexOf('"');
        const endQuote = trimmedLine.lastIndexOf('"');
        
        // Extract text between quotes
        if (startQuote !== -1 && endQuote !== -1 && startQuote < endQuote) {
          const textToPrint = trimmedLine.substring(startQuote + 1, endQuote);
          currentOutput += textToPrint + '\n';
        } else {
          currentOutput += `Syntax Error: Missing quotes in '${trimmedLine}'\n`;
        }
      } else if (trimmedLine !== '') {
        currentOutput += `Error: Unknown command -> '${trimmedLine}'\n`;
      }
    });

    // Update the terminal screen
    setOutput(currentOutput || 'No output.');
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
            rows="8"
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
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ▶ Run Code
        </button>

        {/* NEW: Terminal Output Section */}
        <div style={{ maxWidth: '800px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem', color: '#888' }}>Terminal Output</label>
          <div style={{
            backgroundColor: '#0d1117',
            color: '#e6edf3',
            padding: '15px',
            border: '1px solid #30363d',
            borderRadius: '8px',
            minHeight: '120px',
            whiteSpace: 'pre-wrap', // Keeps the line breaks
            fontFamily: 'monospace'
          }}>
            {output}
          </div>
        </div>
      </main>
    </div>
  );
}
