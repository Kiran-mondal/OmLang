import React from 'react';

// Animated Background Component matching the IDE/Editor Theme
const IDEBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0d1117]">
    {/* Animated glowing tech-orbs */}
    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#58a6ff] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-[#238636] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
    
    {/* Subtle animated editor grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_70%,transparent_100%)] opacity-30"></div>
  </div>
);

export default function ProjectsPreviewPage() {
  // Project data list including the newly added Pachisi project
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
      id: "pachisi",
      title: "Pachisi",
      desc: "Play the ancient Indian epic board game of strategy, heritage, and royal culture.",
      live: "https://pachisi.quarry.dpdns.org",
      code: "https://github.com/Kiran-mondal",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32">
          <defs>
            <mask id="pasha-hole">
              <rect width="512" height="512" fill="white" />
              <circle cx="256" cy="256" r="32" fill="black" />
            </mask>
          </defs>
          <g mask="url(#pasha-hole)" fill="#dc2626">
            <rect x="232" y="16" width="48" height="480" rx="12" />
            <rect x="232" y="16" width="48" height="480" rx="12" transform="rotate(45 256 256)" />
            <rect x="232" y="16" width="48" height="480" rx="12" transform="rotate(90 256 256)" />
            <rect x="232" y="16" width="48" height="480" rx="12" transform="rotate(135 256 256)" />
            <circle cx="256" cy="256" r="168" fill="none" stroke="#dc2626" strokeWidth="48" />
            <circle cx="256" cy="256" r="56" fill="none" stroke="#dc2626" strokeWidth="48" />
          </g>
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

  // Hide the current active project (OmLang)
  const visibleProjects = allProjects.filter(p => p.id !== "omlang");

  return (
    // Main container with relative positioning for background layering
    <div className="relative min-h-[calc(100dvh-76px)] text-[#c9d1d9] font-sans pb-12 overflow-hidden">
      
      {/* Insert Animated Background */}
      <IDEBackground />

      <div className="container relative z-10 mx-auto pt-10 text-center px-4">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center bg-[#161b22]/80 backdrop-blur-md border border-[#30363d] rounded-xl p-8 max-w-2xl mx-auto mb-12 shadow-lg">
          <img 
            src="https://github.com/Kiran-mondal.png" 
            alt="Kiran Mondal" 
            className="w-24 h-24 rounded-full border-2 border-[#58a6ff] mb-4 shadow-[0_0_15px_rgba(88,166,255,0.4)]"
          />
          <h2 className="text-3xl font-bold text-[#c9d1d9] mb-2">Kiran Mondal</h2>
          <p className="text-[#8b949e] mb-6">Full-Stack Developer & Cyber Security Enthusiast</p>
          <a 
            href="https://github.com/Kiran-mondal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 border border-[#30363d] bg-[#21262d] text-[#c9d1d9] rounded-md hover:border-[#58a6ff] hover:text-white transition-all duration-300"
          >
            View Full GitHub Profile
          </a>
        </div>

        {/* Section Title */}
        <div className="mb-10">
          <h3 className="text-white text-2xl m-0 font-semibold tracking-wide">My Other Live Projects</h3>
          <div className="h-[2px] w-44 bg-[#30363d] mx-auto mt-4 relative">
             <div className="absolute top-0 left-1/4 w-1/2 h-full bg-[#58a6ff] shadow-[0_0_10px_#58a6ff]"></div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {visibleProjects.map((p) => (
            <div key={p.id} className="bg-[#161b22]/80 backdrop-blur-sm border border-[#30363d] hover:border-[#58a6ff] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(88,166,255,0.15)] p-6 rounded-xl transition-all duration-300 flex flex-col group">
              <div className="flex items-center gap-3 mb-3">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {p.svg}
                </div>
                <h3 className="m-0 text-lg font-semibold text-[#58a6ff] group-hover:text-white transition-colors duration-300">{p.title}</h3>
              </div>
              <p className="text-[#8b949e] text-sm mb-6 flex-1 leading-relaxed">{p.desc}</p>
              <div className="flex gap-3 mt-auto">
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="bg-[#238636] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#2ea043] hover:shadow-[0_0_10px_rgba(35,134,54,0.5)] transition-all duration-300">
                  Live App
                </a>
                <a href={p.code} target="_blank" rel="noopener noreferrer" className="bg-[#21262d] border border-[#30363d] text-[#c9d1d9] px-4 py-1.5 rounded-md text-sm hover:border-[#8b949e] hover:text-white transition-all duration-300">
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
            
