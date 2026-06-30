import { prisma } from '@/lib/db';
import PortfolioClient from '@/components/PortfolioClient';

export const metadata = {
  title: 'Portfolio | Together Tech Groups',
  description: 'Browse our project portfolio showcasing our custom apps, business POS systems, web developments, and logo designs.',
};

export const revalidate = 60; // Cache and revalidate every 60 seconds (ISR)

export default async function PortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
  });

  return <PortfolioClient portfolios={portfolios} />;
}
