export const metadata = {
  title: 'OmLang | The Modern Programming Language',
  description: 'OmLang is an open-source, multi-target programming language supporting Web, APK, and Local execution with built-in matrix logic.',
  keywords: ['OmLang', 'Programming Language', 'Compiler', 'Open Source', 'Matrix Math', 'Web IDE'],
  openGraph: {
    title: 'OmLang | Write Once, Run Anywhere',
    description: 'Explore the next generation of programming with OmLang.',
    url: 'https://omlang.com', // পরে আপনার আসল ডোমেইন দেবেন
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
