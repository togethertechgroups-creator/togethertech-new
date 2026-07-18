import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Check } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Together Tech',
  description: 'Together Tech Privacy Policy. Learn how we collect, use, store, and protect your personal information when visiting our website or using our services.',
  alternates: { canonical: 'https://www.togethertechgroups.in/privacy' },
  openGraph: {
    title: 'Privacy Policy | Together Tech',
    description: 'Together Tech Privacy Policy. Learn how we protect your personal information.',
    url: 'https://www.togethertechgroups.in/privacy',
    siteName: 'Together Tech',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="space-y-0">
      {/* Hero Header */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4 pt-8">
          <span className="text-emerald-100 font-extrabold text-sm uppercase tracking-wider">Security & Trust</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-neogen">Privacy Policy</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Last Updated: July 18, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Policy Body */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                1. Introduction
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                Welcome to Together Tech ("we," "our," "us"). We value your privacy and are committed to protecting your personal data. This Privacy Policy describes how we collect, use, and safeguard your information when you visit our website, <Link href="/" className="text-brandGreen hover:underline">togethertechgroups.in</Link>, or enquire about our software development, website design, mobile apps, or digital marketing services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                2. Information We Collect
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                We may collect personal information that you voluntarily provide to us when you fill out contact forms, service inquiry forms, or contact us via WhatsApp and phone. This information includes:
              </p>
              <ul className="space-y-2 text-sm text-brandGray font-medium pl-4">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brandGreen flex-shrink-0" />
                  <span>Name, email address, mobile number, and business details.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brandGreen flex-shrink-0" />
                  <span>Details of requested service, estimated budget, and custom messages.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brandGreen flex-shrink-0" />
                  <span>Log data, IP addresses, browser types, and page visit durations collected via analytics.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                3. How We Use Your Information
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                We use the gathered information to provide custom quotes, optimize platform speeds, and improve your user experience. Specifically, we use it for:
              </p>
              <ul className="space-y-2 text-sm text-brandGray font-medium pl-4">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brandGreen flex-shrink-0" />
                  <span>Responding to business callback requests and scheduling technical discussions.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brandGreen flex-shrink-0" />
                  <span>Developing, testing, and improving the features of our website and client dashboards.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brandGreen flex-shrink-0" />
                  <span>Preventing security breaches, spam submissions, or fraudulent activities.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                4. Data Protection & Security
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                We apply comprehensive technical and administrative security measures to protect your database entries from unauthorized access, modification, or disclosure. All data transmissions are encrypted using standard SSL/TLS tunnels, and local storage configurations are strictly audited.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                5. Third-Party Sharing & Cookies
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                We do not sell, trade, or transfer your personally identifiable information to outside parties. This does not include trusted hosting partners (e.g., Vercel) or web analytics tools (e.g., Google Analytics) that help us run our web operations, provided those partners agree to maintain privacy standards.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">
                6. Contact Information
              </h2>
              <p className="text-brandGray leading-relaxed font-medium">
                If you have questions regarding this Privacy Policy or data deletion requests, you can contact us:
              </p>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 mt-4 text-sm font-bold text-brandDark space-y-1 max-w-sm">
                <p>Together Tech Groups</p>
                <p className="text-brandGray font-medium">Email: togethertechgroups@gmail.com</p>
                <p className="text-brandGray font-medium">Phone: +91 90475 49682</p>
                <p className="text-brandGray font-medium">Address: IT Corridor, Chennai, India</p>
              </div>
            </div>
          </div>

          {/* Sidebar Affordance */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              <h3 className="font-extrabold text-xl text-brandDark border-l-4 border-brandGreen pl-3">Security Standards</h3>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: 'SSL Encrypted', desc: 'Secure HTTPS layer active for all communications.' },
                  { icon: Lock, title: 'GDPR Compliant', desc: 'Control your personal data anytime.' },
                  { icon: Eye, title: 'Zero Tracking', desc: 'We do not run behavioral profiling ads on this site.' }
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
