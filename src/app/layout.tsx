import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-bengali',
});

export const viewport: Viewport = {
  themeColor: '#141415',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Philosophy Companion',
  description: 'A premium academic tool for exploring philosophical concepts.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Philosophy Companion',
  },
  icons: {
    apple: 'https://picsum.photos/seed/phil_apple_icon/180/180',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${notoBengali.variable}`}>
      <body className="font-body antialiased selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}