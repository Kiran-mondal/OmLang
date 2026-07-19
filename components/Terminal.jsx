import { useEffect, useRef } from 'react';

export default function Terminal({ fileName, output }) {
  const safeFileName = fileName || 'main.om';
  const safeOutput = output || 'Awaiting execution...';
  
  // টার্মিনালের একদম নিচের অংশ ট্র্যাক করার জন্য
  const bottomRef = useRef(null);

  // যখনই আউটপুট আপডেট হবে, টার্মিনাল স্মুথলি নিচে স্ক্রল করবে
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  return (
    <div className="h-64 sm:h-72 bg-[#010409] border-t border-[#30363d] flex flex-col shrink-0">
      <div className="flex px-4 border-b border-[#30363d]">
        <div className="py-2 text-xs uppercase tracking-wider font-semibold text-[#e6edf3] border-b-2 border-[#58a6ff]">
          Terminal Output
        </div>
      </div>
      
      {/* 
        এখানে [&::-webkit-scrollbar]:hidden ব্যবহার করা হয়েছে 
        যাতে মোবাইলের সেই বিরক্তিকর সাদা স্ক্রলবারের দাগগুলো আর না আসে 
      */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="text-[#a5d6ff] whitespace-pre-wrap break-words pb-2">
          <span className="text-[#4ade80]">volt@desktop</span>:<span className="text-[#58a6ff]">~/omlang</span>$ om compile {safeFileName} --release{'\n'}
          {safeOutput}
          
          {/* এই ফাঁকা div টি সবসময় নিচে থাকবে, অটো-স্ক্রল এখানেই ফোকাস করবে */}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
