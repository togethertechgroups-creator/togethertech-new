import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Check, X, Info } from 'lucide-react';
import PackageSkewCard from '@/components/ui/PackageSkewCard';

export const metadata = {
  title: 'Pricing Packages | Together Tech Groups',
  description: 'View our transparent web development pricing packages, features, and detailed package comparison tables.',
};

export const revalidate = 60; // Cache and revalidate every 60 seconds (ISR)

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { price: 'asc' },
  });

  // Package comparison details
  const comparisonRows = [
    { feature: 'Number of pages', basic: 'Up to 5', semi: 'Up to 10', custom: 'Unlimited' },
    { feature: 'Responsive design', basic: true, semi: true, custom: true },
    { feature: 'Contact Form', basic: true, semi: true, custom: true },
    { feature: 'WhatsApp integration', basic: true, semi: true, custom: true },
    { feature: 'Basic SEO Setup', basic: true, semi: true, custom: true },
    { feature: 'Admin Control Panel', basic: false, semi: true, custom: true },
    { feature: 'Dynamic Gallery / Portfolio', basic: false, semi: true, custom: true },
    { feature: 'Blog & Articles Management', basic: false, semi: false, custom: true },
    { feature: 'Payment Gateway Connection', basic: false, semi: false, custom: true },
    { feature: 'Custom Booking / CRM Integration', basic: false, semi: false, custom: true },
    { feature: 'External REST API integration', basic: false, semi: false, custom: true },
  ];

  return (
    <div className="space-y-0">
      {/* Header */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4 pt-8">
          <span className="text-emerald-100 font-extrabold text-sm uppercase tracking-wider">Pricing Structures</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-neogen">Development Packages</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Choose a standard plan or combine features for custom software builds.
          </p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-24 bg-[#0B0F19] text-white relative overflow-hidden border-b border-slate-900">
        {/* Subtle background glow lights */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brandGreen/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 space-y-24 relative z-10">
          <div className="flex flex-wrap justify-center gap-8 items-stretch">
            {packages.map((pkg) => (
              <PackageSkewCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Comparison Table */}
          <div className="space-y-8 pt-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight">Feature Comparison Table</h2>
              <p className="text-slate-400 text-sm font-medium">Review the complete parameters of our standard plans.</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0B0F19]/60 backdrop-blur-xl shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brandGreen/90 text-white text-sm font-bold border-b border-white/10">
                    <th className="p-6">Core Features</th>
                    <th className="p-6 text-center">Basic Plan (₹7,000)</th>
                    <th className="p-6 text-center">Semi-Custom (₹12,000)</th>
                    <th className="p-6 text-center">Fully Custom (₹20,000+)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-350 text-xs font-semibold">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-6 font-extrabold text-white">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-rose-500 mx-auto" />
                        ) : (
                          <span className="text-emerald-400 font-extrabold">{row.basic}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.semi === 'boolean' ? (
                          row.semi ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-rose-500 mx-auto" />
                        ) : (
                          <span className="text-emerald-400 font-extrabold">{row.semi}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.custom === 'boolean' ? (
                          row.custom ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-rose-500 mx-auto" />
                        ) : (
                          <span className="text-emerald-400 font-extrabold">{row.custom}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
