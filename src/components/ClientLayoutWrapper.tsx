'use client';

import { usePathname } from 'next/navigation';
import NotchNavbar from './NotchNavbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <NotchNavbar />
      <main className="min-h-screen pt-0 pb-0 bg-brandDark text-slate-100">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
