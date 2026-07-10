'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the billing admin app
    window.location.href = process.env.NEXT_PUBLIC_BILLING_URL || 'http://localhost:5173';
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-[#8ec63f] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-white font-bold text-lg tracking-wide">Opening Billing Portal...</p>
        <p className="text-gray-400 text-sm">Redirecting to Together Tech Billing</p>
      </div>
    </div>
  );
}
