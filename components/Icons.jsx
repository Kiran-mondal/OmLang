export const FileIcon = ({ fileName }) => {
  // ফাইলের এক্সটেনশন বের করা
  const ext = fileName.includes('.') ? fileName.split('.').pop().toLowerCase() : '';

  // ১. OmLang (.om) আইকন
  if (ext === 'om') {
    return (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#0D1117" stroke="#30363D" strokeWidth="1" />
        <circle cx="12" cy="12" r="7" stroke="#58A6FF" strokeWidth="2" strokeDasharray="14 4" />
        <path d="M8 15L10 9.5L12 12.5L14 9.5L16 15" stroke="#E6EDF3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="15" r="1.5" fill="#4ADE80" />
        <circle cx="16" cy="15" r="1.5" fill="#FF7B72" />
      </svg>
    );
  }
  
  // ২. JavaScript (.js) আইকন
  if (ext === 'js' || ext === 'jsx') {
    return (
      <svg className="w-4 h-4 shrink-0 text-[#F7DF1E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.96 22C6.45 22 2 17.55 2 12S6.45 2 11.96 2s9.96 4.45 9.96 10-4.45 10-9.96 10zm-5.46-2.568c1.354 0 2.433-.36 3.045-.986l-1.393-2.022c-.49.467-1.15.82-1.83.82-.723 0-1.127-.31-1.127-.775 0-.543.544-.737 1.748-1.127 1.633-.524 2.73-1.282 2.73-2.836 0-1.613-1.34-2.768-3.32-2.768-1.418 0-2.45.368-3.117.913l1.34 1.94c.486-.41 1.03-.66 1.728-.66.64 0 1.03.31 1.03.737 0 .486-.466.68-1.69 1.088-1.748.563-2.806 1.3-2.806 2.875 0 1.71 1.398 2.8 3.66 2.8m-8.32-8.995h-3.087v6.62c0 1.923 1.03 2.914 3.146 2.914 1.28 0 2.31-.31 2.99-.816l-1.243-2.097c-.506.37-1.146.62-1.71.62-.777 0-1.05-.29-1.05-.99v-6.25z" />
      </svg>
    );
  }

  // ৩. Python (.py) আইকন
  if (ext === 'py') {
    return (
      <svg className="w-4 h-4 shrink-0 text-[#3776AB]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-2.83 0-5.46.33-7.22 1.48C3.12 4.56 2.37 6.3 2.37 8.2v1.54h9.61v.8H2.43c0 2 .54 3.65 1.57 4.7 1.63 1.68 4.3 1.95 7.15 1.95h.85v-2.3c0-1.4 1.1-2.54 2.46-2.54h3.68c1.37 0 2.47 1.14 2.47 2.54V17c0 1.4-1.1 2.54-2.47 2.54h-1.92v2.46h4.52c2.83 0 5.46-.33 7.22-1.48 1.66-1.08 2.41-2.82 2.41-4.72v-1.54h-9.61v-.8h9.55c0-2-.54-3.65-1.57-4.7-1.63-1.68-4.3-1.95-7.15-1.95h-.85v2.3c0 1.4-1.1 2.54-2.46 2.54h-3.68c-1.37 0-2.47-1.14-2.47-2.54V5.4c0-1.4 1.1-2.54 2.47-2.54h1.92V.4H12z"/>
      </svg>
    );
  }

  // ৪. Text (.txt) আইকন
  if (ext === 'txt') {
    return (
      <svg className="w-4 h-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    );
  }

  // ডিফল্ট আইকন (অচেনা ফাইলের জন্য)
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  );
};
