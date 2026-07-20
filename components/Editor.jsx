import { useRef } from 'react';
import { FileIcon } from './Icons';

export default function Editor({ files, activeIndex, setActiveIndex, addNewFile, renameFile, updateCode, highlightCode }) {
  const activeFile = files[activeIndex] || files[0];
  const safeCode = activeFile?.code || '';
  const safeName = activeFile?.name || 'main.om';

  // লেয়ারগুলোকে সিঙ্ক করার জন্য রেফারেন্স
  const preRef = useRef(null);
  const lineRef = useRef(null);

  // ইউজার যখন স্ক্রল করবে, তখন কালার লেয়ার এবং লাইন নাম্বার একসাথে স্ক্রল হবে
  const handleScroll = (e) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.target.scrollTop;
      preRef.current.scrollLeft = e.target.scrollLeft;
    }
    if (lineRef.current) {
      lineRef.current.scrollTop = e.target.scrollTop;
    }
  };

  return (
    <div className="flex flex-1 flex-col min-w-0 h-full">
      
      {/* Tab Bar with '+' Icon */}
      <div className="flex bg-[#010409] border-b border-[#30363d] overflow-x-auto no-scrollbar items-center shrink-0">
        {files.map((file, index) => (
          <div 
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer font-mono whitespace-nowrap ${activeIndex === index ? 'bg-[#0d1117] border-t-2 border-[#58a6ff] text-[#c9d1d9]' : 'text-gray-500 hover:bg-[#0d1117] border-t-2 border-transparent'}`}
          >
            <FileIcon fileName={file.name} />
            {file.name}
          </div>
        ))}
        <button 
          onClick={addNewFile} 
          className="ml-2 p-1 text-gray-500 hover:text-[#4ade80] transition-colors flex items-center justify-center" 
          title="Create New File"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* File Rename Input */}
      <div className="flex bg-[#0d1117] border-b border-[#30363d] px-4 py-2 items-center gap-2 shrink-0">
        <FileIcon fileName={safeName} />
        <input
          type="text"
          value={safeName}
          onChange={(e) => renameFile(activeIndex, e.target.value)}
          className="bg-transparent border-none outline-none text-[#58a6ff] font-mono text-sm w-full focus:ring-0"
          placeholder="filename.om"
        />
      </div>

      {/* Editor Content Area (Scrollable) */}
      <div className="flex-1 relative flex overflow-hidden bg-[#0d1117]">
        
        {/* Line Numbers */}
        <div 
          ref={lineRef}
          className="w-12 border-r border-[#30363d] text-right pr-2 py-4 font-mono text-[15px] leading-[1.5] text-gray-600 select-none hidden sm:block overflow-hidden"
        >
          {safeCode.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        
        {/* Code Area */}
        <div className="relative flex-1 h-full">
          {/* Color Highlight Layer (Pre) */}
          <pre 
            ref={preRef}
            className="absolute inset-0 w-full h-full p-4 font-mono text-[15px] leading-[1.5] pointer-events-none whitespace-pre overflow-hidden text-[#e6edf3] m-0"
            dangerouslySetInnerHTML={{ __html: highlightCode(safeCode) + '\n' }}
          />
          {/* Typing Layer (Textarea) */}
          <textarea
            value={safeCode}
            onChange={(e) => updateCode(e.target.value)}
            onScroll={handleScroll}
            spellCheck="false"
            className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white font-mono text-[15px] leading-[1.5] outline-none resize-none whitespace-pre overflow-auto m-0"
          />
        </div>

      </div>
    </div>
  );
}
