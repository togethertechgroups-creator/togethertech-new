import { prisma } from '@/lib/db';
import HomeClient from '@/components/HomeClient';

export const revalidate = 0; // Dynamic server rendering

export default async function Home() {
  const services = await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    take: 6,
    orderBy: { createdAt: 'asc' },
  });

  const portfolios = await prisma.portfolio.findMany({
    where: { status: 'ACTIVE' },
    take: 4,
    orderBy: { createdAt: 'asc' },
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
