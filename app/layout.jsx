import './globals.css';
import Navbar from './Navbar'; // 👈 নতুন মেনুবার ইমপোর্ট করা হলো

export const metadata = {
  title: 'OmLang | The Modern Programming Language',
  description: 'OmLang is an open-source, multi-target programming language supporting Web, APK, and Local execution with built-in matrix logic.',
  keywords: ['OmLang', 'Programming Language', 'Compiler', 'Open Source', 'Matrix Math', 'Web IDE'],
  verification: {
    google: 'ViFkQdkRUnzWSJQ2Nyxhn0ntjw_cndqipV2e1WmN2Xc',
  },
  openGraph: {
    title: 'OmLang | Write Once, Run Anywhere',
    description: 'Explore the next generation of programming with OmLang.',
    url: 'https://omlang.quarry.dpdns.org', 
    siteName: 'OmLang',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a1128] text-white font-sans min-h-screen">
        {/* 👇 এখানে মেনুবার যুক্ত করা হলো 👇 */}
        <Navbar />

        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
