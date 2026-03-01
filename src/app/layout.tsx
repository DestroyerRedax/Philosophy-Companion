import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Philosophy Companion',
  description: 'A premium academic tool for exploring philosophical concepts.',
  manifest: '/manifest.json',
  themeColor: '#141415',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Philosophy Companion',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}
