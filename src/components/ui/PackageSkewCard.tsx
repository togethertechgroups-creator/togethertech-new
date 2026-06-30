'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export interface PackageSkewCardProps {
  id: string;
  packageName: string;
  price: string;
  description: string;
  features: string;
  isRecommended: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}

export const PackageSkewCard: React.FC<{ pkg: PackageSkewCardProps }> = ({ pkg }) => {
  let gradientFrom = pkg.gradientFrom;
  let gradientTo = pkg.gradientTo;
  
  if (!gradientFrom || !gradientTo) {
    if (pkg.packageName.includes('Basic')) {
      gradientFrom = '#ffbc00';
      gradientTo = '#ff0058';
    } else if (pkg.packageName.includes('Semi')) {
      gradientFrom = '#03a9f4';
      gradientTo = '#ff0058';
    } else {
      gradientFrom = '#4dff03';
      gradientTo = '#00d0ff';
    }
  }

  return (
    <>
      <div className="group relative w-full max-w-[340px] min-h-[550px] m-4 transition-all duration-500 flex flex-col justify-between">
        {/* Skewed gradient panels */}
        <span
          className="absolute top-0 left-[40px] w-[45%] h-full rounded-2xl transform skew-x-[12deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)]"
          style={{
            background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
          }}
        />
        <span
          className="absolute top-0 left-[40px] w-[45%] h-full rounded-2xl transform skew-x-[12deg] blur-[25px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)]"
          style={{
            background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
          }}
        />

        {/* Animated blurs */}
        <span className="pointer-events-none absolute inset-0 z-10">
          <span className="absolute top-0 left-0 w-0 h-0 rounded-full opacity-0 bg-white/10 backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-700 animate-blob group-hover:top-[-40px] group-hover:left-[40px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100" />
          <span className="absolute bottom-0 right-0 w-0 h-0 rounded-full opacity-0 bg-white/10 backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-700 animate-blob animation-delay-1000 group-hover:bottom-[-40px] group-hover:right-[40px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100" />
        </span>

        {/* Recommended Badge */}
        {pkg.isRecommended && (
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest shadow-md z-30 transition-transform duration-500 group-hover:scale-105">
            Most Popular
          </span>
        )}

        {/* Content Card */}
        <div className="relative z-20 left-0 flex-grow flex flex-col justify-between p-8 bg-[#0B0F19]/90 border border-white/5 backdrop-blur-[15px] shadow-2xl rounded-2xl text-white transition-all duration-500 group-hover:left-[-12px] group-hover:p-9 group-hover:bg-[#0B0F19]/95 group-hover:border-white/10 min-h-[550px]">
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-extrabold text-2xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-colors duration-300">
                {pkg.packageName}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-biooris">
                {pkg.description}
              </p>
            </div>
            
            <div className="py-3 border-y border-white/10">
              <span className="text-3xl font-black tracking-tight text-white">{pkg.price}</span>
            </div>

            <ul className="space-y-2.5 pt-2">
              {pkg.features.split(',').map((feat, index) => (
                <li key={index} className="flex items-start space-x-2.5 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            <Link
              href={`/contact?package=${encodeURIComponent(pkg.packageName)}`}
              className="inline-block w-full text-center text-xs font-black uppercase tracking-widest text-slate-900 bg-white py-3.5 rounded-xl hover:bg-transparent hover:text-white hover:border hover:border-white/20 transition-all duration-300 shadow-md"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>

      {/* Embedded CSS rules for blobs */}
      <style>{`
        @keyframes skewBlob {
          0%, 100% { transform: translateY(8px) scale(0.95); }
          50% { transform: translate(-8px, -5px) scale(1.05); }
        }
        .animate-blob { animation: skewBlob 3s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1.5s; }
      `}</style>
    </>
  );
};

export default PackageSkewCard;
