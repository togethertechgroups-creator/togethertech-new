import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import {
  ArrowRight, Check, CheckCircle2, ChevronRight, MessageCircle, Phone,
  Code, Smartphone, Cpu, Layers, Palette, Search, Terminal, BarChart, Database, Award, Zap, Users
} from 'lucide-react';

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} | Together Tech Groups`,
    description: service.shortDescription,
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service || service.status === 'INACTIVE') {
    notFound();
  }

  const IconComp = getServiceIcon(service.slug);

  // Process checklist
  const processSteps = [
    { title: '1. Discovery & Wireframing', desc: 'We align on requirements, user flows, and wireframe prototypes.' },
    { title: '2. UI/UX Design Approval', desc: 'Our designers compile Figma assets, color pallets, and layout variables for review.' },
    { title: '3. Technical Development', desc: 'We write fully responsive code, set up secure databases, and connect APIs.' },
    { title: '4. Testing & Optimizations', desc: 'We test load speeds, mobile responsiveness, and clean up meta title structures.' },
    { title: '5. Systems Deployment', desc: 'We hook up client domain systems, run final tests, and hand over access.' }
  ];

  // Specific types for website development
  const websiteTypes = [
    { name: 'Business Website', desc: '5-10 page dynamic layout representing your services and team.' },
    { name: 'Portfolio Website', desc: 'High impact single page layout showcasing client works and images.' },
    { name: 'Photography Website', desc: 'Premium image grid systems with fast loading layouts.' },
    { name: 'E-commerce Website', desc: 'Complete checkout tables, payment routes, and inventory dashboards.' },
    { name: 'Booking Website', desc: 'Automated booking forms, calendar bookings, and client email triggers.' },
    { name: 'Custom Enterprise Suite', desc: 'Custom databases, external API routing, and high availability systems.' }
  ];

  return (
    <div className="space-y-0">

      {/* Dynamic Header */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-8">
          <div className="flex items-center space-x-2 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-4">
            <Link href="/services" className="hover:underline">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{service.title}</span>
          </div>
          <div className="max-w-4xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <IconComp className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">{service.title}</h1>
            <p className="text-lg md:text-xl text-emerald-55 leading-relaxed max-w-3xl">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Details & Forms */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left Columns - Details */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-brandDark tracking-tight border-b-2 border-brandGreen pb-2">Overview</h2>
              <p className="text-brandGray leading-relaxed font-medium">
                {service.fullDescription}
              </p>
            </div>

            {/* If Website Development, show types */}
            {service.slug === 'website-development' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-brandDark tracking-tight">Types of Websites We Build</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {websiteTypes.map((type, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200">
                      <h4 className="font-extrabold text-brandDark text-lg">{type.name}</h4>
                      <p className="text-xs text-brandGray mt-1 leading-relaxed">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Features list */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-brandDark tracking-tight">Service Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.split(',').map((feat: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-brandGreen flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-brandGray">{feat.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Timeline */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-brandDark tracking-tight">Our Delivery Process</h3>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4">
                    <h4 className="font-black text-brandGreen text-lg whitespace-nowrap md:w-48">{step.title}</h4>
                    <p className="text-xs text-brandGray leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md sticky top-28 space-y-6">
              <div className="space-y-2 text-center">
                <h3 className="font-extrabold text-2xl text-brandDark">Enquire For Service</h3>
                <p className="text-xxs text-brandGray font-bold uppercase tracking-wider">Fill details to get a free callback</p>
              </div>

              {/* Form redirect route */}
              <form action="/contact" method="GET" className="space-y-4">
                <input type="hidden" name="service" value={service.title} />
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brandDark uppercase">Your Selected Service</label>
                  <input
                    type="text"
                    disabled
                    value={service.title}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-brandGray font-bold text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brandGreen hover:bg-brandGreenHover text-white font-bold transition-all duration-300 shadow-md shadow-brandGreen/10 text-sm flex items-center justify-center space-x-2"
                >
                  <span>Go to Enquiry Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="text-center font-bold text-xs text-slate-400 uppercase tracking-wide">Or Contact Us Directly</div>
                <div className="flex gap-2">
                  <a
                    href="https://wa.me/919876543210?text=Hi%20Together%20Tech%20Groups,%20I%20need%20details%20about%20website%20development.%20Please%20contact%20me."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="flex-1 py-3 bg-brandDark hover:bg-brandGreen text-white rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
