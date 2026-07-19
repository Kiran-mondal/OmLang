'use client';

import { useState } from 'react';

export default function Home() {
  // আমি ডিফল্ট কোডটি আপনার ম্যাথ লজিক দিয়ে আপডেট করে দিয়েছি
  const [code, setCode] = useState('a = 3\nb = 2\nr = a + b\nshow r');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    const lines = code.split('\n');
    let currentOutput = '';
    
    // এটি OmLang-এর র‍্যাম (RAM) বা মেমোরি হিসেবে কাজ করবে
    let memory = {}; 

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      // ১. Variable Assignment চেক করা (যেমন: a = 3 বা r = a + b)
      const assignmentMatch = trimmedLine.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      if (assignmentMatch) {
        const varName = assignmentMatch[1];
        let expression = assignmentMatch[2];

        // এক্সপ্রেশনের ভেতরের ভেরিয়েবলগুলোকে তাদের মান দিয়ে রিপ্লেস করা
        Object.keys(memory).forEach((key) => {
          const regex = new RegExp(`\\b${key}\\b`, 'g');
          expression = expression.replace(regex, memory[key]);
        });

        try {
          // ম্যাথ ক্যালকুলেশন করা
          // eslint-disable-next-line no-new-func
          const result = new Function(`return ${expression}`)();
          memory[varName] = result;
        } catch (e) {
          currentOutput += `Math Error in -> '${trimmedLine}'\n`;
        }
        return;
      }

      // ২. Show কমান্ড চেক করা
      const showMatch = trimmedLine.match(/^show\s+(.+)$/i);
      if (showMatch) {
        const content = showMatch[1].trim();

        // চেক করা এটি কি কোটেশনের ভেতর আছে ("String") নাকি ভেরিয়েবল?
        const stringMatch = content.match(/^"([^"]*)"$/);
        
        if (stringMatch) {
          // কোটেশনের ভেতর থাকলে হুবহু প্রিন্ট করবে
          currentOutput += stringMatch[1] + '\n';
        } else if (memory.hasOwnProperty(content)) {
          // ভেরিয়েবল হলে তার মান (Value) প্রিন্ট করবে
          currentOutput += memory[content] + '\n';
        } else {
          currentOutput += `Error: Undefined variable -> '${content}'\n`;
        }
        return;
      }

      // ৩. যদি উপরের কোনো রুল না মেলে
      currentOutput += `Error: Unknown command -> '${trimmedLine}'\n`;
    });

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
