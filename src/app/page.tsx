import { prisma } from '@/lib/db';
import HomeClient from '@/components/HomeClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Together Tech | #1 Software, Website & Mobile App Development Company in Chennai',
  description: 'Together Tech is a leading IT Services company in Chennai offering Website Development, Software Development, Mobile App Development, SEO, Digital Marketing, UI/UX Design & Branding across India. Get a free quote today.',
  keywords: [
    'Website Development Company Chennai', 'Software Development Company Chennai',
    'Mobile App Development Company India', 'Best Web Design Company Chennai',
    'Digital Marketing Agency Chennai', 'SEO Company Chennai',
    'Flutter App Development', 'ERP Software Development India',
    'CRM Software Development', 'Ecommerce Website Development Chennai',
    'Custom Software Development India', 'UI UX Design Company',
    'Branding Agency Chennai', 'Meta Ads Agency India',
    'Google Ads Agency Chennai', 'IT Services Company India',
  ],
  alternates: {
    canonical: 'https://togethertechgroups.in',
  },
  openGraph: {
    title: 'Together Tech | Software, Website & Mobile App Development Company',
    description: 'Together Tech delivers premium Website Development, Software, Mobile Apps, Digital Marketing, SEO & UI/UX Design for businesses across India. Trusted by 50+ brands.',
    url: 'https://togethertechgroups.in',
    siteName: 'Together Tech',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://togethertechgroups.in/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Together Tech - Software Development, Website Development & Digital Marketing Company',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Together Tech | Software & Website Development Company',
    description: 'Together Tech — Premium software, websites, mobile apps, branding, and digital marketing services across India.',
    images: ['https://togethertechgroups.in/images/og-image.jpg'],
  },
};

export const revalidate = 60; // Cache and revalidate every 60 seconds (ISR)

export default async function Home() {
  const services = await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    take: 6,
    orderBy: { createdAt: 'asc' },
  });

  const portfolios = await prisma.portfolio.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
  });

  const packages = await prisma.package.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { price: 'asc' },
  });

  const teamMembers = await prisma.teamMember.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'asc' },
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { status: 'ACTIVE' },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <HomeClient
      services={services}
      portfolios={portfolios}
      packages={packages}
      teamMembers={teamMembers}
      testimonials={testimonials}
    />
  );
}
