import { prisma } from '@/lib/db';
import PortfolioClient from '@/components/PortfolioClient';

export const metadata = {
  title: 'Portfolio | Together Tech — Web, App & Software Projects',
  description: 'Explore Together Tech\'s project portfolio — custom websites, mobile apps, POS software, eCommerce platforms, and branding work delivered for clients across India.',
  keywords: ['Together Tech Portfolio', 'Web Development Projects India', 'App Development Portfolio', 'Software Development Case Studies'],
  alternates: { canonical: 'https://togethertechgroups.in/portfolio' },
  openGraph: {
    title: 'Portfolio | Together Tech — Web, App & Software Projects',
    description: 'Browse our work — custom websites, mobile apps, POS software, eCommerce platforms, and branding delivered for clients across India.',
    url: 'https://togethertechgroups.in/portfolio',
    siteName: 'Together Tech',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://togethertechgroups.in/images/og-image.jpg', width: 1200, height: 630, alt: 'Together Tech Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Together Tech',
    description: 'Browse our custom website, app, and software projects.',
    images: ['https://togethertechgroups.in/images/og-image.jpg'],
  },
};

export const revalidate = 60; // Cache and revalidate every 60 seconds (ISR)

export default async function PortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
  });

  return <PortfolioClient portfolios={portfolios} />;
}
