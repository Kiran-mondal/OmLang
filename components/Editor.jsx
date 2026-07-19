import { FileIcon } from './Icons';

export default function Editor({ file, renameFile, updateCode, highlightCode }) {
  // Safety Check: যদি কোনো কারণে file বা file.code না থাকে, তবে খালি স্ট্রিং ধরে নেবে
  const safeCode = file?.code || '';

  return (
    <div className="flex flex-1 flex-col min-w-0">
      {/* ফাইল রিনেম বক্স */}
      <div className="flex bg-[#010409] border-b border-[#30363d] px-4 py-2 items-center gap-2">
        <FileIcon fileName={file?.name || 'main.om'} />
        <input
          type="text"
          value={file?.name || ''}
          onChange={(e) => renameFile(e.target.value)}
          className="bg-transparent border-none outline-none text-[#58a6ff] font-mono text-sm w-full focus:ring-0"
        />
      </div>

      <div className="flex-1 relative overflow-hidden">
        {/* লাইন নম্বর জেনারেটর - safeCode ব্যবহার করে ডিফেন্ড করা হয়েছে */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#0d1117] border-r border-[#30363d] text-right pr-2 py-4 font-mono text-sm text-gray-600 select-none hidden sm:block">
          {safeCode.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        
        <div className="relative flex-1 h-full ml-0 sm:ml-12 overflow-hidden">
          <pre 
            className="absolute inset-0 p-4 font-mono text-[15px] pointer-events-none whitespace-pre-wrap break-words overflow-hidden text-[#e6edf3]"
            dangerouslySetInnerHTML={{ __html: highlightCode(safeCode) }}
          />
          <textarea
            value={safeCode}
            onChange={(e) => updateCode(e.target.value)}
            spellCheck="false"
            className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white font-mono text-[15px] outline-none resize-none whitespace-pre-wrap break-words"
          />
        </div>
      </div>
    </div>
  );
}
