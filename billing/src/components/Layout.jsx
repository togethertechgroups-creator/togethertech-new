import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function Layout({ settings, toast, theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Live clock state
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Customers', icon: 'group', path: '/customers' },
    { name: 'Quotations', icon: 'request_quote', path: '/quotations' },
    { name: 'Invoices', icon: 'receipt', path: '/invoices' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background dark:bg-primary dark:text-on-primary">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-surface-container-lowest dark:bg-surface-container-low border-r border-outline-variant dark:border-outline flex flex-col p-md h-full shrink-0">
        {/* Brand Logo */}
        <div className="flex items-center gap-sm mb-xl px-xs py-sm border-b border-outline-variant/30">
          <img
            src="/logo.webp"
            alt="Logo"
            className="w-9 h-9 object-contain shrink-0"
            style={{ maxWidth: '36px', maxHeight: '36px' }}
          />
          <div className="min-w-0">
            <h1 className="font-neogen text-lg font-bold text-primary dark:text-white leading-tight truncate">
              {settings?.businessName || 'Together Tech'}
            </h1>
            <span className="text-xs text-on-surface-variant font-label-caps font-bold uppercase tracking-widest">Billing</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-xs">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-md py-sm px-md rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-secondary text-white shadow-md'
                    : 'text-on-surface-variant dark:text-on-primary-fixed-variant hover:bg-surface-container-high dark:hover:bg-primary-container'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label-caps text-label-caps">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto pt-md border-t border-outline-variant/30 space-y-1">
          <button
            onClick={() => navigate('/invoices/create')}
            className="w-full mb-md flex items-center justify-center gap-sm bg-secondary text-on-secondary px-md py-md rounded-full font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span className="font-label-caps text-label-caps">New Invoice</span>
          </button>
          
          <Link
            to="/login"
            className="flex items-center gap-md py-sm px-md rounded-full text-on-surface-variant dark:text-on-primary-fixed-variant hover:bg-surface-container-high dark:hover:bg-primary-container text-error"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-caps text-label-caps">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopNavBar */}
        <header className="bg-surface-container-lowest dark:bg-surface-container-low border-b border-outline-variant dark:border-outline flex justify-between items-center w-full px-lg py-sm h-16 shrink-0 z-30">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                type="text"
                placeholder="Search invoices, quotes, or clients..."
                className="w-full bg-surface-container-low dark:bg-surface border-none rounded-lg pl-10 pr-md py-sm font-body-sm text-body-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Live Clock */}
          <div className="flex items-center gap-sm bg-gradient-to-r from-secondary to-primary px-lg py-sm rounded-2xl shadow-md min-w-[160px]">
            <div className="text-right">
              <p className="font-extrabold text-white text-lg leading-none tracking-tight font-data-mono">{timeStr}</p>
              <p className="text-white/70 text-[10px] font-semibold mt-[2px] tracking-wide">{dateStr}</p>
            </div>
            <div className="w-px h-8 bg-white/20 mx-xs"></div>
            <span className="material-symbols-outlined text-white/80 text-2xl">calendar_today</span>
          </div>

        </header>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto relative bg-surface dark:bg-primary">
          <Outlet />
        </main>
      </div>

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-lg right-lg bg-primary-container border border-outline dark:border-outline-variant text-white px-lg py-md rounded-xl shadow-2xl flex items-center gap-md animate-bounce z-50">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-body-md">{toast}</span>
        </div>
      )}
    </div>
  );
}
