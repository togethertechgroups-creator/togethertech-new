'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ArcRevealHero from './ArcRevealHero';
import { CinematicHero } from './ui/cinematic-hero';
import ServicesSectionStack from './ServicesSectionStack';
import ProcessTimeline from './ProcessTimeline';
import {
  ArrowRight, Check, MessageCircle, Phone, Star,
  HelpCircle, ChevronDown, Award, Users, ShieldCheck,
  Zap, Code, Smartphone, Cpu, Layers, Palette, Search,
  Terminal, BarChart, Database, Tag, TrendingUp, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ui/ProjectCard';
import PackageSkewCard from './ui/PackageSkewCard';

// Helper to map icons by service slug
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

// Animation path order for the jumping ball:
// Down the left column first: 0 (Experienced Team), 2 (Proven Track Record), 4 (Professional Design), 6 (SEO-Ready Setup)
// Then down the right column: 1 (Customized Solutions), 3 (Full-Service Support), 5 (Mobile-Friendly Grid), 7 (Instant Chat Integrations)
const ANIMATION_PATH = [0, 2, 4, 6, 1, 3, 5, 7];

interface HomeClientProps {
  services: any[];
  portfolios: any[];
  packages: any[];
  teamMembers: any[];
  testimonials: any[];
}

export default function HomeClient({
  services,
  portfolios,
  packages,
  teamMembers,
  testimonials,
}: HomeClientProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [portfolioFilter, setPortfolioFilter] = useState('All');



  const faqs = [
    {
      q: 'What services does Together Tech provide?',
      a: 'Together Tech provides Website Development, Software Development, Mobile App Development, Digital Marketing, SEO Services, Meta Ads Management, UI/UX Design, Branding, and Custom IT Solutions.',
    },
    {
      q: 'Why choose Together Tech?',
      a: 'Together Tech delivers scalable software, modern websites, high-performance mobile applications, and data-driven digital marketing solutions tailored to your business goals.',
    },
    {
      q: 'Who needs website development?',
      a: 'Startups, small businesses, enterprises, restaurants, healthcare providers, educational institutions, eCommerce businesses, and service-based companies.',
    },
    {
      q: 'How much does website development cost?',
      a: 'Website development costs vary depending on the number of pages, required features, integrations, and custom functionality.',
    },
    {
      q: 'How many days will it take to complete a website?',
      a: 'Basic websites are completed within 5-7 days. Semi-custom websites with admin panels take around 10-15 days. Fully custom platforms or mobile apps take between 20-40 days depending on complexity.',
    },
    {
      q: 'Do you provide an admin panel?',
      a: 'Yes! For our Semi-Custom and Fully Custom packages, we provide a secure, easy-to-use admin panel where you can manage services, portfolios, team details, blogs, and view customer enquiries in real-time.',
    },
    {
      q: 'Do you provide SEO?',
      a: 'Yes, all our websites include basic SEO configuration. For our Semi-Custom and Custom plans, we implement advanced on-page SEO, sitemaps, structured schemas, and connect Google Search Console to rank you higher on search results.',
    },
    {
      q: 'Do you provide mobile app development?',
      a: 'Absolutely! We build high-performance mobile applications for Android and iOS using cross-platform frameworks like Flutter, ensuring smooth native-feel rendering, push alerts, and secure databases.',
    },
    {
      q: 'Do you provide digital marketing?',
      a: 'Yes, we manage Google Ads, Meta Ads (Facebook/Instagram), brand identity campaigns, lead generation funnels, and search rankings to scale your customer base and drive conversions.',
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const filteredPortfolios = portfolioFilter === 'All'
    ? portfolios
    : portfolios.filter(p => p.category === portfolioFilter);

  const categories = ['All', ...Array.from(new Set(portfolios.map((p: any) => p.category).filter(Boolean)))];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <ArcRevealHero storageKey="togethertech-splash-done">
      <div className="space-y-0">
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white pt-24 pb-16">
          {/* Full Screen Background Image (Only visible on Desktop, behaves as original) */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden lg:block">
            <img
              src="/images/hero.png"
              alt="TogetherTech Hero Background"
              className="w-full h-full object-cover object-[104%_center]"
            />
            <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl float-element" style={{ animationDelay: '2s' }} />

            {/* Abstract Green Corner Curves to match the Foodied UI */}
            <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-brandGreen/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brandGreen/5 blur-xl" />
          </div>

          {/* Background curves on Mobile/Tablet */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none lg:hidden">
            <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-brandGreen/5 blur-xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-brandGreen/5 blur-xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Text & CTAs & Mobile Mockup & Feature Boxes */}
              <div className="lg:col-span-6 text-left space-y-6 relative z-10">
                
                {/* Badge */}
                <div className="flex justify-start">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center space-x-2 bg-brandGreenLight border border-brandGreen/20 px-4 py-1.5 rounded-full text-brandGreen"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-brandGreen animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Turning Ideas Into Real Digital Solutions</span>
                  </motion.div>
                </div>

                {/* Heading (Increased size on mobile: text-4xl) */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-neogen tracking-tight text-brandDark text-left leading-tight"
                >
                  Custom Software, Website & <br />
                  <span className="text-[#0038BD]">Mobile App</span> <span className="text-brandGreen">Development</span> Company
                </motion.h1>

                {/* Paragraph (Increased size and weight on mobile: text-base font-semibold) */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-base md:text-lg text-brandGray max-w-2xl text-left font-semibold leading-relaxed font-biooris"
                >
                  We Create Professional Websites, Mobile Apps, Custom Software, Branding, SEO, and Digital Marketing Solutions That Help Your Business Grow Faster.
                </motion.p>

                {/* Action buttons (stacked on mobile, row on tablet/desktop) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-2 w-full max-w-md"
                >
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-brandGreen hover:bg-brandGreenHover text-white font-bold tracking-wide transition-all duration-300 shadow-md shadow-brandGreen/20 flex items-center justify-center space-x-2 text-sm uppercase"
                  >
                    <span>Get Free Quote</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-brandDark font-bold tracking-wide border border-slate-200 transition-all duration-300 flex items-center justify-center text-sm uppercase"
                  >
                    View Our Works
                  </Link>
                </motion.div>

                {/* Quick trust points / Feature boxes (Responsive grid: 2-col on all viewports) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="grid grid-cols-2 gap-2 sm:gap-4 pt-8 border-t border-slate-200 w-full"
                >
                  {[
                    {
                      label: 'Fast Delivery',
                      desc: '5-15 Days Turnaround',
                      icon: Zap,
                      iconColor: 'text-[#70B33F]',
                      bgColor: 'bg-emerald-50/50',
                      borderColor: 'border-emerald-100/30'
                    },
                    {
                      label: 'Affordable Pricing',
                      desc: 'Transparent Quote',
                      icon: Tag,
                      iconColor: 'text-blue-600',
                      bgColor: 'bg-blue-50/50',
                      borderColor: 'border-blue-100/30'
                    },
                    {
                      label: 'Custom Design',
                      desc: 'Zero Templates',
                      icon: Palette,
                      iconColor: 'text-[#0038BD]',
                      bgColor: 'bg-indigo-50/50',
                      borderColor: 'border-indigo-100/30'
                    },
                    {
                      label: 'Growth Support',
                      desc: '24/7 Digital Scaling',
                      icon: TrendingUp,
                      iconColor: 'text-amber-600',
                      bgColor: 'bg-amber-50/50',
                      borderColor: 'border-amber-100/30'
                    },
                  ].map((pt, i) => {
                    const IconComponent = pt.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#70B33F]/25 hover:shadow-lg transition-all duration-300 group cursor-pointer w-full text-left"
                      >
                        <div className={`p-1.5 sm:p-2.5 rounded-xl border ${pt.bgColor} ${pt.borderColor} flex-shrink-0 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`w-4 h-4 sm:w-5 h-5 ${pt.iconColor}`} />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <h3 className="font-extrabold text-brandDark text-[11px] sm:text-sm tracking-tight font-outfit leading-tight truncate">{pt.label}</h3>
                          <p className="text-[9px] sm:text-[10px] text-brandGreen font-bold uppercase tracking-wider leading-snug truncate">{pt.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Right Column: Spacer on desktop to let full background render on the right */}
              <div className="hidden lg:block lg:col-span-6" />

            </div>
          </div>
        </section>


        {/* CINEMATIC HERO SECTION */}
        <CinematicHero
          brandName="Together Tech"
          tagline1="Develop the future,"
          tagline2="not just the code."
          cardHeading="Welcome to Together Universe"
          cardDescription={<><span className="text-white font-semibold font-neogen">Together Tech</span> empowers growing business ecosystems with custom software, cloud operations, and premium UI/UX design.</>}
          metricValue={100}
          metricLabel="Projects Delivered"
          ctaHeading="Launch your vision."
          ctaDescription="Partner with a team of top-tier professionals and bring your software products to life today."
        />

        {/* 2. SERVICES PREVIEW SECTION */}
        <section className="pt-24 pb-8 bg-[url('/images/services-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed text-brandDark overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Our Expertise</span>
              <h2 className="text-3xl md:text-5xl text-brandDark font-rustic">Services We Offer</h2>
              <p className="text-brandDark font-medium font-biooris">We design and construct high-performance digital solutions to resolve complex business bottlenecks.</p>
            </div>

            {/* Desktop & Tablet Stacked Cards */}
            <div className="hidden md:block">
              <ServicesSectionStack services={services} />
            </div>

            {/* Mobile: Vertical List (One by one cards) */}
            <div className="block md:hidden space-y-6 py-6">
              {services.map((service, i) => {
                const IconComponent = getServiceIcon(service.slug);
                const featuresList = service.features
                  ? service.features.split(',').map((f: string) => f.trim()).slice(0, 4)
                  : [];

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="p-6 rounded-3xl bg-white border border-slate-100 shadow-lg flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Icon & Title Row */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brandGreen/10 border border-brandGreen/25 flex items-center justify-center text-brandGreen">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-[#EF8E01] uppercase">Service {i + 1} of {services.length}</span>
                      </div>

                      <h3 className="text-xl font-extrabold font-outfit text-brandDark">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed font-biooris">
                        {service.shortDescription}
                      </p>

                      {/* Features list */}
                      {featuresList.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                          {featuresList.map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center space-x-1.5 text-[10px] text-slate-700">
                              <Check className="w-3 h-3 text-brandGreen flex-shrink-0" />
                              <span className="truncate">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl bg-brandGreen hover:bg-brandGreenHover text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 space-x-2"
                      >
                        <span>Explore details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center">
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-brandGreen hover:bg-brandGreenHover text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-md shadow-brandGreen/25"
              >
                <span>View All 13 Services</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CORE EXPERTISE (H2 headings for each service) */}
        <section className="py-24 bg-white text-brandDark relative overflow-hidden md:hidden">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Our Verticals</span>
              <h2 className="text-3xl md:text-5xl text-brandDark font-rustic">Our Service Verticals</h2>
              <p className="text-brandGray font-medium leading-relaxed font-biooris">We specialize in these 8 core divisions to deliver premium digital systems for your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Website Development Services', slug: 'website-development', desc: 'Custom responsive designs, eCommerce sites, corporate portals, and landing pages with Next.js.', icon: Code },
                { title: 'Software Development Services', slug: 'software-development', desc: 'Bespoke CRM, ERP software, inventory systems, and business automation software for startups.', icon: Database },
                { title: 'Mobile App Development', slug: 'mobile-app-development', desc: 'High-performance cross-platform Android and iOS mobile app development using Flutter.', icon: Smartphone },
                { title: 'Digital Marketing Services', slug: 'digital-marketing', desc: 'Social media marketing, performance marketing, brand campaigns, and conversions.', icon: Users },
                { title: 'SEO Services', slug: 'seo-services', desc: 'On-page audits, local SEO, technical SEO, and schema configuration to rank in Google & AI search.', icon: Search },
                { title: 'Meta Ads Management', slug: 'meta-ads-management', desc: 'Targeted lead generation campaigns on Facebook and Instagram with pixel optimization.', icon: Zap },
                { title: 'UI UX Design', slug: 'ui-ux-design', desc: 'High-fidelity Figma prototypes, design systems, wireframes, and intuitive user experiences.', icon: Palette },
                { title: 'Branding & Graphic Design', slug: 'branding-graphic-design', desc: 'Logo design, corporate identity guides, visual graphics, and marketing creatives.', icon: Award },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-brandGreen/35 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-brandGreen/10 border border-brandGreen/25 flex items-center justify-center text-brandGreen">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-lg font-extrabold font-outfit text-brandDark">
                        {item.title}
                      </h2>
                      <p className="text-xs text-brandGray leading-relaxed font-biooris">{item.desc}</p>
                    </div>
                    <Link href={`/services/${item.slug}`} className="text-xs font-bold text-brandGreen hover:text-brandGreenHover flex items-center space-x-1.5 pt-2">
                      <span>Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. WHY CHOOSE US - AWSM AGENCY STYLE */}
        <section
          className="relative py-24 bg-white text-brandDark overflow-hidden border-y border-slate-100"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(15,23,42,0.06) 1px, transparent 0)",
            backgroundSize: "24px 24px"
          }}
        >
          {/* Abstract Decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path d="M0,0 Q50,0 100,50" fill="none" stroke="black" strokeWidth={0.5} />
            </svg>
          </div>
          <div className="absolute top-4 right-4 w-12 h-12 opacity-20 grid grid-cols-4 gap-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            ))}
          </div>

          <div className="max-w-6xl mx-auto px-6 flex flex-col justify-between">
            {/* Header / Logo */}
            <div className="w-full flex justify-center lg:justify-start mb-12">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-black tracking-tighter flex flex-row items-baseline gap-2 leading-none text-brandDark">
                  <span className="font-rustic">Together.</span>
                  <span className="text-[10px] tracking-[0.25em] uppercase font-black opacity-70">Tech Groups</span>
                </h2>
              </div>
            </div>

            {/* Title Section (Single line, left aligned on desktop) */}
            <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-end justify-between mb-20 gap-8">
              <div className="text-center lg:text-left z-10">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 font-outfit text-brandDark">
                  <span className="tracking-tight">WHY</span>
                  <span className="text-brandGreen tracking-tight">CHOOSE</span>
                  <span className="flex items-center gap-3 sm:gap-4">
                    <span className="bg-brandGreen text-white rounded-full p-2 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 shadow-md">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="tracking-tight">TOGETHER TECH</span>
                  </span>
                </h2>
              </div>
              <div className="absolute right-4 lg:right-12 top-0 opacity-10 select-none pointer-events-none">
                <span className="text-[120px] md:text-[200px] font-black leading-none text-brandDark block transform translate-x-4 -translate-y-12">?</span>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto">
              {[
                {
                  title: 'Customized Solutions',
                  icon: Code,
                  desc: 'We build tailored platforms from the ground up. Zero rigid templates, ensuring complete scaling and an identity that is uniquely yours.',
                  colSpan: 'md:col-span-2 lg:col-span-2',
                  badges: ['React', 'Next.js', 'Tailwind', 'Node.js']
                },
                {
                  title: 'Experienced Team',
                  icon: Users,
                  desc: 'A dedicated group of senior architects and designers averaging 5+ years of real-world industry experience.',
                  colSpan: 'md:col-span-1 lg:col-span-1'
                },
                {
                  title: 'Professional Design',
                  icon: Palette,
                  desc: 'Pixel-perfect UI prototypes and wireframes crafted in Figma with deep contrast and clean typography.',
                  colSpan: 'md:col-span-1 lg:col-span-1'
                },
                {
                  title: 'Proven Track Record',
                  icon: Award,
                  desc: 'Dozens of successful production launches with guaranteed reliability and performance outcomes.',
                  colSpan: 'md:col-span-1 lg:col-span-1'
                },
                {
                  title: 'SEO-Ready Setup',
                  icon: Search,
                  desc: 'Pre-configured semantic structures, custom meta elements, XML sitemaps, and optimized image compression for organic search engine indexing.',
                  colSpan: 'md:col-span-2 lg:col-span-2',
                  checkmarks: ['Google Search Console', 'XML Sitemaps', 'Semantic HTML5', 'Alt Attributes']
                },
                {
                  title: 'Mobile-Friendly Grid',
                  icon: Smartphone,
                  desc: 'Fluid layouts and flexible grids that scale smoothly across mobile devices, tablets, and wide desktop displays.',
                  colSpan: 'md:col-span-1 lg:col-span-1'
                },
                {
                  title: 'Instant Chat Integrations',
                  icon: MessageCircle,
                  desc: 'Direct customer routing to WhatsApp business chat, custom contact callback forms, and automated email notifications.',
                  colSpan: 'md:col-span-1 lg:col-span-1'
                },
                {
                  title: 'Full-Service Support',
                  icon: ShieldCheck,
                  desc: 'Complete end-to-end management, covering requirements gathering, design, domain configurations, servers, and security updates.',
                  colSpan: 'md:col-span-1 lg:col-span-1'
                }
              ].map((pill, index) => {
                const IconComponent = pill.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.04, ease: [0.215, 0.61, 0.355, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                    className={`relative p-[1.5px] overflow-hidden rounded-[2rem] bg-slate-200/80 shadow-sm flex transition-all duration-300 group ${pill.colSpan}`}
                  >
                    {/* Rotating light beam border */}
                    <div
                      className="absolute inset-[-1000%] bg-[conic-gradient(from_0deg,#22c55e_0%,#EF8E01_25%,transparent_50%,#22c55e_75%,#22c55e_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ animation: 'spin 6s linear infinite' }}
                    />

                    {/* Inner Card Content */}
                    <div className="relative bg-white p-8 rounded-[1.92rem] flex flex-col justify-between h-full w-full z-10">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-brandGreen/10 border border-brandGreen/25 flex items-center justify-center text-brandGreen mb-6 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-extrabold text-brandDark mb-3 group-hover:text-brandGreen transition-colors">
                          {pill.title}
                        </h3>
                        <p className="text-xs text-brandGray font-medium leading-relaxed">
                          {pill.desc}
                        </p>
                      </div>

                      {/* Extra elements for col-span-2 items */}
                      {pill.badges && (
                        <div className="flex flex-wrap gap-2 mt-6">
                          {pill.badges.map((badge) => (
                            <span
                              key={badge}
                              className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      {pill.checkmarks && (
                        <div className="grid grid-cols-2 gap-2 mt-6">
                          {pill.checkmarks.map((check) => (
                            <div
                              key={check}
                              className="flex items-center space-x-1.5 text-[10px] text-slate-500 font-bold"
                            >
                              <Check className="w-3.5 h-3.5 text-brandGreen flex-shrink-0" />
                              <span className="truncate">{check}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Let's Build Together CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 8 * 0.04, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                className="relative p-[1.5px] overflow-hidden rounded-[2rem] bg-brandGreen/20 shadow-md shadow-brandGreen/10 flex transition-all duration-300 group md:col-span-2 lg:col-span-2"
              >
                {/* Rotating light beam border for CTA */}
                <div
                  className="absolute inset-[-1000%] bg-[conic-gradient(from_0deg,#ffffff_0%,#EF8E01_25%,transparent_50%,#EF8E01_75%,#ffffff_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ animation: 'spin 6s linear infinite' }}
                />

                <div className="relative bg-gradient-to-br from-brandGreen to-[#5c9930] p-8 rounded-[1.92rem] text-white flex flex-col justify-between h-full w-full z-10">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                      <Zap className="w-6 h-6 animate-pulse" />
                    </div>
                    <h3 className="text-xl font-black mb-3">
                      Ready to launch your project?
                    </h3>
                    <p className="text-xs text-emerald-100 font-medium leading-relaxed max-w-md">
                      Get in touch for a free project consultation and absolute clarity on timeline and cost estimates within 24 hours.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-brandGreen font-bold text-xs uppercase tracking-wider transition-colors duration-300 space-x-2 shadow-sm"
                    >
                      <span>Enquire Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer banner */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mt-4 border-t border-slate-200 pt-8 text-brandDark">
              <div className="text-xl font-bold tracking-wide order-2 md:order-1 font-outfit">
                +91 90475 49682
              </div>
              <div className="order-1 md:order-2">
                <Link
                  href="/contact"
                  className="bg-brandGreen text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-brandGreenHover transition-colors duration-300 inline-block shadow-md shadow-brandGreen/25"
                >
                  Contact Us
                </Link>
              </div>
              <div className="order-3">
                <a
                  className="bg-brandDark text-white border border-slate-700/30 px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all font-biooris"
                  href="https://www.togethertechgroups.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.togethertechgroups.in
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* OUR PROCESS SECTION */}
        <section className="py-24 bg-brandDark text-white relative overflow-hidden border-t border-slate-900">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brandGreen/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF7A00]/3 blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">How We Deliver</span>
              <h2 className="text-3xl md:text-5xl text-white font-rustic">Our Process</h2>
              <p className="text-slate-300 font-medium font-biooris">A systematic, transparent, and collaborative design and engineering workflow.</p>
            </div>

            <ProcessTimeline />
          </div>
        </section>

        {/* INDUSTRIES WE SERVE SECTION */}
        <section className="py-24 bg-slate-50 text-brandDark relative overflow-hidden border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Who We Support</span>
              <h2 className="text-3xl md:text-5xl text-brandDark font-rustic mt-2">Industries We Serve</h2>
              <p className="text-brandGray font-medium font-biooris">Engineering custom software and digital portals for a diverse range of business sectors.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: 'Startups & SMEs', desc: 'SaaS, MVP designs & websites', icon: Zap },
                { name: 'Ecommerce Brands', desc: 'Custom stores & checkout routes', icon: Tag },
                { name: 'Healthcare Providers', desc: 'Clinics, dentists & booking portals', icon: Heart },
                { name: 'Restaurants & Cafes', desc: 'Contactless ordering POS & menus', icon: Layers },
                { name: 'Education & Schools', desc: 'Portals, calendars & class guides', icon: Award },
                { name: 'Service Providers', desc: 'Booking forms & local SEO landing pages', icon: Smartphone }
              ].map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 text-center hover:border-brandGreen/35 hover:shadow-md transition-all space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-brandGreen/10 flex items-center justify-center text-brandGreen mx-auto">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-sm text-brandDark font-outfit">{ind.name}</h3>
                    <p className="text-[10px] text-brandGray leading-relaxed">{ind.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. PORTFOLIO PREVIEW SECTION */}
        <section className="py-24 bg-slate-50 text-brandDark">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-4">
                <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Our Showcase</span>
                <h2 className="text-3xl md:text-5xl text-brandDark font-rustic">Recent Projects</h2>
              </div>
              {/* Filter tags (Starbucks circular layout) */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilter(cat)}
                    className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${portfolioFilter === cat
                      ? 'bg-brandGreen text-white shadow-md shadow-brandGreen/20'
                      : 'bg-white text-brandGray hover:bg-slate-100 border border-slate-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolios.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. PACKAGES PREVIEW SECTION */}
        <section className="py-24 bg-[#0B0F19] text-white relative overflow-hidden border-t border-slate-900">
          {/* Subtle background glow lights */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brandGreen/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Simple Invoicing</span>
              <h2 className="text-3xl md:text-5xl text-white font-rustic">Our Development Packages</h2>
              <p className="text-white/90 font-medium font-biooris">Select a predefined structure or contact us for a customized development plan.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 items-stretch">
              {packages.map((pkg) => (
                <PackageSkewCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. TEAM PREVIEW */}
        <section className="py-24 bg-slate-50 text-brandDark border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Creative Brains</span>
              <h2 className="text-3xl md:text-5xl text-brandDark font-mitshuka">Meet Our Team</h2>
              <p className="text-brandDark font-medium font-biooris">A group of young, highly-skilled professionals turning concepts into software.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm p-6 space-y-6 text-center hover:shadow-md hover:border-brandGreen/20 transition-all duration-300"
                >
                  {/* Team avatar mockup with double border leaf aesthetic */}
                  <div className="w-24 h-24 rounded-full bg-brandGreenLight mx-auto flex items-center justify-center text-brandGreen text-3xl font-black border-4 border-brandGreen shadow-md">
                    {member.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-xl text-brandDark">{member.name}</h3>
                    <p className="text-xs text-brandGreen font-bold tracking-wider uppercase">{member.role}</p>
                  </div>
                  <p className="text-xs text-brandGray leading-relaxed min-h-[60px]">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.skills.split(',').map((skill: string, index: number) => (
                      <span key={index} className="px-2 py-0.5 rounded-md bg-slate-100 text-brandDark text-xxs font-bold">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. TESTIMONIALS SECTION */}
        <section className="py-24 bg-white text-brandDark relative border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Social Proof</span>
              <h2 className="text-3xl md:text-5xl text-brandDark font-mitshuka">Client Feedback</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-6 flex flex-col justify-between hover:border-brandGreen/30 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < test.rating ? 'text-brandGreen fill-brandGreen' : 'text-slate-350'
                            }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-brandGray italic leading-relaxed">
                      "{test.review}"
                    </p>
                  </div>
                  <div className="border-t border-slate-200/80 pt-4">
                    <h4 className="font-extrabold text-brandDark">{test.clientName}</h4>
                    <p className="text-xxs text-brandGreen font-semibold uppercase tracking-wider">{test.businessName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section className="py-24 bg-slate-50 text-brandDark border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6 space-y-16">
            <div className="text-center space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Got Questions?</span>
              <h2 className="text-3xl md:text-5xl text-brandDark font-rustic mt-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-lg text-brandDark hover:text-brandGreen transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brandGreen' : ''
                          }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-sm text-brandGray leading-relaxed border-t border-slate-100 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9. FINAL CTA SECTION */}
        <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,#88c44f,transparent_45%)]" />
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-mitshuka">Ready to Grow Your Business Online?</h2>
            <p className="text-lg text-emerald-50 max-w-2xl mx-auto leading-relaxed">
              Contact us today to receive a dynamic prototype, free quotation, and roadmap on how to deploy your customized system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-brandDark text-brandGreen hover:text-white font-bold tracking-wide transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/919047549682?text=Hi%20Together%20Tech%20Groups,%20I%20need%20details%20about%20website%20development.%20Please%20contact%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold tracking-wide transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-700" />
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </ArcRevealHero>
  );
}
