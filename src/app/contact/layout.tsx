import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Quote — Together Tech',
  description: 'Contact Together Tech for website development, software development, mobile app development, SEO, digital marketing, and IT services. Get a free project quote today.',
  keywords: [
    'Contact Together Tech', 'Get a Quote IT Services', 'Website Development Quote',
    'Software Development Contact', 'Digital Marketing Agency Contact Chennai'
  ],
  alternates: { canonical: 'https://www.togethertechgroups.in/contact' },
  openGraph: {
    title: 'Contact Us | Get a Free Quote — Together Tech',
    description: 'Reach out to Together Tech for a free quote on website development, software, mobile apps, SEO & digital marketing services.',
    url: 'https://www.togethertechgroups.in/contact',
    siteName: 'Together Tech',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://www.togethertechgroups.in/images/og-image.jpg', width: 1200, height: 630, alt: 'Contact Together Tech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Together Tech | Free Quote',
    description: 'Get a free project quote from Together Tech — websites, apps, software, SEO & marketing.',
    images: ['https://www.togethertechgroups.in/images/og-image.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
