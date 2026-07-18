"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, Layers, Briefcase, Tag, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({
  href,
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      "group flex items-center gap-1.5 text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap relative py-1.5 px-3 rounded-full",
      isActive
        ? "text-[#EF8E01] font-bold"
        : "text-slate-600 hover:text-brandDark hover:bg-slate-100"
    )}
  >
    <Icon className={cn("w-4 h-4 transition-opacity", isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100")} />
    <span>{label}</span>
    {isActive && (
      <motion.span
        layoutId="activeNavLine"
        className="absolute -bottom-1 left-3 right-3 h-0.5 bg-[#EF8E01] rounded-full"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </Link>
);

const allItems = [
  { label: "Home",      href: "/",          icon: Home },
  { label: "About",     href: "/about",     icon: User },
  { label: "Services",  href: "/services",  icon: Layers },
  { label: "Portfolio", href: "/portfolio", icon: Briefcase },
  { label: "Packages",  href: "/packages",  icon: Tag },
  { label: "Contact",   href: "/contact",   icon: Mail },
];

export function NotchNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-center pt-5 px-4 transition-all duration-300"
      >
        {/* Pill Container */}
        <div
          className={cn(
            "w-full max-w-5xl flex items-center justify-between gap-4 px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 bg-white/90 backdrop-blur-md",
            scrolled
              ? "border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
              : "border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          )}
        >
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/images/logo.webp"
              alt="Together Tech Logo"
              width={36}
              height={36}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-md"
              priority
            />
            <span className="font-neogen text-xs sm:text-sm md:text-base tracking-normal leading-none font-bold">
              <span className="text-[#0038BD]">Together</span>
              <span className="text-brandGreen">Tech</span>
            </span>
          </Link>

          {/* Center: Desktop Nav (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-1.5">
            {allItems.map((item) => (
              <NavLink key={item.label} {...item} isActive={pathname === item.href} />
            ))}
          </nav>

          {/* Right: CTA Button and Mobile Hamburger (Always visible CTA, hamburger only on Mobile) */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-brandGreen hover:bg-brandGreenHover text-brandDark text-xs sm:text-sm font-extrabold transition-all duration-200 shadow-md shadow-brandGreen/30 shrink-0"
            >
              Get a Quote
            </Link>

            <button
              className="md:hidden p-1.5 text-slate-500 hover:text-brandDark transition-colors rounded-full hover:bg-slate-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown (Floating Rounded Card) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-4 top-20 z-40 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-1">
              {allItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl transition-colors",
                      isActive
                        ? "bg-[#EF8E01]/10 text-[#EF8E01] font-bold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-brandDark"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4 opacity-80" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-2 flex items-center justify-center gap-2 p-3 rounded-xl bg-brandGreen text-brandDark font-extrabold text-sm transition-all hover:bg-brandGreenHover"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NotchNavbar;
