import Link from 'next/link';
import { FileCheck, Coins, Award, Scale } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Together Tech',
  description: 'Together Tech Terms of Service. Understand the rules, guidelines, service scopes, and agreements governing the use of our services and website.',
  alternates: { canonical: 'https://www.togethertechgroups.in/terms' },
  openGraph: {
    title: 'Terms of Service | Together Tech',
    description: 'Together Tech Terms of Service. Learn about service scopes, billing terms, and software agreements.',
    url: 'https://www.togethertechgroups.in/terms',
    siteName: 'Together Tech',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="space-y-0">
      {/* Hero Header */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4 pt-8">
          <span className="text-emerald-100 font-extrabold text-sm uppercase tracking-wider">Our Agreement</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-neogen">Terms of Service</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Last Updated: July 18, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Terms Body */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                By accessing this website (<Link href="/" className="text-brandGreen hover:underline">togethertechgroups.in</Link>) or purchasing our software, mobile applications, website development, or digital marketing services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you must cease using our website and services immediately.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                2. Scope of Services
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                Together Tech provides custom technology solutions including:
              </p>
              <ul className="space-y-2 text-sm text-brandGray font-medium pl-4">
                <li>• **Website Development:** Dynamic, responsive, and SEO-optimized business websites.</li>
                <li>• **Custom Software:** Tailored ERP, CRM, inventory dashboards, and desktop billing tools.</li>
                <li>• **Mobile Apps:** Cross-platform Flutter developments for Android and iOS systems.</li>
                <li>• **Digital Marketing & SEO:** Google Ads, Meta Ads management, and local search listing optimization.</li>
              </ul>
              <p className="text-brandGray leading-relaxed font-medium">
                Schedules, feature lists, and deliverables are defined per contract and client proposal before coding begins.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                3. Payment, Billing, & Refunds
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                Payments are processed in Indian Rupees (INR) or agreed foreign currency bank transfers. Transparent tier structures apply:
              </p>
              <ul className="space-y-2 text-sm text-brandGray font-medium pl-4">
                <li>• **Milestone Payments:** Project pricing is divided into milestones (typically 40% advance, 40% design-development approval, 20% launch).</li>
                <li>• **Website Packages:** Basic website tier starts at ₹7,000; Semi-Custom dynamic sites start from ₹12,000; Custom enterprise applications start from ₹20,000.</li>
                <li>• **Refunds:** Advance design setup costs are non-refundable once visual layout tasks have been initiated.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                4. Intellectual Property & Ownership
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                Upon full clearance of final billing, intellectual property rights, database schemas, custom styling codes, and domain ownership are completely transferred to the client. Together Tech retains the right to display screenshots or project titles in our portfolios as design proof of work.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                5. Client Responsibilities
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                The client agrees to provide required company text assets, brand logos, active contact emails, and product imagery on schedule. Together Tech is not responsible for launch delays resulting from missing client media assets or store listing compliance rejections out of our code jurisdiction.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                6. Governing Law
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                These Terms of Service shall be governed by and construed in accordance with the laws of India, under the jurisdiction of courts in Chennai, Tamil Nadu.
              </p>
            </div>
          </div>

          {/* Sidebar Affordance */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              <h3 className="font-extrabold text-xl text-brandDark border-l-4 border-brandGreen pl-3">Contract Policies</h3>
              <div className="space-y-6">
                {[
                  { icon: FileCheck, title: 'Scope Verification', desc: 'Sprints and tasks are strictly mapped out.' },
                  { icon: Coins, title: 'Transparent Fees', desc: 'No hidden hosting, coding, or maintenance charges.' },
                  { icon: Award, title: 'Code Ownership', desc: 'You own 100% of custom files after project payoff.' },
                  { icon: Scale, title: 'Governing Law', desc: 'Chennai jurisdiction rules apply.' }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brandGreenLight flex items-center justify-center text-brandGreen flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-brandDark">{item.title}</h4>
                        <p className="text-xxs text-brandGray leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
