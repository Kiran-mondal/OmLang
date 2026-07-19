'use client';

import { useState } from 'react';
import { runOmLang } from '../lib/omlang/Engine';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Terminal from '../components/Terminal';

export default function Home() {
  // শুধুমাত্র একটি ফাইল হিসেবে শুরু হবে
  const [file, setFile] = useState({ name: 'main.om', code: 'show "Hello Kiran!"\n\nmatrix M = [10, 20 | 30, 40]\nshow M' });
  const [output, setOutput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const updateCode = (newCode) => {
    setFile({ ...file, code: newCode });
  };

  const renameFile = (newName) => {
    setFile({ ...file, name: newName });
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
    if (!file.name.toLowerCase().endsWith('.om')) {
      setOutput(`[Error] Execution Failed!\nOnly '.om' files are supported.`);
      return;
    }
    const result = runOmLang(file.code);
    setOutput(`Compiling ${file.name}...\n\n` + result);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">
      <Header handleSave={() => {}} isSaving={isSaving} handleRun={handleRun} />
      
      <div className="flex flex-1 overflow-hidden">
        <Editor 
          file={file} 
          renameFile={renameFile} 
          updateCode={updateCode} 
          highlightCode={highlightCode} 
        />
      </div>
      <Terminal fileName={file.name} output={output} />
    </div>
  );
}
