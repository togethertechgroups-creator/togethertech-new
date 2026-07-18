import Link from 'next/link';
import { Home, ArrowRight, HelpCircle, FileText, PhoneCall } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Together Tech',
  description: 'The page you are looking for does not exist on Together Tech. Browse our services or contact us for custom software and website development.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-24 text-center relative overflow-hidden bg-brandDark">
      {/* Decorative Glow Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brandGreen/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-xl space-y-8 relative z-10">
        {/* Large 404 Graphic */}
        <div className="relative inline-block select-none">
          <h1 className="text-8xl md:text-9xl font-black tracking-widest text-slate-800 font-neogen">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl md:text-5xl font-black text-brandGreen font-outfit drop-shadow-[0_0_15px_rgba(112,179,63,0.5)]">
              LOST
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-outfit">
            Oops! Page Not Found
          </h2>
          <p className="text-brandGray text-sm md:text-base leading-relaxed font-medium">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
          </p>
        </div>

        {/* Technical Error Code Badge */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xxs font-mono text-brandGreen uppercase tracking-wider">
          STATUS: 404_NOT_FOUND
        </div>

        {/* Quick Links / CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-brandGreen hover:bg-brandGreenHover text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brandGreen/10"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            href="/services"
            className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-800"
          >
            <span>View Services</span>
            <ArrowRight className="w-4 h-4 text-brandGreen" />
          </Link>
        </div>

        {/* Help Directory Links */}
        <div className="pt-8 border-t border-slate-900/60 max-w-sm mx-auto flex justify-around text-xxs font-bold text-brandGray uppercase tracking-wider">
          <Link 
            href="/contact" 
            className="hover:text-brandGreen flex items-center space-x-1.5 transition-colors"
            aria-label="Enquire about our packages or services"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Enquire <span className="sr-only">about our packages or services</span></span>
          </Link>
          <Link href="/blog" className="hover:text-brandGreen flex items-center space-x-1.5 transition-colors">
            <FileText className="w-3.5 h-3.5" />
            <span>Blog</span>
          </Link>
          <Link href="/about" className="hover:text-brandGreen flex items-center space-x-1.5 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>About</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
