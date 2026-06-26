import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Check, X, Info } from 'lucide-react';

export const metadata = {
  title: 'Pricing Packages | Together Tech Groups',
  description: 'View our transparent web development pricing packages, features, and detailed package comparison tables.',
};

export const revalidate = 0; // Dynamic server rendering

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
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Development Packages</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Choose a standard plan or combine features for custom software builds.
          </p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-7xl mx-auto px-6 space-y-24">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative bg-white border ${pkg.isRecommended
                    ? 'border-2 border-brandGreen bg-brandGreenLight shadow-md lg:scale-105 z-10'
                    : 'border-slate-200/80 shadow-sm'
                  }`}
              >
                {pkg.isRecommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brandGreen text-white text-xxs font-black uppercase tracking-widest shadow-md">
                    Most Popular
                  </span>
                )}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-2xl text-brandDark">{pkg.packageName}</h3>
                    <p className="text-xs text-brandGray leading-relaxed min-h-[40px]">{pkg.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 pb-4">
                    <span className="text-4xl font-black tracking-tight text-brandDark">{pkg.price}</span>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.split(',').map((feat: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2.5 text-xs text-brandDark/90">
                        <Check className="w-4.5 h-4.5 text-brandGreen flex-shrink-0 mt-0.5" />
                        <span>{feat.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8">
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.packageName)}`}
                    className={`w-full py-3.5 rounded-xl font-bold text-center block text-sm transition-all duration-300 ${pkg.isRecommended
                        ? 'bg-brandGreen hover:bg-brandGreenHover text-white shadow-md shadow-brandGreen/25'
                        : 'bg-slate-100 hover:bg-brandGreen hover:text-white text-brandDark border border-slate-200'
                      }`}
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h2 className="text-3xl font-black text-brandDark tracking-tight">Feature Comparison Table</h2>
              <p className="text-brandGray text-sm font-medium">Review the complete parameters of our standard plans.</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brandGreen text-white text-sm font-bold border-b border-slate-200">
                    <th className="p-6">Core Features</th>
                    <th className="p-6 text-center">Basic Plan (₹7,000)</th>
                    <th className="p-6 text-center">Semi-Custom (₹12,000)</th>
                    <th className="p-6 text-center">Fully Custom (₹20,000+)</th>
                  </tr>
                </thead>
                <tbody className="text-brandGray text-xs font-semibold divider-y">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-6 font-extrabold text-brandDark">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? <Check className="w-5 h-5 text-brandGreen mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-brandGreen font-extrabold">{row.basic}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.semi === 'boolean' ? (
                          row.semi ? <Check className="w-5 h-5 text-brandGreen mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-brandGreen font-extrabold">{row.semi}</span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.custom === 'boolean' ? (
                          row.custom ? <Check className="w-5 h-5 text-brandGreen mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-brandGreen font-extrabold">{row.custom}</span>
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
