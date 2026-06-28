'use client';

import { useState } from 'react';
import Link from 'next/link';
import ArcRevealHero from './ArcRevealHero';
import { CinematicHero } from './ui/cinematic-hero';
import {
  ArrowRight, Check, MessageCircle, Phone, Star,
  HelpCircle, ChevronDown, Award, Users, ShieldCheck,
  Zap, Code, Smartphone, Cpu, Layers, Palette, Search,
  Terminal, BarChart, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to map icons by service slug
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
      q: 'How much does a website cost?',
      a: 'A basic website starts at ₹7,000. Semi-custom dynamic websites range from ₹10,000 to ₹15,000, and fully custom enterprise platforms or e-commerce websites start from ₹20,000 depending on your exact requirements and integrations.',
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

  const categories = ['All', 'Websites', 'Apps', 'Software', 'UI/UX'];

  return (
    <ArcRevealHero storageKey="togethertech-splash-done">
      <div className="space-y-0">
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white pt-24 pb-16">
          {/* Full Screen Background Image */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img
              src="/images/hero.png"
              alt="TogetherTech Hero Background"
              className="w-full h-full object-cover object-[80%_center] lg:object-[104%_center]"
            />
            <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl float-element" style={{ animationDelay: '2s' }} />

            {/* Abstract Green Corner Curves to match the Foodied UI */}
            <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-brandGreen/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brandGreen/5 blur-xl pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Text & CTAs */}
              <div className="lg:col-span-6 text-left space-y-6 bg-white/75 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-100/50 lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-none relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center space-x-2 bg-brandGreenLight border border-brandGreen/20 px-4 py-1.5 rounded-full text-brandGreen"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-brandGreen animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider">Turning Ideas Into Real Digital Solutions</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-neogen tracking-tight text-brandDark leading-tight"
                >
                  Build Your Digital Future <br className="hidden sm:inline" />
                  With <span className="text-[#0038BD]">Together</span> <span className="text-brandGreen">Tech</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base md:text-lg text-brandGray max-w-2xl font-medium leading-relaxed font-biooris"
                >
                  We Create Professional Websites, Mobile Apps, Custom Software, Branding, SEO, and Digital Marketing Solutions That Help Your Business Grow Faster.
                </motion.p>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-4 pt-2"
                >
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-brandGreen hover:bg-brandGreenHover text-white font-bold tracking-wide transition-all duration-300 shadow-md shadow-brandGreen/20 flex items-center justify-center space-x-2"
                  >
                    <span>Get Free Quote</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-brandDark font-bold tracking-wide border border-slate-200 transition-all duration-300 flex items-center justify-center"
                  >
                    View Our Works
                  </Link>
                </motion.div>

                {/* Quick trust points */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-200"
                >
                  {[
                    { label: 'Fast Delivery', desc: '5-15 Days Turnaround' },
                    { label: 'Affordable Pricing', desc: 'Transparent Quote' },
                    { label: 'Custom Design', desc: 'Zero Templates' },
                    { label: 'Growth Support', desc: '24/7 Digital Scaling' },
                  ].map((pt, i) => (
                    <div key={i} className="space-y-1">
                      <h3 className="font-extrabold text-brandDark text-sm">{pt.label}</h3>
                      <p className="text-xxs text-brandGreen font-bold uppercase tracking-wider">{pt.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Column: Spacer to let the background image show through */}
              <div className="hidden lg:block lg:col-span-6" />

            </div>
          </div>
        </section>

        {/* STARBUCKS-STYLE RIBBON BANNER */}
        <div className="ribbon-container bg-white border-y border-slate-100">
          <div className="ribbon-banner">
            <div className="ribbon-text">
              <span>TOGETHER TECH GROUPS • YOUR GROWTH, OUR TECHNOLOGY • WEBSITES • MOBILE APPS • CUSTOM SOFTWARE • UI/UX DESIGN • SEO • DIGITAL MARKETING •&nbsp;</span>
            </div>
            <div className="ribbon-text">
              <span>TOGETHER TECH GROUPS • YOUR GROWTH, OUR TECHNOLOGY • WEBSITES • MOBILE APPS • CUSTOM SOFTWARE • UI/UX DESIGN • SEO • DIGITAL MARKETING •&nbsp;</span>
            </div>
          </div>
        </div>

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
        <section className="py-24 bg-slate-50 text-brandDark">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Our Expertise</span>
              <h2 className="text-3xl md:text-5xl text-brandDark font-rustic">Services We Offer</h2>
              <p className="text-[#EF8E01] font-medium font-biooris">We design and construct high-performance digital solutions to resolve complex business bottlenecks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((svc) => {
                const IconComp = getServiceIcon(svc.slug);
                return (
                  <motion.div
                    key={svc.id}
                    whileHover={{ y: -8 }}
                    className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brandGreen/30 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-6">
                      <div className="w-14 h-14 rounded-2xl bg-brandGreenLight flex items-center justify-center text-brandGreen">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-extrabold text-2xl text-brandDark group-hover:text-brandGreen transition-colors">{svc.title}</h3>
                        <p className="text-sm text-brandGray leading-relaxed line-clamp-3">{svc.shortDescription}</p>
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

        {/* 3. WHY CHOOSE US */}
        <section className="py-24 bg-white text-brandDark relative overflow-hidden border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">The Advantage</span>
              <h2 className="text-3xl md:text-5xl font-rustic">Why Partner With Us?</h2>
              <p className="text-[#EF8E01] font-medium font-biooris">We deliver enterprise-quality execution at prices designed for growing business ecosystems.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: 'Professional Design', desc: 'Figma prototypes built completely from scratch matching your exact brand aesthetics.' },
                { icon: Smartphone, title: 'Mobile-Friendly', desc: 'Fluid response grid across phones, tablets, laptops, and wide screen monitors.' },
                { icon: Search, title: 'SEO-Ready Development', desc: 'Pre-optimized title structures, meta, indexing sitemaps, and search settings.' },
                { icon: Cpu, title: 'Custom Admin Panel', desc: 'Manage your portfolio, team, reviews, and enquiries through a secure private dashboard.' },
                { icon: Zap, title: 'Affordable Pricing', desc: 'Clear transparent packages with zero hidden developer maintenance charges.' },
                { icon: Award, title: 'Fast Delivery', desc: 'Rigorous sprint logs ensuring your website launches on-time and with stability.' },
                { icon: Users, title: 'Complete Support', desc: 'Daily tracking, hosting configurations, corporate mailboxes, and marketing advisory.' },
                { icon: MessageCircle, title: 'Chat Integrations', desc: 'Instant floating call triggers and pre-configured WhatsApp customer templates.' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 hover:border-brandGreen/30 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brandGreenLight flex items-center justify-center text-brandGreen">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-xl text-brandDark">{item.title}</h3>
                    <p className="text-xs text-brandGray leading-relaxed">{item.desc}</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPortfolios.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md group transition-all duration-300"
                >
                  {/* Project Image placeholder */}
                  <div className="h-64 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-brandDark/85 to-transparent z-10 opacity-70" />
                    <div className="text-center z-20 p-6">
                      <span className="px-3 py-1 rounded-full bg-brandGreen text-white font-extrabold text-xxs uppercase tracking-widest">{project.category}</span>
                      <h3 className="font-extrabold text-2xl text-white mt-3">{project.projectName}</h3>
                      <p className="text-xs text-brandGreenLight mt-1 font-semibold">{project.clientName}</p>
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <p className="text-sm text-brandGray leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.split(',').map((tech: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-brandDark font-bold text-xxs tracking-wide">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 flex justify-between items-center">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="inline-flex items-center text-sm font-bold text-brandGreen hover:text-brandGreenHover transition-colors space-x-2"
                      >
                        <span>View Project Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PACKAGES PREVIEW SECTION */}
        <section className="py-24 bg-white text-brandDark relative border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Simple Invoicing</span>
              <h2 className="text-3xl md:text-5xl text-brandDark font-rustic">Our Development Packages</h2>
              <p className="text-[#EF8E01] font-medium font-biooris">Select a predefined structure or contact us for a customized development plan.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${pkg.isRecommended
                    ? 'bg-brandGreenLight border-2 border-brandGreen shadow-md lg:scale-105 z-10'
                    : 'bg-white border border-slate-200/80 hover:border-brandGreen/35'
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
          </div>
        </section>

        {/* 6. TEAM PREVIEW */}
        <section className="py-24 bg-slate-50 text-brandDark border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5">Creative Brains</span>
              <h2 className="text-3xl md:text-5xl text-brandDark font-mitshuka">Meet Our Team</h2>
              <p className="text-[#EF8E01] font-medium font-biooris">A group of young, highly-skilled professionals turning concepts into software.</p>
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
                href="https://wa.me/919876543210?text=Hi%20Together%20Tech%20Groups,%20I%20need%20details%20about%20website%20development.%20Please%20contact%20me."
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
      </div>
    </ArcRevealHero>
  );
}
