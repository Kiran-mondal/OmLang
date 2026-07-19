'use client';

import { useState } from 'react';
import { runOmLang } from '../lib/omlang/Engine';

export default function Home() {
  const [code, setCode] = useState('show "Hlw Kiran"');
  const [output, setOutput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleRun = () => {
    const result = runOmLang(code);
    setOutput('Compiling OmLang source...\nOptimizing AST...\n\n' + result);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'main.om',
          code: code
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setOutput(`\n--- CLOUD SYNC ---\n[Success] File saved to Neon DB at ${new Date().toLocaleTimeString()}\nSnippet ID: ${data.data.id}\n------------------\n\n` + output);
      } else {
        setOutput(`\n--- CLOUD SYNC ---\n[Error] ${data.error}\n------------------\n\n` + output);
      }
    } catch (error) {
      setOutput(`\n--- CLOUD SYNC ---\n[Error] Network failure. Could not connect to database.\n------------------\n\n` + output);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden selection:bg-[#1f6feb] selection:text-white">
      
      {/* Top Header Navigation */}
      <header className="flex items-center justify-between bg-[#010409] px-4 py-3 border-b border-[#30363d] text-sm">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-500 hidden sm:block"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500 hidden sm:block"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 hidden sm:block"></div>
          <span className="sm:ml-4 font-semibold text-gray-300 tracking-wider">OmLang Studio</span>
        </div>
        
        {/* Buttons: Added whitespace-nowrap and adjusted padding/text to fix mobile layout */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#363b42] px-3 py-1.5 rounded-md text-xs font-bold transition-all disabled:opacity-50 whitespace-nowrap"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            {isSaving ? 'Saving...' : 'Sync Cloud'}
          </button>

          <button 
            onClick={handleRun}
            className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm whitespace-nowrap"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>
            Run Code
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#010409] border-r border-[#30363d] flex flex-col hidden md:flex">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 tracking-widest uppercase">
            Explorer
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="px-2">
              <details className="group" open>
                <summary className="flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-[#161b22] rounded text-gray-300">
                  <svg className="w-4 h-4 text-gray-500 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  <svg className="w-4 h-4 text-[#4ade80]" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
                  omlang-project
                </summary>
                <div className="pl-6 mt-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2 px-2 py-1 text-sm bg-[#161b22] text-[#58a6ff] rounded border-l-2 border-[#58a6ff] cursor-pointer">
                    main.om
                  </div>
                </div>
              </details>
            </div>
          </div>
        </aside>

        {/* Center Code Editor & Bottom Terminal */}
        <div className="flex flex-1 flex-col min-w-0">
          
          <div className="flex bg-[#010409] border-b border-[#30363d]">
            <div className="px-4 py-2 bg-[#0d1117] border-t-2 border-[#58a6ff] text-sm text-gray-200 flex items-center gap-2">
              main.om
            </div>
          </div>

          <div className="flex-1 flex bg-[#0d1117] overflow-hidden relative">
            <div className="w-12 bg-[#0d1117] border-r border-[#30363d] text-right pr-2 py-4 font-mono text-sm text-gray-600 select-none hidden sm:block">
              {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="flex-1 bg-transparent text-[#e6edf3] font-mono text-[15px] leading-relaxed p-4 resize-none outline-none focus:ring-0 whitespace-pre"
            />
          </div>

          {/* Terminal Section (Profiler removed for clean UI) */}
          <div className="h-64 bg-[#010409] border-t border-[#30363d] flex flex-col">
            <div className="flex px-4 border-b border-[#30363d] gap-6 text-xs uppercase tracking-wider font-semibold text-gray-500">
              <div className="py-3 text-[#e6edf3] border-b-2 border-[#58a6ff]">
                Terminal Output
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
              <div className="text-[#a5d6ff] whitespace-pre-wrap">
                <span className="text-[#4ade80]">volt@desktop</span>:<span className="text-[#58a6ff]">~/omlang</span>$ om compile --release{'\n'}
                {output || 'Awaiting execution...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
