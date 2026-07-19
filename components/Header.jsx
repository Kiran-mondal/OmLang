export default function Header({ handleSave, isSaving, handleRun }) {
  return (
    <header className="flex items-center justify-between bg-[#010409] px-4 py-3 border-b border-[#30363d] text-sm">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="OmLang Logo" className="w-8 h-8 rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.3)]" />
        <span className="font-bold text-gray-200 tracking-wider text-lg">OmLang Studio</span>
      </div>
      
      <div className="flex items-center gap-2">
        <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#363b42] px-3 py-1.5 rounded-md text-xs font-bold transition-all disabled:opacity-50 whitespace-nowrap">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
          {isSaving ? 'Saving...' : 'Sync Cloud'}
        </button>
        <button onClick={handleRun} className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm whitespace-nowrap">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>
          Run Code
        </button>
      </div>
    </header>
  );
}
