// VS Code স্টাইলের ডেডিকেটেড .om ফাইল এক্সটেনশন লোগো
export const OmFileIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* ডার্ক ব্যাকগ্রাউন্ড (ফাইলের আইকনের বেস) */}
    <rect width="24" height="24" rx="5" fill="#0D1117" stroke="#30363D" strokeWidth="1" />
    
    {/* 'O' Ring */}
    <circle cx="12" cy="12" r="7" stroke="#58A6FF" strokeWidth="2" strokeDasharray="14 4" strokeLinecap="round" />
    
    {/* 'M' Graph Path */}
    <path d="M8 15L10 9.5L12 12.5L14 9.5L16 15" stroke="#E6EDF3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Syntax Nodes (কম্পাইলারের ডট) */}
    <circle cx="8" cy="15" r="1.5" fill="#4ADE80" />
    <circle cx="16" cy="15" r="1.5" fill="#FF7B72" />
  </svg>
);
