"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import CardSwap, { Card } from './ui/CardSwap';

// Helper to map icons by service slug
import {
  Code, Smartphone, Cpu, Layers, Palette, Search,
  Terminal, BarChart, Database, Award, Users, Zap
} from 'lucide-react';

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

interface ServiceData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  features: string;
}

interface ServicesSectionStackProps {
  services: ServiceData[];
}

export default function ServicesSectionStack({ services }: ServicesSectionStackProps) {
  return (
    <div className="w-full flex items-center justify-center py-12 relative overflow-hidden min-h-[500px]">
      <div className="relative w-full max-w-4xl h-[450px] flex items-center justify-center overflow-visible">
        <CardSwap
          width="100%"
          height="100%"
          cardDistance={50}
          verticalDistance={30}
          delay={4000}
          pauseOnHover={true}
          skewAmount={4}
          easing="elastic"
        >
          {services.map((service, i) => {
            const IconComponent = getServiceIcon(service.slug);
            const featuresList = service.features
              ? service.features.split(',').map((f) => f.trim()).slice(0, 4)
              : [];

            return (
              <Card
                key={service.id}
                className="flex flex-col lg:flex-row h-full w-full rounded-[2.5rem] p-8 sm:p-10 bg-white border border-slate-200 shadow-2xl justify-between gap-8 group select-none text-left"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brandGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Left Side: Content */}
                <div className="flex flex-col justify-between w-full lg:w-[50%] h-full relative z-10 text-brandDark">
                  <div className="space-y-4">
                    {/* Icon & Title Row */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brandGreen/10 border border-brandGreen/25 flex items-center justify-center text-brandGreen">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold tracking-widest text-[#EF8E01] uppercase">Service {i + 1} of {services.length}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit tracking-tight group-hover:text-brandGreen transition-colors leading-tight">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-biooris line-clamp-3 lg:line-clamp-4">
                      {service.shortDescription}
                    </p>

                    {/* Features checkmarks list */}
                    {featuresList.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {featuresList.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-brandGreen flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 lg:pt-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brandGreen hover:bg-brandGreenHover text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-brandGreen/25 space-x-2"
                      aria-label={`Explore details for ${service.title}`}
                    >
                      <span>Explore details <span className="sr-only">for {service.title}</span></span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Image */}
                <div className="relative hidden md:block w-full lg:w-[46%] h-[240px] lg:h-full rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                  <div className="w-full h-full">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </Card>
            );
          })}
        </CardSwap>
      </div>
    </div>
  );
}
