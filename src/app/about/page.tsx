import Link from 'next/link';
import { ArrowRight, Shield, Target, Compass, Heart } from 'lucide-react';

export const metadata = {
  title: 'About Us | Together Tech Groups',
  description: 'Together Tech Groups is a digital technology company helping businesses grow through premium websites, mobile apps, and custom software.',
};

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* Hero Header */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4 pt-8">
          <span className="text-emerald-100 font-extrabold text-sm uppercase tracking-wider">Who We Are</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">About Together Tech</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Turning bold concepts into operational, scalable, and responsive digital products.
          </p>
        </div>
      </section>

      {/* Main Content & Philosophy */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-brandDark tracking-tight leading-tight">
              We Build Solutions That Fuel Your Business Expansion.
            </h2>
            <p className="text-brandGray leading-relaxed font-medium">
              Together Tech Groups is a modern digital technology agency. We specialize in engineering premium web portfolios, secure administrative dashboards, native iOS/Android applications, and automated system workflows that eliminate bottlenecks.
            </p>
            <p className="text-brandGray/90 leading-relaxed">
              We started with a single premise: technology should serve business development, not create frustration. We combine transparent pricing models (Basic, Semi-Custom, Custom) with modern design tools (Figma, React, Flutter) to ensure our clients launch with absolute market authority.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <h3 className="font-extrabold text-2xl text-brandDark">Our Operational Pillars</h3>
            <div className="space-y-6">
              {[
                { icon: Shield, title: 'Extreme Reliability', desc: 'We deliver clean code, secure data tables, and high-availability hosting pipelines.' },
                { icon: Heart, title: 'Partner Empathy', desc: 'We coordinate closely with our clients during design phases to exceed aesthetic expectations.' },
                { icon: Target, title: 'Execution Precision', desc: 'No delayed deadlines. We schedule strict sprints and launch on schedule.' }
              ].map((pill, i) => {
                const Icon = pill.icon;
                return (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-brandGreenLight flex items-center justify-center text-brandGreen flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg text-brandDark">{pill.title}</h4>
                      <p className="text-xs text-brandGray leading-relaxed mt-1">{pill.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white text-brandDark relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200/80 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brandGreenLight flex items-center justify-center text-brandGreen">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-2xl text-brandDark">Our Mission</h3>
            <p className="text-sm text-brandGray leading-relaxed">
              To empower small and medium-scale enterprises with state-of-the-art software systems and custom digital identities that streamline administration, automate billing, and accelerate customer lead acquisition.
            </p>
          </div>

          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200/80 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brandGreenLight flex items-center justify-center text-brandGreen">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-2xl text-brandDark">Our Vision</h3>
            <p className="text-sm text-brandGray leading-relaxed">
              To become a globally trusted IT solutions partner recognized for engineering high-integrity custom CRM architectures, seamless mobile applications, and high-impact digital marketing strategies that multiply business revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 bg-slate-50 text-brandDark text-center border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-brandDark tracking-tight">Driven by Tech Innovators</h2>
          <p className="text-brandGray font-medium">
            Our developers and designers possess expert fluency in Flutter cross-platform architecture, Node.js systems, and Figma prototypes.
          </p>
          <div className="flex justify-center">
            <Link
              href="/team"
              className="inline-flex items-center px-8 py-3.5 rounded-full bg-brandGreen hover:bg-brandGreenHover text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-md shadow-brandGreen/25"
            >
              <span>Meet The Devs</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
