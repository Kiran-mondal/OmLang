import { useRef } from 'react';
import { FileIcon } from './Icons'; // আপডেট করা হয়েছে

export default function Editor({ files, activeFileName, setActiveFileName, activeFile, renameActiveFile, updateCode, highlightCode }) {
  const textRef = useRef(null);
  const preRef = useRef(null);

  const handleScroll = () => {
    if (preRef.current && textRef.current) {
      preRef.current.scrollTop = textRef.current.scrollTop;
      preRef.current.scrollLeft = textRef.current.scrollLeft;
    }
  };

  return (
    <div className="flex flex-1 flex-col min-w-0">
      <div className="flex bg-[#010409] border-b border-[#30363d] overflow-x-auto no-scrollbar">
        {files.map(file => (
          <div 
            key={file.name}
            onClick={() => setActiveFileName(file.name)}
            className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer font-mono whitespace-nowrap ${activeFileName === file.name ? 'bg-[#0d1117] border-t-2 border-[#58a6ff] text-[#c9d1d9]' : 'bg-[#010409] text-gray-500 hover:bg-[#0d1117] border-t-2 border-transparent'}`}
          >
            <FileIcon fileName={file.name} /> {/* ডায়নামিক আইকন */}
            {file.name}
          </div>
        ))}
      </div>

      <div className="flex bg-[#010409] border-b border-[#30363d]">
        <div className="px-4 py-2 bg-[#0d1117] text-sm flex items-center gap-2">
          <FileIcon fileName={activeFileName} /> {/* ডায়নামিক আইকন */}
          <input
            type="text"
            value={activeFileName}
            onChange={(e) => renameActiveFile(e.target.value)}
            className="bg-transparent border-none outline-none text-[#e6edf3] font-mono text-sm w-48 focus:bg-[#161b22] focus:ring-1 focus:ring-[#58a6ff] rounded px-1 transition-all"
            placeholder="filename.om"
          />
        </div>
      </div>

      <div className="flex-1 flex bg-[#0d1117] overflow-hidden relative">
        <div className="w-12 bg-[#0d1117] border-r border-[#30363d] text-right pr-2 py-4 font-mono text-sm text-gray-600 select-none hidden sm:block">
          {activeFile.code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        
        <div className="relative flex-1 overflow-hidden">
          <pre 
            ref={preRef}
            className="absolute inset-0 p-4 m-0 pointer-events-none font-mono text-[15px] leading-relaxed whitespace-pre-wrap break-words overflow-hidden text-[#e6edf3]"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: highlightCode(activeFile.code) }}
          />
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
    </div>
  );
}
