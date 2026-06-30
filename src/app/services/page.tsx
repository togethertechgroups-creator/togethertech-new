import Link from 'next/link';
import { prisma } from '@/lib/db';
import {
  ArrowRight, ShieldCheck, Code, Smartphone, Cpu,
  Layers, Palette, Search, Terminal, BarChart, Database, Award, Zap, Users
} from 'lucide-react';
import { FlipCard, FlipCardFront, FlipCardBack } from '@/components/ui/FlipCard';

export const metadata = {
  title: 'Our Services | Together Tech Groups',
  description: 'Explore our full suite of IT and digital marketing solutions including website development, app engineering, custom software, and SEO.',
};

export const revalidate = 60; // Cache and revalidate every 60 seconds (ISR)

const getServiceIcon = (slug: string) => {
  const iconMap: { [key: string]: any } = {
    'website-development': Code,
    'mobile-app-development': Smartphone,
    'flutter-app-development': Cpu,
    'restaurant-software': Layers,
    'crm-admin-dashboard': BarChart,
    'ui-ux-design': Palette,
    'logo-design': Award,
    'poster-design': Palette,
    'seo': Search,
    'meta-google-ads': Zap,
    'digital-marketing': Users,
  };
  return iconMap[slug] || Code;
};

const getServicePrice = (slug: string): string => {
  const priceMap: { [key: string]: string } = {
    'website-development': '₹7,000',
    'mobile-app-development': '₹15,000',
    'flutter-app-development': '₹20,000',
    'restaurant-software': '₹13,000',
    'crm-admin-dashboard': '₹15,000',
    'ui-ux-design': '₹3,000',
    'logo-design': '₹1,000',
    'poster-design': '₹1,000',
    'seo': '₹5,000',
    'meta-google-ads': '₹5,000',
    'digital-marketing': '₹8,000',
  };
  return priceMap[slug] || 'Contact Us';
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className="space-y-0 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="pt-36 pb-12 bg-slate-50 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-brandDark font-medium font-biooris text-lg md:text-xl lg:text-2xl leading-relaxed">
            We design and construct high-performance digital solutions to resolve complex business bottlenecks.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 bg-slate-50 text-brandDark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => {
              const IconComp = getServiceIcon(svc.slug);
              return (
                <FlipCard key={svc.id} className="h-[360px]">
                  <FlipCardFront className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between group h-full">
                    <div className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-brandGreenLight flex items-center justify-center text-brandGreen">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-extrabold text-2xl text-brandDark group-hover:text-brandGreen transition-colors">{svc.title}</h3>
                        <p className="text-sm text-brandGray leading-relaxed line-clamp-3">{svc.shortDescription}</p>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center text-xs font-bold text-brandGreen space-x-1.5 uppercase tracking-wider">
                      <span>Hover to Flip</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </FlipCardFront>
                  <FlipCardBack className="bg-[#EF8E01] p-8 rounded-3xl border border-orange-400/40 shadow-lg flex flex-col justify-between text-white h-full">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[10px] text-white/80 font-extrabold uppercase tracking-wider block">Starting From</span>
                        <span className="text-3xl font-black text-white block">{getServicePrice(svc.slug)}</span>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-black text-xl text-white leading-tight">{svc.title}</h4>
                        <ul className="space-y-2 text-xs text-white/90 font-bold">
                          {svc.features.split(',').slice(0, 3).map((feat: string, idx: number) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <span className="text-white">✓</span>
                              <span>{feat.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="pt-6">
                      <Link
                        href={`/services/${svc.slug}`}
                        className="w-full py-3.5 bg-brandGreen hover:bg-brandGreenHover text-white font-extrabold text-center block text-xs tracking-wider transition-colors rounded-xl shadow-md uppercase"
                      >
                        Explore Service
                      </Link>
                    </div>
                  </FlipCardBack>
                </FlipCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust points banner */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-brandGreen">100% Custom</h3>
            <p className="text-xs text-brandGray">Zero templates. We code your layout from scratch using Figma assets.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-brandGreen">SEO Setup</h3>
            <p className="text-xs text-brandGray">All services are constructed with optimized meta headers for organic indexing.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-brandGreen">Free Hosting Support</h3>
            <p className="text-xs text-brandGray">We configure your server domains, email routing, and SSL configurations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
