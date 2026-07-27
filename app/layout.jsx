import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'OmLang | The Modern Programming Language',
  description: 'OmLang is an open-source, multi-target programming language...',
  verification: {
    google: 'ViFkQdkRUnzWSJQ2Nyxhn0ntjw_cndqipV2e1WmN2Xc',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a1128] text-white font-sans min-h-screen">
        {/* মেনুবার / নেভিগেশন */}
        <nav className="flex justify-between items-center p-5 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md">
          <div className="text-xl font-bold text-[#00f2fe]">OMLANG</div>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-[#00f2fe] transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-[#00f2fe] transition-colors">My Projects</Link>
            </li>
          </ul>
        </nav>

        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
