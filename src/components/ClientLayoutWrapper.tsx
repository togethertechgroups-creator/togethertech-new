'use client';

import NotchNavbar from './NotchNavbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import SplashLoader from './SplashLoader';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashLoader />
      <NotchNavbar />
      <main className="min-h-screen pt-0 pb-0 bg-brandDark text-slate-100 overflow-x-hidden w-full">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
