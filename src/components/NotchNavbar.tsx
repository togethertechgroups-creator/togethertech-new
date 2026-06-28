"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, User, Layers, Briefcase, Tag, Users, 
  BookOpen, Mail, Menu, X, Code, ArrowRight 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Helper component for navigation links
const NavLink = ({ 
  href, 
  icon: Icon, 
  label, 
  isActive 
}: { 
  href: string; 
  icon: React.ComponentType<{ className?: string }>; 
  label: string;
  isActive: boolean;
}) => (
  <Link 
    href={href} 
    className={cn(
      "group flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap relative py-1",
      isActive ? "text-[#EF8E01] font-bold" : "text-slate-300 hover:text-white"
    )}
  >
    <Icon className={cn("w-4 h-4 transition-opacity", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")} />
    <span>{label}</span>
    {isActive && (
      <motion.span
        layoutId="activeNavLine"
        className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-[#EF8E01]"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
  </Link>
)

export function NotchNavbar({ className, ...props }: React.HTMLAttributes<HTMLElement> & { logo?: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Symmetrical navigation items config matching Together Tech routes
  const items = {
    left: [
      { label: "Home", href: "/", icon: Home },
      { label: "About", href: "/about", icon: User },
      { label: "Services", href: "/services", icon: Layers },
      { label: "Portfolio", href: "/portfolio", icon: Briefcase }
    ],
    right: [
      { label: "Packages", href: "/packages", icon: Tag },
      { label: "Team", href: "/team", icon: Users },
      { label: "Blog", href: "/blog", icon: BookOpen },
      { label: "Contact", href: "/contact", icon: Mail }
    ]
  }

  return (
    <>
      <header className={cn("fixed top-0 inset-x-0 z-50 h-16 flex px-0 select-none", className)} {...props}>
        
        {/* Left Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-[#0b1224]/95 backdrop-blur-md z-20 relative min-w-0 border-b border-slate-800/40">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
          </svg>
        </div>

        {/* Responsive Notch Container - 3 Slices */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">
          
          {/* Left Slice (Corner Curve) */}
          <div className="w-[50px] h-full relative shrink-0">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[#0b1224]/95 backdrop-blur-md" style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth={0.5} className="text-slate-700" />
              <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="currentColor" strokeOpacity={0.1} strokeWidth={0.5} className="text-slate-700" />
            </svg>
          </div>

          {/* Center Slice (Flexible Content Area) */}
          <div className="flex-1 h-full relative min-w-[500px] md:min-w-[700px] lg:min-w-[850px] -ml-px">
             {/* Background & Lines Layer */}
             <div className="absolute inset-0 bg-[#0b1224]/95 backdrop-blur-md">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                   <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="currentColor" strokeOpacity={0.15} strokeWidth={0.5} className="text-slate-700" />
                   <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="currentColor" strokeOpacity={0.1} strokeWidth={0.5} className="text-slate-700" />
                 </svg>
             </div>

             {/* Content Layer */}
             <div className="relative w-full h-full flex items-end justify-between pb-2 px-4 md:px-8">
               
               {/* Desktop Left Nav */}
               <nav className="hidden md:flex gap-6 lg:gap-8 mb-1 shrink-0">
                {items.left.map(item => (
                  <NavLink key={item.label} {...item} isActive={pathname === item.href} />
                ))}
              </nav>

              {/* Mobile Menu Button (Left) */}
              <button 
                className="md:hidden mb-1 p-1 text-slate-300 hover:text-[#EF8E01] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>



              {/* Desktop Right Nav */}
              <nav className="hidden md:flex gap-6 lg:gap-8 mb-1 shrink-0">
                {items.right.map(item => (
                  <NavLink key={item.label} {...item} isActive={pathname === item.href} />
                ))}
              </nav>

             </div>
          </div>

          {/* Right Slice (Corner Curve) */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[#0b1224]/95 backdrop-blur-md" style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth={0.5} className="text-slate-700" />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="currentColor" strokeOpacity={0.1} strokeWidth={0.5} className="text-slate-700" />
            </svg>
          </div>

        </div>

        {/* Right Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-[#0b1224]/95 backdrop-blur-md z-20 relative min-w-0 border-b border-slate-800/40 -ml-px">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-white" />
          </svg>
        </div>

      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0b1224]/95 backdrop-blur-md border-b border-slate-800 p-4 md:hidden shadow-lg select-none"
          >
             <nav className="flex flex-col gap-2">
               {/* Combine all items */}
               {[...items.left, ...items.right].map(item => {
                 const isActive = pathname === item.href;
                 return (
                   <Link 
                     key={item.label} 
                     href={item.href}
                     className={cn(
                       "flex items-center gap-3 p-3 rounded-lg transition-colors",
                       isActive 
                         ? "bg-[#EF8E01] text-white font-bold" 
                         : "text-slate-300 hover:bg-slate-800/40 hover:text-white"
                     )}
                     onClick={() => setIsMobileMenuOpen(false)}
                   >
                     <item.icon className="w-5 h-5 opacity-80" />
                     <span className="text-sm font-medium">{item.label}</span>
                   </Link>
                 );
               })}
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NotchNavbar
