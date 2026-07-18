import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
  metadataBase: new URL('https://www.togethertechgroups.in'),
  title: {
    default: 'Together Tech | Software Development, Website Development & Digital Marketing Company',
    template: '%s | Together Tech'
  },
  description: 'Together Tech provides Website Development, Software Development, Mobile App Development, Digital Marketing, SEO, Meta Ads, UI/UX Design, Branding, and Custom IT Solutions for businesses across India.',
  keywords: [
    // Primary — Company type
    'IT Services Company', 'Software Development Company', 'Website Development Company',
    'Web Development Company', 'Mobile App Development Company', 'Digital Marketing Agency',
    'SEO Company', 'SEO Services', 'Meta Ads Agency', 'UI/UX Design Company', 'Branding Agency',
    // Primary — Service type
    'Ecommerce Website Development', 'Custom Software Development', 'ERP Software Development',
    'CRM Software Development', 'Business Website Development', 'IT Solutions Company',
    'Flutter App Development', 'Android App Development', 'iOS App Development',
    'Web Application Development', 'Google Ads Agency', 'Social Media Marketing Agency',
    'Graphic Design Company', 'Logo Design Company',
    // Local — Chennai
    'IT Company in Chennai', 'Software Company in Chennai', 'Website Development Company in Chennai',
    'Best Web Development Company in Chennai', 'Digital Marketing Company in Chennai',
    'SEO Services in Chennai', 'Meta Ads Agency Chennai', 'Google Ads Agency Chennai',
    'Mobile App Development Company Chennai', 'Flutter Developer Chennai',
    'Software Development Company Chennai', 'Branding Agency Chennai',
    // Local — India
    'Website Development Company India', 'Software Development Company India',
    'Digital Marketing Agency India', 'Mobile App Development Company India',
    'SEO Company India', 'IT Services Company India', 'Custom Software Development India',
    // Long-tail
    'Best Website Development Company in Chennai', 'Affordable Website Development Services',
    'Custom Software Development Company', 'SEO Company for Small Business',
    'Professional Digital Marketing Agency', 'Ecommerce Website Development Company',
    'Web Application Development Services', 'Software Development Services in India',
    'Website Development Cost India', 'ERP Development Company India',
    'CRM Development Company India', 'UI UX Design Agency India',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Together Tech | Software Development, Website Development & Digital Marketing Company',
    description: 'Together Tech provides Website Development, Software Development, Mobile App Development, Digital Marketing, SEO, Meta Ads, UI/UX Design, Branding, and Custom IT Solutions for businesses across India.',
    url: 'https://www.togethertechgroups.in',
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
  verification: {
    // Add Google Search Console site verification token here when available
    // google: 'your-google-verification-token',
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
        "@type": "WebSite",
        "@id": "https://www.togethertechgroups.in/#website",
        "url": "https://www.togethertechgroups.in",
        "name": "Together Tech",
        "description": "IT Services Company — Website Development, Software, Mobile Apps, Digital Marketing & SEO",
        "publisher": { "@id": "https://www.togethertechgroups.in/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.togethertechgroups.in/?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.togethertechgroups.in/#organization",
        "name": "Together Tech",
        "alternateName": "Together Tech Groups",
        "url": "https://www.togethertechgroups.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.togethertechgroups.in/images/logo.png",
          "width": 200,
          "height": 200
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+919047549682",
          "contactType": "customer service",
          "availableLanguage": ["English", "Tamil"]
        },
        "sameAs": [
          "https://facebook.com/togethertech",
          "https://twitter.com/togethertech",
          "https://linkedin.com/company/togethertech",
          "https://www.instagram.com/togethertechofficial"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.togethertechgroups.in/#localbusiness",
        "name": "Together Tech",
        "image": "https://www.togethertechgroups.in/images/logo.png",
        "url": "https://www.togethertechgroups.in",
        "telephone": "+919047549682",
        "email": "togethertechgroups@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "VOC Street, Abith Colony, Industrial Area, Saidapet",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600015",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 13.0208,
          "longitude": 80.2241
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, UPI, Bank Transfer",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "IT Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Software Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding & Graphic Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Meta Ads Management" } }
          ]
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/Neogen-Black.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className={`${outfit.variable} ${hoshikoSatsuki.variable} ${eternalo.variable} ${rusticDelight.variable} ${neogenBlack.variable} antialiased bg-brandDark text-slate-100`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <SpeedInsights />
      </body>
    </html>
  );
}
