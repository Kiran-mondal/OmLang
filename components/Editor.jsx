import { useRef, useMemo } from 'react'; //[span_27](start_span)[span_27](end_span)
import { FileIcon } from './Icons'; //[span_28](start_span)[span_28](end_span)

export default function Editor({ files, activeIndex, setActiveIndex, addNewFile, renameFile, updateCode, highlightCode }) {
  const activeFile = files[activeIndex] || files[0]; //[span_29](start_span)[span_29](end_span)
  const safeCode = activeFile?.code || ''; //[span_30](start_span)[span_30](end_span)
  const safeName = activeFile?.name || 'main.om'; //[span_31](start_span)[span_31](end_span)

  const preRef = useRef(null); //[span_32](start_span)[span_32](end_span)
  const lineRef = useRef(null); //[span_33](start_span)[span_33](end_span)

  // ⚡ Bolt Optimization: Memoize line numbers to prevent expensive array allocations and re-renders on every keystroke.[span_34](start_span)[span_34](end_span)
  const lineCount = (safeCode.match(/\n/g) || []).length + 1; //[span_35](start_span)[span_35](end_span)
  const lineNumbers = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>); //[span_36](start_span)[span_36](end_span)
  }, [lineCount]); //[span_37](start_span)[span_37](end_span)

  const handleScroll = (e) => {
    if (preRef.current) { //[span_38](start_span)[span_38](end_span)
      preRef.current.scrollTop = e.target.scrollTop; //[span_39](start_span)[span_39](end_span)
      preRef.current.scrollLeft = e.target.scrollLeft; //[span_40](start_span)[span_40](end_span)
    }
    if (lineRef.current) { //[span_41](start_span)[span_41](end_span)
      lineRef.current.scrollTop = e.target.scrollTop; //[span_42](start_span)[span_42](end_span)
    }
  };

  return (
    <div className="flex flex-1 flex-col min-w-0 h-full">
      <div className="flex bg-[#010409] border-b border-[#30363d] overflow-x-auto no-scrollbar items-center shrink-0">
        {files.map((file, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActiveIndex(index)} //[span_43](start_span)[span_43](end_span)
            className={`px-4 py-2 text-sm flex items-center gap-2 cursor-pointer font-mono whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#58a6ff] ${activeIndex === index ? 'bg-[#0d1117] border-t-2 border-[#58a6ff] text-[#c9d1d9]' : 'text-gray-500 hover:bg-[#0d1117] border-t-2 border-transparent'}`}
          >
            <FileIcon fileName={file.name} />
            {file.name}
          </button>
        ))}
        <button 
          type="button"
          onClick={addNewFile}  //[span_44](start_span)[span_44](end_span)
          className="ml-2 p-1 text-gray-500 hover:text-[#4ade80] transition-colors flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff] rounded"
          title="Create New File"
          aria-label="Create New File"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="flex bg-[#0d1117] border-b border-[#30363d] px-4 py-2 items-center gap-2 shrink-0">
        <FileIcon fileName={safeName} />
        <input
          type="text"
          value={safeName}
          onChange={(e) => renameFile(activeIndex, e.target.value)} //[span_45](start_span)[span_45](end_span)
          className="bg-transparent border-none outline-none text-[#58a6ff] font-mono text-sm w-full focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#58a6ff] rounded px-1"
          placeholder="filename.om"
          aria-label="File name"
        />
      </div>

      <div className="flex-1 relative flex overflow-hidden bg-[#0d1117]">
        <div 
          ref={lineRef} //[span_46](start_span)[span_46](end_span)
          className="w-12 border-r border-[#30363d] text-right pr-2 py-4 font-mono text-[15px] leading-[1.5] text-gray-600 select-none hidden sm:block overflow-hidden"
        >
          {lineNumbers}
        </div>
        
        <div className="relative flex-1 h-full">
          <pre 
            ref={preRef} //[span_47](start_span)[span_47](end_span)
            className="absolute inset-0 w-full h-full p-4 font-mono text-[15px] leading-[1.5] pointer-events-none whitespace-pre overflow-hidden text-[#e6edf3] m-0"
            dangerouslySetInnerHTML={{ __html: highlightCode(safeCode) + '\n' }} //[span_48](start_span)[span_48](end_span)
          />
          <textarea
            value={safeCode}
            onChange={(e) => updateCode(e.target.value)} //[span_49](start_span)[span_49](end_span)
            onScroll={handleScroll} //[span_50](start_span)[span_50](end_span)
            spellCheck="false" //[span_51](start_span)[span_51](end_span)
            className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white font-mono text-[15px] leading-[1.5] outline-none resize-none whitespace-pre overflow-auto m-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#58a6ff]"
            aria-label="Code editor"
          />
        </div>
      </div>
    </div>
  );
}
