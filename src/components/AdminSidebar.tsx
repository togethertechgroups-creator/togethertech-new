'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Layers, Briefcase, Tag, Users, 
  BookOpen, Star, Mail, Settings, LogOut, Menu, X, Code
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Services', href: '/admin/dashboard/services', icon: Layers },
    { name: 'Manage Portfolio', href: '/admin/dashboard/portfolio', icon: Briefcase },
    { name: 'Manage Packages', href: '/admin/dashboard/packages', icon: Tag },
    { name: 'Manage Team', href: '/admin/dashboard/team', icon: Users },
    { name: 'Manage Blogs', href: '/admin/dashboard/blogs', icon: BookOpen },
    { name: 'Manage Testimonials', href: '/admin/dashboard/testimonials', icon: Star },
    { name: 'View Enquiries', href: '/admin/dashboard/enquiries', icon: Mail },
    { name: 'Website Settings', href: '/admin/dashboard/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      const res = await fetch('/api/admin/auth', { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/login');
      }
    }
  };

  return (
    <>
      {/* Mobile Sidebar Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white text-brandDark border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <Code className="text-brandGreen w-6 h-6" />
          <span className="font-extrabold text-lg text-brandDark">TogetherTech Admin</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-brandDark hover:text-brandGreen">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-white text-brandDark border-r border-slate-200 w-64 p-6 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="hidden lg:flex items-center space-x-2 border-b border-slate-200 pb-4">
            <div className="w-9 h-9 rounded-lg bg-brandGreen flex items-center justify-center text-white shadow-sm">
              <Code className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tight text-brandDark">
              Admin<span className="text-brandGreen">Panel</span>
            </span>
          </div>

          {/* Menu links */}
          <nav className="flex flex-col space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-brandGreen text-white shadow-md shadow-brandGreen/10'
                      : 'text-brandGray hover:bg-slate-50 hover:text-brandDark'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
