'use client';

import { useState, useRef } from 'react';
import { runOmLang } from '../lib/omlang/Engine';

export default function Home() {
  // ১. মাল্টিপল ফাইল সিস্টেম (Array of Objects)
  const [files, setFiles] = useState([
    { name: 'main.om', code: 'show "Hello Kiran!"\n\n// Matrix Test\nmatrix M = [10, 20 | 30, 40]\nshow M' },
    { name: 'math.om', code: '// Variables and Math\na = 15\nb = 10\n\nif a > b {\n  show "A is greater"\n}' }
  ]);
  
  // বর্তমানে কোন ফাইলটি ওপেন আছে তার স্টেট
  const [activeFileName, setActiveFileName] = useState('main.om');
  const activeFile = files.find(f => f.name === activeFileName);

  const [output, setOutput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // স্ক্রল সিঙ্ক করার জন্য Refs (Syntax Highlighter এর জন্য)
  const textRef = useRef(null);
  const preRef = useRef(null);

  // কোড আপডেট করার ফাংশন
  const updateCode = (newCode) => {
    setFiles(files.map(f => f.name === activeFileName ? { ...f, code: newCode } : f));
  };

  // নতুন ফাইল তৈরি করার ফাংশন
  const addNewFile = () => {
    const newName = `file${files.length + 1}.om`;
    setFiles([...files, { name: newName, code: '' }]);
    setActiveFileName(newName);
  };

  // কাস্টম সিনট্যাক্স হাইলাইটার (রঙিন করার লজিক)
  const highlightCode = (code) => {
    if (!code) return '';
    let text = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Comments (Gray)
    text = text.replace(/(\/\/.*)/g, '<span style="color: #8b949e">$1</span>');
    // Strings (Light Blue)
    text = text.replace(/(&quot;.*?&quot;|".*?")/g, '<span style="color: #a5d6ff">$1</span>');
    // Keywords (Pink)
    text = text.replace(/\b(show|matrix|for|to|while|if|else)\b/g, '<span style="color: #ff7b72">$1</span>');
    // Numbers (Light Green)
    text = text.replace(/\b(\d+)\b/g, '<span style="color: #79c0ff">$1</span>');
    
    return text;
  };

  // স্ক্রল সিঙ্ক্রোনাইজেশন
  const handleScroll = () => {
    if (preRef.current && textRef.current) {
      preRef.current.scrollTop = textRef.current.scrollTop;
      preRef.current.scrollLeft = textRef.current.scrollLeft;
    }
  };

  const handleRun = () => {
    const result = runOmLang(activeFile.code);
    setOutput(`Compiling ${activeFileName}...\nOptimizing AST...\n\n` + result);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: activeFileName,
          code: activeFile.code
        })
      });
      const data = await response.json();
      if (response.ok) {
        setOutput(`\n--- CLOUD SYNC ---\n[Success] '${activeFileName}' saved to Neon DB at ${new Date().toLocaleTimeString()}\nSnippet ID: ${data.data.id}\n------------------\n\n` + output);
      } else {
        setOutput(`\n--- CLOUD SYNC ---\n[Error] ${data.error}\n------------------\n\n` + output);
      }
    } catch (error) {
      setOutput(`\n--- CLOUD SYNC ---\n[Error] Network failure.\n------------------\n\n` + output);
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
        
        <div className="flex items-center gap-2">
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#363b42] px-3 py-1.5 rounded-md text-xs font-bold transition-all disabled:opacity-50 whitespace-nowrap">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            {isSaving ? 'Saving...' : 'Sync Cloud'}
          </button>
          <button onClick={handleRun} className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm whitespace-nowrap">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>
            Run Code
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar (Explorer) */}
        <aside className="w-64 bg-[#010409] border-r border-[#30363d] flex flex-col hidden md:flex">
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#30363d]">
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Explorer</span>
            <button onClick={addNewFile} className="text-gray-400 hover:text-white" title="New File">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-2 px-2">
            {files.map(file => (
              <div 
                key={file.name}
                onClick={() => setActiveFileName(file.name)}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer rounded mb-1 font-mono ${activeFileName === file.name ? 'bg-[#161b22] text-[#58a6ff] border-l-2 border-[#58a6ff]' : 'text-gray-400 hover:bg-[#161b22] hover:text-gray-300 border-l-2 border-transparent'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                {file.name}
              </div>
            ))}
          </div>
        </aside>

        {/* Center Code Editor & Bottom Terminal */}
        <div className="flex flex-1 flex-col min-w-0">
          
          {/* Top Tabs */}
          <div className="flex bg-[#010409] border-b border-[#30363d] overflow-x-auto no-scrollbar">
            {files.map(file => (
              <div 
                key={file.name}
                onClick={() => setActiveFileName(file.name)}
                className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer font-mono whitespace-nowrap ${activeFileName === file.name ? 'bg-[#0d1117] border-t-2 border-[#58a6ff] text-[#c9d1d9]' : 'bg-[#010409] text-gray-500 hover:bg-[#0d1117] border-t-2 border-transparent'}`}
              >
                {file.name}
              </div>
            ))}
          </div>

          {/* Code Editor Area with Syntax Highlighting Overlay */}
          <div className="flex-1 flex bg-[#0d1117] overflow-hidden relative">
            <div className="w-12 bg-[#0d1117] border-r border-[#30363d] text-right pr-2 py-4 font-mono text-sm text-gray-600 select-none hidden sm:block">
              {activeFile.code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            
            <div className="relative flex-1 overflow-hidden">
              {/* Highlighted Code (Background) */}
              <pre 
                ref={preRef}
                className="absolute inset-0 p-4 m-0 pointer-events-none font-mono text-[15px] leading-relaxed whitespace-pre-wrap break-words overflow-hidden text-[#e6edf3]"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlightCode(activeFile.code) }}
              />
              
              {/* Actual Textarea (Foreground - Transparent) */}
              <textarea
                ref={textRef}
                value={activeFile.code}
                onChange={(e) => updateCode(e.target.value)}
                onScroll={handleScroll}
                spellCheck="false"
                className="absolute inset-0 w-full h-full p-4 m-0 bg-transparent text-transparent caret-[#c9d1d9] font-mono text-[15px] leading-relaxed resize-none outline-none focus:ring-0 whitespace-pre-wrap break-words"
              />
            </div>
          </div>

          {/* Terminal Section */}
          <div className="h-64 bg-[#010409] border-t border-[#30363d] flex flex-col">
            <div className="flex px-4 border-b border-[#30363d]">
              <div className="py-2 text-xs uppercase tracking-wider font-semibold text-[#e6edf3] border-b-2 border-[#58a6ff]">
                Terminal Output
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
              <div className="text-[#a5d6ff] whitespace-pre-wrap">
                <span className="text-[#4ade80]">volt@desktop</span>:<span className="text-[#58a6ff]">~/omlang</span>$ om compile {activeFileName} --release{'\n'}
                {output || 'Awaiting execution...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
