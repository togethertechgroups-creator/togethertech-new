import Link from 'next/link';
import { prisma } from '@/lib/db';
import {
  ArrowRight, ShieldCheck, Code, Smartphone, Cpu,
  Layers, Palette, Search, Terminal, BarChart, Database, Award, Zap, Users
} from 'lucide-react';

export const metadata = {
  title: 'Our Services | Together Tech Groups',
  description: 'Explore our full suite of IT and digital marketing solutions including website development, app engineering, custom software, and SEO.',
};

export const revalidate = 0; // Dynamic server rendering

const getServiceIcon = (slug: string) => {
  const iconMap: { [key: string]: any } = {
    'website-development': Code,
    'mobile-app-development': Smartphone,
    'flutter-app-development': Cpu,
    'custom-software-development': Terminal,
    'billing-software': Database,
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
          <p className="text-[#EF8E01] font-medium font-biooris text-lg md:text-xl lg:text-2xl leading-relaxed">
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
                <div
                  key={svc.id}
                  className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-brandGreen/35 hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-brandGreenLight flex items-center justify-center text-brandGreen">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-extrabold text-2xl text-brandDark group-hover:text-brandGreen transition-colors">{svc.title}</h3>
                      <p className="text-sm text-brandGray leading-relaxed min-h-[72px] line-clamp-3">{svc.shortDescription}</p>
                    </div>
                  </div>
                  <div className="pt-8">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="inline-flex items-center text-sm font-bold text-brandGreen hover:text-brandGreenHover transition-colors space-x-2"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
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
