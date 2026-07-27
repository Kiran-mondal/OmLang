import React from 'react'; // 👈 বড় হাতের 'I' ঠিক করা হয়েছে

export default function ProjectsPreviewPage() {
  const allProjects = [
    {
      id: "password-guard",
      title: "Password Guard",
      desc: "Advanced AI-powered password protection & vault management tool with 3D Cyber UI.",
      live: "https://passwordguard.quarry.dpdns.org",
      code: "https://github.com/Kiran-mondal/Password-Guard",
      svg: (
        <svg width="36" height="36" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" rx="120" fill="#0D4FF0"/>
            <path d="M256 80L120 140V240C120 330 176 407 256 432C336 407 392 330 392 240V140L256 80Z" fill="white"/>
            <circle cx="256" cy="255" r="70" fill="#0D4FF0"/>
            <rect x="235" y="240" width="42" height="75" rx="8" fill="white"/>
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="36" height="36">
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
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
          <circle cx="50" cy="50" r="48" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
          <path d="M50 20 L75 55 L50 80 L25 55 Z" fill="#ffffff" />
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

  // স্মার্ট লজিক: OmLang প্রজেক্টে থাকলে এর কার্ডটি লুকিয়ে ফেলা হবে
  const visibleProjects = allProjects.filter(p => p.id !== "omlang");

  return (
    <div className="container mx-auto min-h-[70vh] pt-10 text-center">
      {/* গিটহাব প্রোফাইল সেকশন */}
      <div className="flex flex-col items-center justify-center bg-[#121f3d]/70 border border-[#00e5ff]/20 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-md mb-12 shadow-[0_0_25px_rgba(0,229,255,0.1)]">
        <img 
          src="https://github.com/Kiran-mondal.png" 
          alt="Kiran Mondal" 
          className="w-24 h-24 rounded-full border-2 border-[#00f2fe] mb-4 shadow-[0_0_15px_#00f2fe]"
        />
        <h2 className="text-3xl font-bold text-[#00f2fe] mb-2">Kiran Mondal</h2>
        <p className="text-[#cbd5e1] mb-6">Full-Stack Developer & Cyber Security Enthusiast</p>
        <a 
          href="https://github.com/Kiran-mondal" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2 border border-[#00f2fe] text-[#00f2fe] rounded hover:bg-[#00f2fe] hover:text-[#0a1128] hover:shadow-[0_0_15px_#00f2fe] transition-all duration-300"
        >
          View Full GitHub Profile
        </a>
      </div>

      <div className="mb-8">
        <h3 className="text-white text-2xl m-0">My Other Live Projects</h3>
        <div className="h-1 w-44 bg-[#00f2fe] mx-auto mt-4 shadow-[0_0_10px_#00f2fe]"></div>
      </div>

      {/* প্রজেক্ট কার্ড গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left px-4 pb-12">
        {visibleProjects.map((p) => (
          // 👇 Neon Hover Effect (3D Float) যুক্ত করা হয়েছে 👇
          <div key={p.id} className="bg-[#121f3d]/50 border border-gray-700 hover:border-[#00f2fe] hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] p-6 rounded-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              {p.svg}
              <h3 className="m-0 text-xl font-bold text-[#00f2fe]">{p.title}</h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 h-12">{p.desc}</p>
            <div className="flex gap-4">
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-[#0a1128] bg-[#00f2fe] px-4 py-2 rounded text-sm font-semibold hover:bg-cyan-400 hover:shadow-[0_0_10px_#00f2fe] transition-all duration-300">
                Live App
              </a>
              <a href={p.code} target="_blank" rel="noopener noreferrer" className="text-[#00f2fe] border border-[#00f2fe] px-4 py-2 rounded text-sm hover:bg-[#00f2fe]/10 transition-all duration-300">
                Source Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
