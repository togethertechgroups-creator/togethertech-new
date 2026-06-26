'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Packages', href: '/packages' },
    { name: 'Team', href: '/team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent flex flex-col items-center justify-center pointer-events-none ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      {/* Floating Rounded Nav Bar */}
      <div
        className={`transition-all duration-300 bg-[#0b1224]/90 backdrop-blur-md border border-slate-800/80 shadow-lg rounded-full flex items-center justify-center pointer-events-auto relative ${
          isScrolled
            ? 'p-2 lg:py-2.5 lg:px-6'
            : 'p-3 lg:py-3 lg:px-8'
        }`}
      >
        {/* Desktop Nav - Home to Contact */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-semibold tracking-wide uppercase transition-colors duration-300 hover:text-brandGreen ${isActive ? 'text-brandGreen font-bold' : 'text-slate-300'
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-brandGreen"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-slate-300 hover:text-brandGreen transition-colors focus:outline-none flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-14 left-1/2 -translate-x-1/2 w-64 bg-[#0b1224]/95 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden p-6 z-50 pointer-events-auto"
            >
              <div className="flex flex-col space-y-4 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-bold tracking-wide uppercase transition-colors py-1 ${pathname === link.href ? 'text-brandGreen' : 'text-slate-300 hover:text-brandGreen'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
