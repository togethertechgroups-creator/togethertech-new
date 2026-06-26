import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const hoshikoSatsuki = localFont({
  src: './fonts/HoshikoSatsuki.ttf',
  variable: '--font-hoshiko',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Together Tech Groups | Your Growth, Our Technology',
  description: 'We create professional websites, mobile apps, custom software, branding, SEO, and digital marketing solutions that help your business grow faster.',
  keywords: 'website development, mobile apps, custom software, SEO, digital marketing, brand logos, Flutter, Chennai, India',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${hoshikoSatsuki.variable} antialiased bg-brandDark text-slate-100`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
