'use client';

import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

export default function BlogNewsletter() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <section className="pt-12">
      <div className="bg-gradient-to-br from-white/[0.01] to-brandGreen/[0.02] border border-white/[0.08] p-10 md:p-16 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
          <Mail className="w-96 h-96 text-white translate-x-12 -translate-y-12" />
        </div>
        <div className="relative z-10 max-w-xl space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Stay at the Forefront</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Get the latest technical deep-dives and digital strategy shifts delivered directly to your inbox. No spam, just pure technical ingenuity.
          </p>
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <input 
              className="flex-grow bg-black/60 border border-white/[0.08] rounded-xl px-6 py-4 text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-brandGreen/25 focus:border-brandGreen transition-all outline-none" 
              placeholder="Email Address" 
              type="email"
              required
            />
            <button 
              className="px-8 py-4 rounded-xl bg-brandGreen hover:bg-brandGreenHover text-white font-bold transition-all text-sm flex items-center justify-center gap-2 shadow-md shadow-brandGreen/10 active:scale-95 cursor-pointer" 
              type="submit"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
