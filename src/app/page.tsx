import { prisma } from '@/lib/db';
import HomeClient from '@/components/HomeClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Together Tech | Software Development, Website Development & Digital Marketing Company',
  description: 'Together Tech provides Website Development, Software Development, Mobile App Development, Digital Marketing, SEO, Meta Ads, UI/UX Design, Branding, and Custom IT Solutions for businesses across India.',
  alternates: {
    canonical: 'https://togethertechgroups.in',
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
