const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@togethertech.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Together Tech Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user seeded:', admin.email);

  // 2. Default Settings
  const settings = await prisma.settings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      companyName: 'Together Tech Groups',
      phone: '+91 98765 43210',
      email: 'togethertechgroups@gmail.com',
      whatsapp: '+91 98765 43210',
      address: '123 Tech Park, IT Corridor, Chennai, India',
      logo: '/images/logo.svg',
      socialLinks: JSON.stringify({
        facebook: 'https://facebook.com/togethertech',
        twitter: 'https://twitter.com/togethertech',
        linkedin: 'https://linkedin.com/company/togethertech',
        instagram: 'https://www.instagram.com/togethertechofficial'
      }),
      seoTitle: 'Together Tech Groups | Your Growth, Our Technology',
      seoDescription: 'We create professional websites, mobile apps, custom software, branding, SEO, and digital marketing solutions that help your business grow faster.',
    },
  });
  console.log('Settings seeded.');

  // 3. Default Services
  const defaultServices = [
    {
      title: 'Website Development',
      slug: 'website-development',
      shortDescription: 'We build responsive, fast-loading, and SEO-optimized websites tailored to your business needs.',
      fullDescription: 'Our Website Development Company in Chennai provides high-impact responsive website design, business website design, corporate website development, landing page development, and eCommerce website development across India. We use Next.js and Tailwind CSS for lightning-fast speeds and search engine rankings.',
      image: '/images/services/web-dev.jpg',
      features: 'Responsive Website Development, Business Website Design, Corporate Website Development, Ecommerce Website Development, Landing Page Development, Portfolio Website Design, WordPress Development, Custom Website Development',
    },
    {
      title: 'Software Development',
      slug: 'software-development',
      shortDescription: 'Custom software, ERP, CRM, and automation solutions built for scalable business growth.',
      fullDescription: 'As a leading Software Development Company in Chennai, Together Tech designs and develops custom software, ERP software, CRM software, inventory management systems, billing systems, and HR management software tailored for startups and enterprises across India.',
      image: '/images/services/software-dev.jpg',
      features: 'Custom Software Development, ERP Software Development, CRM Software Development, Inventory Management Software, Billing Software, HR Management Software, Business Automation Software, Software for Startups',
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      shortDescription: 'Premium cross-platform and native mobile applications for Android and iOS devices.',
      fullDescription: 'Together Tech is a premier Mobile App Development Company in Chennai. We develop native iOS, Android, and cross-platform apps using Flutter. Get secure user authentication, offline support, real-time databases, and payment gateway integrations built for business mobile apps.',
      image: '/images/services/mobile-dev.jpg',
      features: 'Android App Development, iOS App Development, Flutter App Development, Cross-Platform App Development, Business Mobile Apps, Push Notifications, Payment Gateways',
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      shortDescription: 'Data-driven performance marketing, social media campaigns, and lead generation.',
      fullDescription: 'Our Digital Marketing Agency in Chennai helps brands grow with tailored social media marketing, performance marketing, Instagram marketing, Facebook ads, and brand authority building across India.',
      image: '/images/services/digital-marketing.jpg',
      features: 'Performance Marketing, Social Media Marketing, Instagram Marketing, Facebook Ads, Lead Generation, Brand Authority, Content Strategy',
    },
    {
      title: 'SEO Services',
      slug: 'seo-services',
      shortDescription: 'Rank higher on Google and AI search engines with on-page, local, and technical SEO.',
      fullDescription: 'Together Tech is an expert SEO Company in Chennai. We deliver organic traffic growth, technical SEO audits, local SEO setup, and Schema markup optimization to make your business discoverable in Google and generative search engines (Gemini, ChatGPT).',
      image: '/images/services/seo.jpg',
      features: 'Technical SEO, Local SEO, On-Page SEO Audit, Schema Markup, XML Sitemap, Robots.txt, Google Search Console, Canonical URLs',
    },
    {
      title: 'Meta Ads Management',
      slug: 'meta-ads-management',
      shortDescription: 'High-converting ad campaigns on Facebook and Instagram to scale lead generation and ROAS.',
      fullDescription: 'As a result-driven Meta Ads Agency in Chennai, we build conversion-focused ad funnels, set up Meta Pixels, create ad copy, and optimize bids to generate high-quality leads for businesses across India.',
      image: '/images/services/ads.jpg',
      features: 'Facebook Ads, Instagram Marketing, Meta Pixel Setup, Lead Generation, Retargeting Funnels, Copywriting & Ad Creatives, Weekly Reports',
    },
    {
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      shortDescription: 'Stunning user-centered interface designs, wireframes, and prototypes in Figma.',
      fullDescription: 'Our UI/UX Design Company in Chennai creates user journey maps, high-fidelity Figma mockups, and interactive prototypes. We focus on modern typography, accessibility, custom components, and layouts that convert visitors.',
      image: '/images/services/ui-ux.jpg',
      features: 'UI/UX Design, Web UI Design, Figma Mockups, User Journey Mapping, Interactive Prototypes, Design System Creation, Responsive Grid, Usability Testing',
    },
    {
      title: 'Branding & Graphic Design',
      slug: 'branding-graphic-design',
      shortDescription: 'Establish your brand identity with professional logos, graphic designs, and creatives.',
      fullDescription: 'Our Branding Agency in Chennai designs vector-based professional logos, brand identity guides, social media creatives, and premium graphic design packages that elevate business visibility and establish a lasting visual brand.',
      image: '/images/services/logo-design.jpg',
      features: 'Branding Agency, Graphic Design, Logo Design, Brand Identity Design, Social Media Creatives, Vector SVGs, Brand Kit Guides',
    },
    // Keep old slugs for compatibility
    {
      title: 'Flutter App Development',
      slug: 'flutter-app-development',
      shortDescription: 'Premium cross-platform mobile applications with native feel, fast delivery, and clean code.',
      fullDescription: 'Using Google\'s Flutter framework, we build highly responsive and visually gorgeous mobile apps for both iOS and Android from a single codebase. This ensures faster delivery times and reduced development costs while preserving a smooth 60fps native performance.',
      image: '/images/services/flutter-dev.jpg',
      features: 'Single Codebase, High Performance, Custom Widget Design, Real-time APIs, In-App Purchases, Material Design / Cupertino UI',
    },
    {
      title: 'Restaurant Software',
      slug: 'restaurant-software',
      shortDescription: 'Complete POS, table management, and kitchen display systems for restaurants, cafes, and bars.',
      fullDescription: 'Streamline your restaurant operations. Our restaurant POS system handles tables, takes online/offline orders, coordinates with kitchen displays, and keeps track of recipe ingredients in real time. Also includes a digital QR menu system for contactless ordering.',
      image: '/images/services/restaurant-software.jpg',
      features: 'POS Terminal, QR Digital Menu, Kitchen Order Ticket (KOT), Table Billing, Multi-branch Tracking, Daily Sales Analytics',
    },
    {
      title: 'CRM / Admin Dashboard',
      slug: 'crm-admin-dashboard',
      shortDescription: 'Powerful customer relationship management and admin dashboards to monitor and drive your business analytics.',
      fullDescription: 'Get complete visibility of your operations, customer journeys, sales leads, and team targets. Our bespoke CRMs and custom admin panels aggregate your data into interactive visual charts (bar, line, donut) to help you make informed business decisions.',
      image: '/images/services/crm-dashboard.jpg',
      features: 'Lead Management, Dynamic Charts, Data Export (CSV/PDF), Client Profiles, Automated Email Alerts, Responsive Admin Shell',
    },
    {
      title: 'Logo Design',
      slug: 'logo-design',
      shortDescription: 'Vector-based professional brand logos that establish a lasting visual identity for your business.',
      fullDescription: 'Your logo is the first impression of your brand. We design clean, minimalist, and vector-based logos that scale beautifully from small app icon glyphs to massive billboard banners. We deliver complete brand packages (color palette, files, fonts).',
      image: '/images/services/logo-design.jpg',
      features: 'Vector SVGs, Complete Brand Kit, Light/Dark Background Formats, High Resolution PNGs, Source Files (AI/EPS), Copyright Ownership',
    },
    {
      title: 'Poster Design',
      slug: 'poster-design',
      shortDescription: 'Eye-catching posters, banners, and digital graphics for social media marketing and print media.',
      fullDescription: 'Promote your events, sales campaigns, or corporate announcements with custom graphics. We blend typography, contrast, and layout elements to create visual posters that demand attention and drive customer actions.',
      image: '/images/services/poster-design.jpg',
      features: 'Social Media Templates, High DPI Print Files, Custom Typography, Visual Hierarchy, Source PSD/AI Files, Rapid Delivery',
    },
    {
      title: 'SEO (Search Engine Optimization)',
      slug: 'seo',
      shortDescription: 'Increase your organic website visitors and rank higher on Google search results.',
      fullDescription: 'We perform deep keyword research, optimize meta headings, clean up site speeds, set up structural schemas, and configure Google Search Console to rank your pages for local and global search terms. Drive high-quality leads organically without paying for ads.',
      image: '/images/services/seo.jpg',
      features: 'On-Page SEO Audit, Google Search Console, Meta Tag Configuration, XML Sitemap Creation, Load Speed Optimization, Local SEO Setup',
    },
    {
      title: 'Meta Ads / Google Ads',
      slug: 'meta-google-ads',
      shortDescription: 'Highly targeted paid ad campaigns on Facebook, Instagram, and Google to generate instant quality leads.',
      fullDescription: 'Stop throwing away money on untargeted boosts. We build conversion-driven ad funnels, set up tracking pixels, design high-converting visual creatives, and monitor custom audiences to maximize your return on ad spend (ROAS).',
      image: '/images/services/ads.jpg',
      features: 'Pixel Setup & API, Lead Generation Ads, Retargeting Funnels, Copywriting & Ad Visuals, Weekly Performance Reports, Bid Optimization',
    }
  ];

  for (const svc of defaultServices) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: svc,
      create: svc,
    });
  }
  console.log('Services seeded.');

  // 4. Default Packages
  const defaultPackages = [
    {
      packageName: 'Basic Website',
      price: '₹7,000',
      description: 'Ideal for small startups, local shops, or personal portfolios needing an elegant web presence.',
      features: 'Up to 5 pages, Mobile-friendly design, Contact Form, WhatsApp chat integration, Basic SEO setup, Free 1-year basic hosting support, 1 corporate email address',
      isRecommended: false,
    },
    {
      packageName: 'Semi-Custom Website',
      price: '₹12,000',
      description: 'Excellent for growing businesses needing dynamic content and self-management capabilities.',
      features: 'Up to 10 pages, Custom premium design, Secure Admin Panel access, Dynamic Gallery / Portfolio, Custom Contact & Enquiry forms, Advanced SEO configuration, Social media integrations, 3 corporate email addresses',
      isRecommended: true,
    },
    {
      packageName: 'Fully Custom Website',
      price: 'Starting from ₹20,000+',
      description: 'Built for enterprise systems, payment hubs, e-commerce, and advanced custom features.',
      features: 'Unlimited pages, Bespoke UI/UX design (Figma), Advanced Admin Dashboard / CRM, Custom booking system / Calendar, Secure Payment Gateway integration, External REST API integrations, High-availability cloud configuration, 24/7 dedicated support',
      isRecommended: false,
    }
  ];

  for (const pkg of defaultPackages) {
    await prisma.package.upsert({
      // We don't have a unique field on packages other than ID. For seeding, we query by name first.
      where: { id: pkg.packageName.toLowerCase().replace(/ /g, '-') },
      update: {
        price: pkg.price,
        description: pkg.description,
        features: pkg.features,
        isRecommended: pkg.isRecommended,
      },
      create: {
        id: pkg.packageName.toLowerCase().replace(/ /g, '-'),
        packageName: pkg.packageName,
        price: pkg.price,
        description: pkg.description,
        features: pkg.features,
        isRecommended: pkg.isRecommended,
        status: 'ACTIVE'
      }
    });
  }
  console.log('Packages seeded.');

  // 5. Default Team Members
  const defaultTeam = [
    {
      id: 'k-aarsha',
      name: 'K. Aarsha',
      role: 'Backend Architect',
      photo: '/images/team/aarsha.jpg',
      bio: 'Leading the core infrastructure, K. Aarsha is responsible for crafting reliable software solutions and complex backend logic that powers our high-performance applications.',
      skills: 'Node.js, PostgreSQL, REST APIs, System Architecture, Docker, Python',
      socialLinks: JSON.stringify({ linkedin: '#', github: '#', email: 'aarsha@togethertech.in' })
    },
    {
      id: 'p-priyadharshini',
      name: 'P. Priyadharshini',
      role: 'Mobile Specialist',
      photo: '/images/team/priyadharshini.jpg',
      bio: 'Specializing in cross-platform excellence, she focuses on building modern, high-performance mobile apps with Flutter, ensuring seamless user journeys across all devices.',
      skills: 'Flutter, Dart, Firebase, iOS/Android Store, State Management, App UX',
      socialLinks: JSON.stringify({ linkedin: '#', github: '#', email: 'priya@togethertech.in' })
    },
    {
      id: 'm-velmurugan',
      name: 'M. Velmurugan',
      role: 'Experience Designer',
      photo: '/images/team/velmurugan.jpg',
      bio: 'Velmurugan masters the intersection of form and function, handling user interface and experience design to create visually stunning and intuitively usable digital products.',
      skills: 'Figma, Adobe Illustrator, Visual Hierarchy, Prototyping, Logo Branding, Typography',
      socialLinks: JSON.stringify({ linkedin: '#', behance: '#', email: 'vel@togethertech.in' })
    }
  ];

  for (const tm of defaultTeam) {
    await prisma.teamMember.upsert({
      where: { id: tm.id },
      update: tm,
      create: tm,
    });
  }
  console.log('Team members seeded.');

  // 6. Testimonials
  const defaultTestimonials = [
    {
      clientName: 'Rajesh Kumar',
      businessName: 'Vikas Retailers',
      review: 'Together Tech Groups built our billing software. The system is extremely fast, works offline when needed, and printing invoices has never been easier. Highly recommended!',
      rating: 5,
      status: 'ACTIVE'
    },
    {
      clientName: 'Sanjana Sen',
      businessName: 'Delight Cafe',
      review: 'Their restaurant management software transformed our cafe. The QR code contactless menu works seamlessly. Ordering is faster and our customers love it.',
      rating: 5,
      status: 'ACTIVE'
    },
    {
      clientName: 'Dr. Anita Rao',
      businessName: 'Apex Dental Care',
      review: 'We contracted Together Tech for a custom booking website and SEO. Our appointments have increased by 40% in just two months. A team of true professionals.',
      rating: 4,
      status: 'ACTIVE'
    }
  ];

  // Testimonials don't have unique fields in schema, so let's just insert if empty
  const countTestimonials = await prisma.testimonial.count();
  if (countTestimonials === 0) {
    for (const test of defaultTestimonials) {
      await prisma.testimonial.create({ data: test });
    }
    console.log('Testimonials seeded.');
  }

  // 7. Portfolio Items
  const defaultPortfolio = [
    {
      id: 'port-gym-software',
      projectName: 'Gym Management Software',
      clientName: 'Iron Forge Gyms',
      category: 'Software',
      image: '/images/portfolio/gym-software.png',
      description: 'A comprehensive gym administration portal featuring member attendance tracking, subscription billing, trainer assignments, and workout scheduling.',
      technologies: 'Next.js, Tailwind CSS, Prisma, SQLite',
      projectLink: '#',
      status: 'ACTIVE'
    },
    {
      id: 'port-billing-software',
      projectName: 'Billing Software',
      clientName: 'Vikas Retailers',
      category: 'Software',
      image: '/images/portfolio/billing-software.png',
      description: 'High-speed desktop billing software with offline synchronization capabilities, barcode scanner integration, tax invoice printing, and GST report tools.',
      technologies: 'Next.js, Electron, Tailwind CSS, SQLite, Node.js',
      projectLink: '#',
      status: 'ACTIVE'
    },
    {
      id: 'port-hyundai-qr',
      projectName: 'Hyundai Polytech QR Scanner',
      clientName: 'Hyundai Polytech',
      category: 'Apps',
      image: '/images/portfolio/hyundai-qr.png',
      description: 'Mobile QR code scanner and verification app created for Hyundai Polytech. Features lightning-fast scan reviews, log history, and database sync.',
      technologies: 'Flutter, Dart, Node.js, PostgreSQL',
      projectLink: '#',
      status: 'ACTIVE'
    },
    {
      id: 'port-aquila-preschool',
      projectName: 'Aquila Preschool',
      clientName: 'Aquila Preschool',
      category: 'Websites',
      image: '/images/portfolio/aquila.png',
      description: 'A friendly, modern website for Aquila Preschool featuring class portals, schedules, parent feedback boards, and event calendar updates.',
      technologies: 'Next.js, Tailwind CSS, Framer Motion',
      projectLink: 'https://aquila-preschool.vercel.app',
      status: 'ACTIVE'
    },

    {
      id: 'port-spdigitalsolutions',
      projectName: 'SP Digital Solutions',
      clientName: 'SP Digital Solutions',
      category: 'Websites',
      image: '/images/portfolio/spdigital.png',
      description: 'Creative agency portfolio showcasing brand campaigns, design assets, and digital marketing setups.',
      technologies: 'React, Tailwind CSS, Vercel',
      projectLink: 'https://spdigitalsolutions-euir.vercel.app',
      status: 'ACTIVE'
    },
    {
      id: 'port-micro-laser-arts',
      projectName: 'Micro Laser Arts',
      clientName: 'Micro Laser Arts',
      category: 'Websites',
      image: '/images/portfolio/micro-laser.jpg',
      description: 'A design catalog and showcase for micro laser cutting designs, engravings, material guides, and custom estimates.',
      technologies: 'Next.js, Tailwind CSS, Framer Motion',
      projectLink: 'https://micro-laser-arts.vercel.app',
      status: 'ACTIVE'
    },
    {
      id: 'port-sky-groupss',
      projectName: 'Sky Groups Pvt Ltd',
      clientName: 'Sky Groups Pvt Ltd',
      category: 'Websites',
      image: '/images/portfolio/sky-groups.jpg',
      description: 'Corporate business website for Sky Groups Pvt Ltd with search engine optimization, fast load speeds, and layout maps.',
      technologies: 'Next.js, Tailwind CSS, Vercel',
      projectLink: 'https://sky-groupss.vercel.app',
      status: 'ACTIVE'
    }
  ];

  for (const port of defaultPortfolio) {
    await prisma.portfolio.upsert({
      where: { id: port.id },
      update: port,
      create: port,
    });
  }
  const keepIds = defaultPortfolio.map(p => p.id);
  await prisma.portfolio.deleteMany({
    where: {
      id: {
        notIn: keepIds
      }
    }
  });
  console.log('Portfolio seeded.');

  const defaultBlogs = [
    {
      id: 'blog-1',
      title: 'Why Every Business Needs a Professional Website',
      slug: 'why-every-business-needs-a-website',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      content: '<p>In 2026, a business website is no longer just a digital business card. It is the core engine of your brand reputation, customer acquisition, and operational scalability. Whether you are an IT company in Chennai or a local retail store, your customers expect to find you online.</p><h2>1. Establish Authority and Credibility</h2><p>Before making a purchase or scheduling a service, modern consumers research online. A professional website immediately builds trust, showcasing your team, case studies, and client feedback.</p><h2>2. Organic Search Discovery & AI GEO</h2><p>By implementing SEO services and structured schemas, your website becomes searchable not only on Google but also on AI platforms like ChatGPT and Gemini. If you optimize for high-intent keywords like "Best Website Development Company," you capture valuable inbound leads.</p><h2>3. Control Your Customer Journey</h2><p>Unlike third-party social media pages, a custom website allows you to own your content, integrate custom contact forms, WhatsApp chat options, and direct lead capture pipelines without being subject to algorithm updates.</p>',
      category: 'Website Development',
      seoTitle: 'Why Every Business Needs a Professional Website | Together Tech',
      seoDescription: 'Discover why a professional website is critical for business growth, authority, and ranking on Google and AI search engines in 2026.',
      status: 'PUBLISHED'
    },
    {
      id: 'blog-2',
      title: 'Website vs Mobile App: Which One Should You Build First?',
      slug: 'website-vs-mobile-app-which-first',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      content: '<p>One of the most common questions startups and small businesses ask is whether they should build a website or a mobile app first. Both have distinct advantages, but the right choice depends on your business model, budget, and target audience.</p><h2>When to Build a Website First</h2><p>Websites are accessible to anyone with a browser. They are faster and more affordable to develop, making them ideal for search engine discovery and broad reach. If your primary goal is lead generation, content marketing, or displaying portfolios, start with website development.</p><h2>When to Build a Mobile App First</h2><p>Mobile apps are ideal for high-engagement, repeat-interaction products. If your business relies on offline access, push notifications, or hardware integrations (GPS, camera), building a mobile app using Flutter first makes sense.</p><h2>The Hybrid Strategy</h2><p>Many successful startups build an SEO-optimized responsive website first to capture search traffic and validate their product, and then build a mobile application to deepen engagement with active users.</p>',
      category: 'Software Development',
      seoTitle: 'Website vs Mobile App: Which to Build First? | Together Tech',
      seoDescription: 'Compare websites and mobile apps to decide which platform is the best starting point for your business growth and budget.',
      status: 'PUBLISHED'
    },
    {
      id: 'blog-3',
      title: 'Top SEO Trends for 2026: Search in the Age of AI',
      slug: 'top-seo-trends-2026',
      image: 'https://images.unsplash.com/photo-1571786256887-6067defb58a3?auto=format&fit=crop&w=800&q=80',
      content: '<p>Search Engine Optimization is undergoing its most radical transformation. With the rise of Generative Engine Optimization (GEO) and search engines like Perplexity, ChatGPT, and Google Gemini, ranking factors have shifted from simple keyword stuffing to semantic context.</p><h2>1. Optimizing for AI Conversational Engines (GEO)</h2><p>AI search models retrieve information in natural conversational patterns. To rank, write clear, direct Q&A segments on your pages (e.g. "What services does Together Tech provide?"). Make sure your content is natural, readable, and highly informative.</p><h2>2. Technical SEO & Core Web Vitals</h2><p>Fast loading speeds under 2 seconds remain critical. Clean code structures, lightweight frameworks like Next.js, and optimized image alt tags are crucial for ranking higher on all platforms.</p><h2>3. Schema Markup and Structured Data</h2><p>By implementing Organization, LocalBusiness, FAQ, and Service schemas, you feed crawlers semantic context directly, helping AI models accurately digest your data.</p>',
      category: 'SEO Services',
      seoTitle: 'Top SEO & GEO Trends for 2026 | Together Tech',
      seoDescription: 'Discover the top SEO trends in 2026, focusing on Generative Engine Optimization (GEO), AI search citations, and technical performance.',
      status: 'PUBLISHED'
    },
    {
      id: 'blog-4',
      title: 'Benefits of Custom Software Development for Startups',
      slug: 'benefits-of-custom-software-for-startups',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
      content: '<p>Startups need to move fast and scale efficiently. While ready-made SaaS tools seem appealing initially, they often result in restricted customization and high monthly fees as you grow. Custom software development gives you a tailored platform that fits your exact processes.</p><h2>1. Competitive Advantage</h2><p>Proprietary software allows you to build features your competitors don\'t have. This is highly attractive to investors and provides a unique customer experience.</p><h2>2. Scalability and No License Caps</h2><p>With custom ERP and CRM systems, you pay for development once. As your team grows, you do not face escalating per-seat monthly subscription costs.</p><h2>3. Security and Integration</h2><p>Custom setups offer superior security, protecting sensitive customer details. You can easily integrate with existing databases and external API systems.</p>',
      category: 'Software Development',
      seoTitle: 'Benefits of Custom Software for Startups | Together Tech',
      seoDescription: 'Explore how custom software, tailored CRM, and ERP systems give startups a competitive edge and eliminate recurring SaaS costs.',
      status: 'PUBLISHED'
    }
  ];

  for (const blog of defaultBlogs) {
    await prisma.blog.upsert({
      where: { id: blog.id },
      update: blog,
      create: blog,
    });
  }
  console.log('Blogs seeded.');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
