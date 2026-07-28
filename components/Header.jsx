import React from 'react';

export default function Header({ handleSave, isSaving, handleRun }) {
  return (
    <div className="flex items-center justify-between bg-[#010409] p-3 md:p-4 border-b border-[#30363d]">
      
      {/* 📱 রেসপন্সিভ টাইটেল: মোবাইলে এক লাইনে থাকবে */}
      <div className="text-[15px] md:text-xl font-extrabold text-[#58a6ff] tracking-wider whitespace-nowrap">
        OM LANG <span className="hidden sm:inline">STUDIO</span>
      </div>

      {/* ⚡ অ্যাকশন বাটন ব্লক */}
      <div className="flex gap-2 md:gap-3">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-1 md:gap-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-semibold border border-[#363b42] transition-colors disabled:opacity-50"
        >
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <span className="hidden md:inline">{isSaving ? 'Saving...' : 'Sync Cloud'}</span>
          <span className="md:hidden">{isSaving ? '...' : 'Sync'}</span>
        </button>
        
        <button 
          onClick={handleRun}
          className="flex items-center gap-1 md:gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-1.5 md:px-5 md:py-2 rounded-md text-xs md:text-sm font-semibold transition-colors shadow-[0_0_10px_rgba(35,134,54,0.2)]"
        >
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
          </svg>
          Run
        </button>
      </div>
    </div>
  );
}
