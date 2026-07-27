"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  // মেনু খোলা বা বন্ধ রাখার স্টেট
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-5 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md relative z-50">
      <div className="text-xl font-bold text-[#00f2fe]">OMLANG</div>
      
      {/* 📱 মোবাইলের জন্য হ্যামবার্গার বাটন */}
      <button 
        className="md:hidden text-[#00f2fe] text-3xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* 💻 কম্পিউটারের জন্য ফুল মেনুবার (মোবাইলে লুকানো থাকবে) */}
      <ul className="hidden md:flex gap-6">
        <li>
          <Link href="/" className="hover:text-[#00f2fe] transition-colors">Home</Link>
        </li>
        <li>
          <Link href="/projects" className="hover:text-[#00f2fe] transition-colors">My Projects</Link>
        </li>
      </ul>

      {/* 📱 মোবাইলের জন্য ড্রপডাউন মেনু (বাটনে ক্লিক করলে দেখাবে) */}
      {isOpen && (
        <ul className="absolute top-[72px] left-0 w-full bg-[#0a1128]/95 border-b border-gray-800 flex flex-col items-center py-6 gap-6 md:hidden backdrop-blur-lg shadow-lg">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)} className="text-lg hover:text-[#00f2fe] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" onClick={() => setIsOpen(false)} className="text-lg hover:text-[#00f2fe] transition-colors">
              My Projects
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
