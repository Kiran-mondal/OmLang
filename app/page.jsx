'use client';

import { useState } from 'react';
import { runOmLang } from '../lib/omlang/Engine';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Terminal from '../components/Terminal';

export default function Home() {
  // একদম পরিষ্কার এবং একটিমাত্র ডিফল্ট এক্সাম্পল ফাইল
  const [file, setFile] = useState({ 
    name: 'main.om', 
    code: 'show "Hello World"' 
  });
  const [output, setOutput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const updateCode = (newCode) => {
    setFile(prev => ({ ...prev, code: newCode }));
  };

  const renameFile = (newName) => {
    setFile(prev => ({ ...prev, name: newName }));
  };

  const highlightCode = (code) => {
    if (!code) return '';
    let text = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    text = text.replace(/(&quot;.*?&quot;|".*?")/g, "<span style='color:#a5d6ff'>$1</span>");
    text = text.replace(/(\/\/.*)/g, "<span style='color:#8b949e'>$1</span>");
    text = text.replace(/\b(show|matrix|for|to|while|if|else)\b/g, "<span style='color:#ff7b72'>$1</span>");
    text = text.replace(/\b(\d+)\b/g, "<span style='color:#79c0ff'>$1</span>");
    return text;
  };

  const handleRun = () => {
    const safeName = file?.name || 'main.om';
    
    if (!safeName.toLowerCase().endsWith('.om')) {
      setOutput(`[Error] Execution Failed!\nOnly '.om' files are supported by the OmLang Compiler.`);
      return;
    }
    const result = runOmLang(file?.code || '');
    setOutput(`Compiling ${safeName}...\n\n` + result);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const safeName = file?.name || 'main.om';
    const safeCode = file?.code || '';

    try {
      const response = await fetch('/api/save-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: safeName,
          code: safeCode
        })
      });
      const data = await response.json();
      if (response.ok) {
        setOutput(`\n--- CLOUD SYNC ---\n[Success] '${safeName}' saved to Neon DB at ${new Date().toLocaleTimeString()}\nSnippet ID: ${data.data?.id || 'N/A'}\n------------------\n\n` + output);
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
    <div className="flex h-screen w-full flex-col bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">
      <Header handleSave={handleSave} isSaving={isSaving} handleRun={handleRun} />
      
      <div className="flex flex-1 overflow-hidden">
        <Editor 
          file={file} 
          renameFile={renameFile} 
          updateCode={updateCode} 
          highlightCode={highlightCode} 
        />
      </div>
      
      <Terminal fileName={file?.name || 'main.om'} output={output} />
    </div>
  );
}
