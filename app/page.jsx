import React from 'react';

export default function ProjectsPreviewPage() {
  const allProjects = [
    {
      id: "password-guard",
      title: "Password Guard",
      desc: "Advanced AI-powered password protection & vault management tool with 3D Cyber UI.",
      live: "https://passwordguard.quarry.dpdns.org",
      code: "https://github.com/Kiran-mondal/Password-Guard",
      svg: (
        <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" rx="120" fill="#58a6ff"/>
            <path d="M256 80L120 140V240C120 330 176 407 256 432C336 407 392 330 392 240V140L256 80Z" fill="#0d1117"/>
            <circle cx="256" cy="255" r="70" fill="#58a6ff"/>
            <rect x="235" y="240" width="42" height="75" rx="8" fill="#0d1117"/>
        </svg>
      )
    },
    {
      id: "zendrift",
      title: "ZenDrift",
      desc: "Dynamic performance tracking system built for an engaging and smooth web experience.",
      live: "https://zendrift.quarry.dpdns.org",
      code: "https://github.com/Kiran-mondal",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32">
          <path d="M 120 390 C 120 270, 392 350, 392 210 C 392 130, 310 90, 256 90" fill="none" stroke="#58a6ff" strokeWidth="45" strokeLinecap="round" />
          <circle cx="256" cy="90" r="45" fill="#58a6ff" />
        </svg>
      )
    },
    {
      id: "chaturanga",
      title: "Chaturanga",
      desc: "Interactive web-based application focused on deep logic, planning, and strategy.",
      live: "https://chaturanga.quarry.dpdns.org",
      code: "https://github.com/Kiran-mondal",
      svg: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
          <circle cx="50" cy="50" r="48" fill="#d97706" stroke="#0d1117" strokeWidth="2" />
          <path d="M50 20 L75 55 L50 80 L25 55 Z" fill="#0d1117" />
        </svg>
      )
    },
    {
      id: "omlang",
      title: "Omlang",
      desc: "A modern language and communication-focused platform with an intuitive user interface.",
      live: "https://omlang.quarry.dpdns.org",
      code: "https://github.com/Kiran-mondal",
      svg: null
    }
  ];

  const visibleProjects = allProjects.filter(p => p.id !== "omlang");

  return (
    <div className="bg-[#0d1117] min-h-[calc(100dvh-76px)] text-[#c9d1d9] font-sans pb-12">
      <div className="container mx-auto pt-10 text-center px-4">
        
        {/* প্রোফাইল সেকশন (OmLang Theme) */}
        <div className="flex flex-col items-center justify-center bg-[#161b22] border border-[#30363d] rounded-xl p-8 max-w-2xl mx-auto mb-12 shadow-sm">
          <img 
            src="https://github.com/Kiran-mondal.png" 
            alt="Kiran Mondal" 
            className="w-24 h-24 rounded-full border-2 border-[#58a6ff] mb-4"
          />
          <h2 className="text-3xl font-bold text-[#c9d1d9] mb-2">Kiran Mondal</h2>
          <p className="text-[#8b949e] mb-6">Full-Stack Developer & Cyber Security Enthusiast</p>
          <a 
            href="https://github.com/Kiran-mondal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 border border-[#30363d] bg-[#21262d] text-[#c9d1d9] rounded-md hover:bg-[#30363d] hover:text-white transition-all duration-200"
          >
            View Full GitHub Profile
          </a>
        </div>

        <div className="mb-8">
          <h3 className="text-white text-2xl m-0 font-semibold">My Other Live Projects</h3>
          <div className="h-[2px] w-44 bg-[#30363d] mx-auto mt-4"></div>
        </div>

        {/* কার্ড গ্রিড (OmLang Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {visibleProjects.map((p) => (
            <div key={p.id} className="bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] p-6 rounded-xl transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                {p.svg}
                <h3 className="m-0 text-lg font-semibold text-[#58a6ff]">{p.title}</h3>
              </div>
              <p className="text-[#8b949e] text-sm mb-6 flex-1">{p.desc}</p>
              <div className="flex gap-3 mt-auto">
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="bg-[#238636] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#2ea043] transition-colors">
                  Live App
                </a>
                <a href={p.code} target="_blank" rel="noopener noreferrer" className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-4 py-1.5 rounded-md text-sm hover:bg-[#30363d] transition-colors">
                  Source Code
                </a>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
