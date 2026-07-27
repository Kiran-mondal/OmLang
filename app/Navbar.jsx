"use client";
import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-[#30363d] bg-[#0d1117] relative z-50">
      <div className="text-xl font-bold text-[#c9d1d9]">OMLANG</div>
      
      {/* 📱 মোবাইলের জন্য হ্যামবার্গার বাটন */}
      <button 
        className="md:hidden text-[#c9d1d9] text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* 💻 কম্পিউটারের জন্য ফুল মেনুবার */}
      <ul className="hidden md:flex gap-6">
        <li>
          <a href="/" className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors">Home</a>
        </li>
        <li>
          <a href="/projects" className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors">My Projects</a>
        </li>
      </ul>

      {/* 📱 মোবাইলের জন্য ড্রপডাউন মেনু */}
      {isOpen && (
        <ul className="absolute top-[65px] left-0 w-full bg-[#161b22] border-b border-[#30363d] flex flex-col items-center py-6 gap-6 md:hidden shadow-lg z-50">
          <li>
            <a href="/" onClick={() => setIsOpen(false)} className="text-lg text-[#c9d1d9] hover:text-[#58a6ff] transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="/projects" onClick={() => setIsOpen(false)} className="text-lg text-[#c9d1d9] hover:text-[#58a6ff] transition-colors">
              My Projects
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
