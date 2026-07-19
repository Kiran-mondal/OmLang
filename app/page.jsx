'use client';

import { useState } from 'react';
import { runOmLang } from '../lib/omlang/Engine';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Terminal from '../components/Terminal';

export default function Home() {
  const [files, setFiles] = useState([{ name: 'main.om', code: 'show "Hello World"\nfor x = 1 to 3 {\n  show "OmLang " + x\n}' }]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [output, setOutput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const activeFile = files[activeIndex] || files[0];

  const updateCode = (newCode) => {
    const updatedFiles = [...files];
    updatedFiles[activeIndex].code = newCode;
    setFiles(updatedFiles);
  };

  const renameFile = (index, newName) => {
    const updatedFiles = [...files];
    updatedFiles[index].name = newName;
    setFiles(updatedFiles);
  };

  const addNewFile = () => {
    const newFileName = `test${files.length + 1}.om`;
    setFiles([...files, { name: newFileName, code: '' }]);
    setActiveIndex(files.length);
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
    const safeName = activeFile?.name || 'main.om';
    
    if (!safeName.toLowerCase().endsWith('.om')) {
      setOutput(`[Security Alert] Execution Blocked!\nThe OmLang Engine is strictly locked to run only '.om' language files.\nFile '${safeName}' is not supported.`);
      return;
    }
    const result = runOmLang(activeFile?.code || '');
    setOutput(`Compiling ${safeName}...\n\n` + result);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const safeName = activeFile?.name || 'main.om';
    const safeCode = activeFile?.code || '';

    try {
      const response = await fetch('/api/save-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: safeName, code: safeCode })
      });
      const data = await response.json();
      if (response.ok) {
        setOutput(`\n--- CLOUD SYNC ---\n[Success] '${safeName}' saved to Neon DB\nSnippet ID: ${data.data?.id || 'N/A'}\n------------------\n\n` + output);
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
    // h-screen এর বদলে h-[100dvh] ব্যবহার করা হয়েছে (মোবাইল ফিক্স)
    <div className="flex h-[100dvh] w-full flex-col bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">
      <Header handleSave={handleSave} isSaving={isSaving} handleRun={handleRun} />
      
      <div className="flex flex-1 overflow-hidden">
        <Editor 
          files={files} 
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          addNewFile={addNewFile}
          renameFile={renameFile} 
          updateCode={updateCode} 
          highlightCode={highlightCode} 
        />
      </div>
      
      <Terminal fileName={activeFile?.name || 'main.om'} output={output} />
    </div>
  );
}
