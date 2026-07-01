import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const hoshikoSatsuki = localFont({
  src: './fonts/HoshikoSatsuki.ttf',
  variable: '--font-hoshiko',
  display: 'swap',
});

const eternalo = localFont({
  src: './fonts/Eternalo.ttf',
  variable: '--font-eternalo',
  display: 'swap',
});

const rusticDelight = localFont({
  src: './fonts/RusticDelight.ttf',
  variable: '--font-rustic',
  display: 'swap',
});

const neogenBlack = localFont({
  src: './fonts/Neogen-Black.ttf',
  variable: '--font-neogen',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://togethertechgroups.in'),
  title: {
    default: 'Together Tech | Software Development, Website Development & Digital Marketing Company',
    template: '%s | Together Tech'
  },
  description: 'Together Tech provides Website Development, Software Development, Mobile App Development, Digital Marketing, SEO, Meta Ads, UI/UX Design, Branding, and Custom IT Solutions for businesses across India.',
  keywords: [
    'IT Services Company', 'Software Development Company', 'Website Development Company',
    'Web Development Company', 'Mobile App Development Company', 'Digital Marketing Agency',
    'SEO Company', 'SEO Services', 'Meta Ads Agency', 'UI/UX Design Company', 'Branding Agency',
    'Ecommerce Website Development', 'Custom Software Development', 'ERP Software Development',
    'CRM Software Development', 'Business Website Development', 'IT Solutions Company',
    'IT Company in Chennai', 'Software Company in Chennai', 'Website Development Company in Chennai',
    'Best Web Development Company in Chennai', 'Digital Marketing Company in Chennai',
    'SEO Services in Chennai', 'Meta Ads Agency Chennai',
    'Website Development Company India', 'Software Development Company India', 'Digital Marketing Agency India', 'Mobile App Development Company India'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Together Tech | Software Development, Website Development & Digital Marketing Company',
    description: 'Together Tech provides Website Development, Software Development, Mobile App Development, Digital Marketing, SEO, Meta Ads, UI/UX Design, Branding, and Custom IT Solutions for businesses across India.',
    url: 'https://togethertechgroups.in',
    siteName: 'Together Tech',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Together Tech - Software Development, Website Development & Digital Marketing Company',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Together Tech | Software & Website Development Company',
    description: 'Together Tech provides custom software, websites, mobile apps, branding, and digital marketing services across India.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://togethertechgroups.in/#organization",
        "name": "Together Tech",
        "url": "https://togethertechgroups.in",
        "logo": "https://togethertechgroups.in/images/logo.png",
        "sameAs": [
          "https://facebook.com/togethertech",
          "https://twitter.com/togethertech",
          "https://linkedin.com/company/togethertech",
          "https://instagram.com/togethertech"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://togethertechgroups.in/#localbusiness",
        "name": "Together Tech",
        "image": "https://togethertechgroups.in/images/logo.png",
        "url": "https://togethertechgroups.in",
        "telephone": "+919047549682",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Tech Park, IT Corridor",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600096",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 12.971598,
          "longitude": 80.245224
        },
        "priceRange": "$$"
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://togethertechgroups.in/#professionalservice",
        "name": "Together Tech",
        "image": "https://togethertechgroups.in/images/logo.png",
        "url": "https://togethertechgroups.in",
        "telephone": "+919047549682",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Tech Park, IT Corridor",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600096",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className={`${outfit.variable} ${hoshikoSatsuki.variable} ${eternalo.variable} ${rusticDelight.variable} ${neogenBlack.variable} antialiased bg-brandDark text-slate-100`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
