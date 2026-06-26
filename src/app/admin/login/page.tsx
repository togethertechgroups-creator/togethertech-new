'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, Code } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#70B33F,transparent_45%)] opacity-20" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,#70B33F,transparent_15%)] opacity-10" />

      <div className="w-full max-w-md bg-white text-brandDark p-8 md:p-10 rounded-3xl border border-slate-200 shadow-md relative z-10 space-y-8">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-brandGreen mx-auto flex items-center justify-center text-white shadow-md">
            <Code className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-brandDark">Together Tech Admin</h1>
          <p className="text-xxs text-slate-500 font-bold uppercase tracking-wider">Secure Administrative Login</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-3 text-red-800 text-xs font-bold">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xxs font-black text-brandDark uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@togethertech.in"
                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs bg-white focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/25 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xxs font-black text-brandDark uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs bg-white focus:border-brandGreen focus:ring-2 focus:ring-brandGreen/25 outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-brandGreen hover:bg-brandGreenHover text-white font-bold transition-all duration-300 shadow-md shadow-brandGreen/10 text-sm flex items-center justify-center space-x-2"
          >
            {loading ? <span>Verifying...</span> : <span>Access Dashboard</span>}
          </button>
        </form>

        <div className="text-center pt-2">
          <a href="/" className="text-xxs font-bold text-brandGreen hover:text-brandGreenHover uppercase tracking-wider transition-colors">
            ← Back to Customer Website
          </a>
        </div>
      </div>
    </div>
  );
}
