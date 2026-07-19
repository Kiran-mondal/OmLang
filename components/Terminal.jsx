export default function Terminal({ fileName, output }) {
  // সেফটি চেক: যদি fileName না থাকে, তবে ডিফল্ট 'main.om' দেখাবে
  const safeFileName = fileName || 'main.om';
  const safeOutput = output || 'Awaiting execution...';

  return (
    <div className="h-64 bg-[#010409] border-t border-[#30363d] flex flex-col">
      <div className="flex px-4 border-b border-[#30363d]">
        <div className="py-2 text-xs uppercase tracking-wider font-semibold text-[#e6edf3] border-b-2 border-[#58a6ff]">
          Terminal Output
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        <div className="text-[#a5d6ff] whitespace-pre-wrap">
          <span className="text-[#4ade80]">volt@desktop</span>:<span className="text-[#58a6ff]">~/omlang</span>$ om compile {safeFileName} --release{'\n'}
          {safeOutput}
        </div>
      </div>
    </div>
  );
}
