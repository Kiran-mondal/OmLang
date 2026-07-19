import './globals.css'; // <-- This is the magic line that activates Tailwind CSS

export const metadata = {
  title: 'OmLang | The Modern Programming Language',
  description: 'OmLang is an open-source, multi-target programming language supporting Web, APK, and Local execution with built-in matrix logic.',
  keywords: ['OmLang', 'Programming Language', 'Compiler', 'Open Source', 'Matrix Math', 'Web IDE'],
  openGraph: {
    title: 'OmLang | Write Once, Run Anywhere',
    description: 'Explore the next generation of programming with OmLang.',
    url: 'https://omlang.quarry.dpdns.org', // Updated to your actual custom domain
    siteName: 'OmLang',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
