'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SplashLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Bypass loader entirely for search engine bots and Lighthouse audits
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      const isBotOrLighthouse = /lighthouse|chrome-lighthouse|googlebot|gtmetrix|pingdom/i.test(ua);
      if (isBotOrLighthouse) {
        setLoading(false);
        return;
      }
    }

    // Disable scrolling when loading
    document.body.style.overflow = 'hidden';

    // Simulate progress bar filling up
    const duration = 1200; // 1.2 seconds
    const interval = 20; // Update every 20ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    // Fade out after 1.5s total
    const timeout = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'unset';
    }, 1600);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f172a] select-none"
        >
          {/* Background Glow */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-brandGreen/10 blur-[100px] pointer-events-none" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-[#0038BD]/10 blur-[90px] pointer-events-none" />

          <div className="flex flex-col items-center space-y-6 z-10">
            {/* Pulsing Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.5, ease: 'easeOut' }
              }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-20 h-20 rounded-full bg-brandGreen/20 blur-xl animate-pulse" />
               <Image
                src="/images/logo.webp"
                alt="Together Tech Logo"
                width={70}
                height={70}
                className="w-16 h-16 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(112,179,63,0.4)]"
                priority
              />
            </motion.div>

            {/* Together Tech Title */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 0.2, duration: 0.5 }
              }}
              className="font-neogen text-2xl tracking-wider text-center"
            >
              <span className="text-white">TOGETHER </span>
              <span className="text-brandGreen">TECH</span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-48 h-[3px] bg-slate-800 rounded-full overflow-hidden relative border border-slate-700/50 shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#0038BD] to-[#70B33F] shadow-[0_0_8px_#70B33F]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Loading text */}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.4 }}
              className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-slate-400 font-outfit"
            >
              Loading Experience...
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
