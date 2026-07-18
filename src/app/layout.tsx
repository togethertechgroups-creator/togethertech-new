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
    'website developers in chennai', 'app developers in chennai',
    'best website developers in chennai', 'best app developers in chennai',
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
    google: 'google214a226b5c4489ff',
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
        "@type": ["LocalBusiness", "SoftwareApplication", "ProfessionalService"],
        "@id": "https://www.togethertechgroups.in/#localbusiness",
        "name": "Together Tech",
        "legalName": "Together Tech Groups",
        "description": "Together Tech is a leading IT Services company based in Chennai, India. We specialize in Website Development, Custom Software Development, Mobile App Development (Flutter/Android/iOS), Digital Marketing, SEO, Meta Ads, Google Ads, UI/UX Design, and Branding. Serving businesses across Chennai and India.",
        "image": [
          "https://www.togethertechgroups.in/images/logo.png",
          "https://www.togethertechgroups.in/images/og-image.jpg"
        ],
        "logo": "https://www.togethertechgroups.in/images/logo.png",
        "url": "https://www.togethertechgroups.in",
        "telephone": "+919047549682",
        "email": "togethertechgroups@gmail.com",
        "foundingDate": "2021",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 5, "maxValue": 20 },
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
        "areaServed": [
          { "@type": "City", "name": "Chennai" },
          { "@type": "City", "name": "Bangalore" },
          { "@type": "City", "name": "Hyderabad" },
          { "@type": "City", "name": "Mumbai" },
          { "@type": "State", "name": "Tamil Nadu" },
          { "@type": "Country", "name": "India" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          }
        ],
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, UPI, Bank Transfer, Credit Card",
        "keywords": "website development Chennai, app development Chennai, software company Chennai, digital marketing Chennai, SEO company Chennai, Flutter developer Chennai",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "47",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "IT Services by Together Tech",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development", "description": "Custom website development for businesses in Chennai and India" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development", "description": "Flutter, Android and iOS app development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Software Development", "description": "Custom ERP, CRM and business software development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing", "description": "SEO, Meta Ads, Google Ads and social media marketing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services", "description": "Search engine optimization for local and national rankings" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design", "description": "User interface and experience design for web and mobile apps" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding & Graphic Design", "description": "Logo design, brand identity and graphic design services" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Meta Ads Management", "description": "Facebook and Instagram advertising campaigns" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads Management", "description": "Google search and display advertising campaigns" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ecommerce Website Development", "description": "Online store development with payment gateway integration" } }
          ]
        }
      },
      {
        "@type": "ItemList",
        "name": "Together Tech Main Pages",
        "description": "Main navigation pages of Together Tech website",
        "itemListElement": [
          {
            "@type": "SiteLinksSearchBox",
            "target": "https://www.togethertechgroups.in/?q={search_term_string}"
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Together Tech Navigation",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "url": "https://www.togethertechgroups.in/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "url": "https://www.togethertechgroups.in/services" },
          { "@type": "ListItem", "position": 3, "name": "Website Development", "url": "https://www.togethertechgroups.in/services/website-development" },
          { "@type": "ListItem", "position": 4, "name": "Mobile App Development", "url": "https://www.togethertechgroups.in/services/mobile-app-development" },
          { "@type": "ListItem", "position": 5, "name": "Digital Marketing", "url": "https://www.togethertechgroups.in/services/digital-marketing" },
          { "@type": "ListItem", "position": 6, "name": "Portfolio", "url": "https://www.togethertechgroups.in/portfolio" },
          { "@type": "ListItem", "position": 7, "name": "Packages", "url": "https://www.togethertechgroups.in/packages" },
          { "@type": "ListItem", "position": 8, "name": "Contact", "url": "https://www.togethertechgroups.in/contact" },
          { "@type": "ListItem", "position": 9, "name": "About", "url": "https://www.togethertechgroups.in/about" },
          { "@type": "ListItem", "position": 10, "name": "Blog", "url": "https://www.togethertechgroups.in/blog" }
        ]
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
        {/* Google Analytics 4 — Measurement ID: G-3L1CQ91BSY */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3L1CQ91BSY"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3L1CQ91BSY', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${hoshikoSatsuki.variable} ${eternalo.variable} ${rusticDelight.variable} ${neogenBlack.variable} antialiased bg-brandDark text-slate-100`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <SpeedInsights />
      </body>
    </html>
  );
}
