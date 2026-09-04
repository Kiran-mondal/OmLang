import { useEffect, useRef } from 'react'; //[span_15](start_span)[span_15](end_span)

export default function Terminal({ fileName, output, isError }) {
  const safeFileName = fileName || 'main.om'; //[span_16](start_span)[span_16](end_span)
  const safeOutput = output || 'Awaiting execution...'; //[span_17](start_span)[span_17](end_span)
  
  // টার্মিনালের একদম নিচের অংশ ট্র্যাক করার জন্য[span_18](start_span)[span_18](end_span)
  const bottomRef = useRef(null); //[span_19](start_span)[span_19](end_span)

  // যখনই আউটপুট আপডেট হবে, টার্মিনাল স্মুথলি নিচে স্ক্রল করবে[span_20](start_span)[span_20](end_span)
  useEffect(() => {
    if (bottomRef.current) { //[span_21](start_span)[span_21](end_span)
      bottomRef.current.scrollIntoView({ behavior: 'smooth' }); //[span_22](start_span)[span_22](end_span)
    }
  }, [output]); //[span_23](start_span)[span_23](end_span)

  return (
    <div className="h-64 sm:h-72 bg-[#010409] border-t border-[#30363d] flex flex-col shrink-0">
      <div className="flex px-4 border-b border-[#30363d]">
        <div className="py-2 text-xs uppercase tracking-wider font-semibold text-[#e6edf3] border-b-2 border-[#58a6ff]">
          Terminal Output
        </div>
      </div>
      
      {/* 
        এখানে [&::-webkit-scrollbar]:hidden ব্যবহার করা হয়েছে 
        যাতে মোবাইলের সেই বিরক্তিকর সাদা স্ক্রলবারের দাগগুলো আর না আসে[span_24](start_span)[span_24](end_span)
      */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="text-[#a5d6ff] whitespace-pre-wrap break-words pb-2">
          <span className="text-[#4ade80]">volt@desktop</span>:<span className="text-[#58a6ff]">~/omlang</span>$ om compile {safeFileName} --release{'\n'}
          
          {/* Dynamic Error Rendering based on Engine success/failure status */}
          <div className={`mt-1 ${isError ? 'text-red-400 font-semibold' : 'text-[#e6edf3]'}`}>
            {safeOutput}
          </div>
          
          {/* এই ফাঁকা div টি সবসময় নিচে থাকবে, অটো-স্ক্রল এখানেই ফোকাস করবে[span_25](start_span)[span_25](end_span) */}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
