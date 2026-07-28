"use client";
import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-[#30363d] bg-[#0d1117] relative z-50">
      {/* Logo with hover glow effect */}
      <div className="text-xl font-bold text-[#c9d1d9] cursor-pointer hover:text-white hover:shadow-[0_0_15px_#58a6ff] transition-all duration-300 rounded px-2">
        OMLANG
      </div>
      
      {/* Mobile hamburger button */}
      <button 
        className="md:hidden text-[#c9d1d9] hover:text-[#58a6ff] text-2xl focus:outline-none transition-transform duration-300 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Desktop menu with animated underline */}
      <ul className="hidden md:flex gap-8">
        <li>
          <a href="/" className="relative text-[#c9d1d9] font-medium hover:text-white transition-colors duration-300 group py-1">
            Home
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#58a6ff] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#58a6ff]"></span>
          </a>
        </li>
        <li>
          <a href="/projects" className="relative text-[#c9d1d9] font-medium hover:text-white transition-colors duration-300 group py-1">
            My Projects
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#58a6ff] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#58a6ff]"></span>
          </a>
        </li>
      </ul>

      {/* Mobile dropdown menu with smooth slide effect */}
      {isOpen && (
        <ul className="absolute top-[65px] left-0 w-full bg-[#161b22]/95 backdrop-blur-md border-b border-[#30363d] flex flex-col items-center py-8 gap-6 md:hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 animate-in slide-in-from-top-2 duration-300">
          <li>
            <a href="/" onClick={() => setIsOpen(false)} className="relative text-lg font-medium text-[#c9d1d9] hover:text-white transition-colors duration-300 group">
              Home
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-[2px] bg-[#58a6ff] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#58a6ff]"></span>
            </a>
          </li>
          <li>
            <a href="/projects" onClick={() => setIsOpen(false)} className="relative text-lg font-medium text-[#c9d1d9] hover:text-white transition-colors duration-300 group">
              My Projects
              <span className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-[2px] bg-[#58a6ff] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#58a6ff]"></span>
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
