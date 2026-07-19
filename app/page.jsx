'use client';

import { useState } from 'react';
import { runOmLang } from '../lib/omlang/Engine';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Terminal from '../components/Terminal';

export default function Home() {
  const [files, setFiles] = useState([
    { name: 'main.om', code: 'show "Hello Kiran!"\n\n// Matrix Test\nmatrix M = [10, 20 | 30, 40]\nshow M' },
    { name: 'math.om', code: '// Variables and Math\na = 15\nb = 10\n\nif a > b {\n  show "A is greater"\n}' }
  ]);
  
  const [activeFileName, setActiveFileName] = useState('main.om');
  const activeFile = files.find(f => f.name === activeFileName);

  const [output, setOutput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const updateCode = (newCode) => {
    setFiles(files.map(f => f.name === activeFileName ? { ...f, code: newCode } : f));
  };

  const renameActiveFile = (newName) => {
    if (!newName.trim()) return;
    setFiles(files.map(f => f.name === activeFileName ? { ...f, name: newName } : f));
    setActiveFileName(newName);
  };

  const addNewFile = () => {
    const newName = `file${files.length + 1}.om`;
    setFiles([...files, { name: newName, code: '' }]);
    setActiveFileName(newName);
  };

  const highlightCode = (code) => {
    if (!code) return '';
    let text = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    text = text.replace(/(\/\/.*)/g, '<span style="color: #8b949e">$1</span>');
    text = text.replace(/(&quot;.*?&quot;|".*?")/g, '<span style="color: #a5d6ff">$1</span>');
    text = text.replace(/\b(show|matrix|for|to|while|if|else)\b/g, '<span style="color: #ff7b72">$1</span>');
    text = text.replace(/\b(\d+)\b/g, '<span style="color: #79c0ff">$1</span>');
    return text;
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
      
      <Header handleSave={handleSave} isSaving={isSaving} handleRun={handleRun} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          files={files} 
          activeFileName={activeFileName} 
          setActiveFileName={setActiveFileName} 
          addNewFile={addNewFile} 
        />
        
        <div className="flex flex-1 flex-col min-w-0">
          <Editor 
            files={files} 
            activeFileName={activeFileName} 
            setActiveFileName={setActiveFileName} 
            activeFile={activeFile} 
            renameActiveFile={renameActiveFile} 
            updateCode={updateCode} 
            highlightCode={highlightCode} 
          />
          <Terminal activeFileName={activeFileName} output={output} />
        </div>
      </div>
    </div>
  );
}
