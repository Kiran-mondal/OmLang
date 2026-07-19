import { OmFileIcon } from './Icons';

export default function Sidebar({ files, activeFileName, setActiveFileName, addNewFile }) {
  return (
    <aside className="w-64 bg-[#010409] border-r border-[#30363d] flex flex-col hidden md:flex">
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#30363d]">
        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Explorer</span>
        <button onClick={addNewFile} className="text-gray-400 hover:text-white" title="New File">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {files.map(file => (
          <div 
            key={file.name}
            onClick={() => setActiveFileName(file.name)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer rounded mb-1 font-mono ${activeFileName === file.name ? 'bg-[#161b22] text-[#58a6ff] border-l-2 border-[#58a6ff]' : 'text-gray-400 hover:bg-[#161b22] hover:text-gray-300 border-l-2 border-transparent'}`}
          >
            <OmFileIcon />
            {file.name}
          </div>
        ))}
      </div>
    </aside>
  );
}

