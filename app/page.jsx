'use client';

import { useState } from 'react';
import { runOmLang } from '../lib/omlang/Engine';

export default function Home() {
  // ১. শুধুমাত্র সাধারণ একটি টেস্ট কোড রাখা হলো
  const [code, setCode] = useState('show "Hello OmLang!"');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    const result = runOmLang(code);
    setOutput(result);
  };

  return (
    <>
      {/* ২. গ্লোবাল CSS: এটি ব্রাউজারের চারপাশের সাদা বর্ডার বা মার্জিন পুরোপুরি মুছে ফেলবে */}
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          background-color: #121212; /* পুরো ব্যাকগ্রাউন্ড সম্পূর্ণ কালো */
          height: 100vh;
          overflow: hidden; /* মূল পেজের বাড়তি স্ক্রলিং পুরোপুরি বন্ধ */
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#121212', color: '#fff', fontFamily: 'monospace' }}>
        
        {/* ৩. Header & Run Button */}
        <header style={{ padding: '1rem 1.5rem', backgroundColor: '#1a1a1a', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, color: '#4ade80', fontSize: '1.5rem' }}>OmLang Web IDE</h1>
            <p style={{ color: '#888', margin: '2px 0 0 0', fontSize: '0.8rem' }}>Write Once, Run Anywhere</p>
          </div>
          <button 
            onClick={handleRun}
            style={{
              backgroundColor: '#4ade80',
              color: '#000',
              padding: '10px 24px',
              fontSize: '15px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          >
            ▶ Run Code
          </button>
        </header>

        {/* ৪. Main Workspace (Responsive Flexbox) */}
        <main style={{ display: 'flex', flexWrap: 'wrap', flex: 1, overflow: 'hidden' }}>
          
          {/* কোড লেখার জায়গা (Editor) */}
          <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #333', borderBottom: '1px solid #333' }}>
            <div style={{ padding: '8px 15px', backgroundColor: '#1a1a1a', color: '#888', fontSize: '0.9rem', borderBottom: '1px solid #333' }}>
              Code Editor
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#000',
                color: '#4ade80',
                padding: '15px',
                border: 'none',
                fontSize: '16px',
                outline: 'none',
                resize: 'none', // ইউজার যাতে বক্স টেনে বড়/ছোট করে লেআউট নষ্ট না করে
                fontFamily: 'monospace',
                overflowY: 'auto' // শুধুমাত্র কোড বড় হলে ভেতরে স্ক্রল হবে
              }}
            />
          </div>

          {/* আউটপুট দেখার জায়গা (Terminal) */}
          <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', backgroundColor: '#0d1117' }}>
            <div style={{ padding: '8px 15px', backgroundColor: '#1a1a1a', color: '#888', fontSize: '0.9rem', borderBottom: '1px solid #333' }}>
              Terminal Output
            </div>
            <div style={{
              flex: 1,
              padding: '15px',
              color: '#e6edf3',
              overflowY: 'auto', // শুধুমাত্র আউটপুট বড় হলে ভেতরে স্ক্রল হবে
              whiteSpace: 'pre-wrap',
              fontSize: '15px'
            }}>
              {output || '> Ready to compile...'}
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
