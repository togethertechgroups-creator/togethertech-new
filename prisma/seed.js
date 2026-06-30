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
      email: 'contact@togethertechgroups.in',
      whatsapp: '+91 98765 43210',
      address: '123 Tech Park, IT Corridor, Chennai, India',
      logo: '/images/logo.svg',
      socialLinks: JSON.stringify({
        facebook: 'https://facebook.com/togethertech',
        twitter: 'https://twitter.com/togethertech',
        linkedin: 'https://linkedin.com/company/togethertech',
        instagram: 'https://instagram.com/togethertech'
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
      fullDescription: 'Our website development service covers everything from corporate portfolios to complex e-commerce platforms. We use modern tech stacks (React, Next.js) to deliver lightning-fast loading speeds, interactive designs, and a clean user experience. Each website is built with SEO best practices and mobile responsiveness in mind.',
      image: '/images/services/web-dev.jpg',
      features: 'Responsive Layout, SEO-Optimized, Admin Panel Access, Speed Performance, WhatsApp Chat Integration, Custom Contact Forms',
    },
    {
      title: 'Mobile App Development',
      slug: 'mobile-app-development',
      shortDescription: 'Get native and cross-platform mobile apps for Android and iOS with sleek UI and robust backends.',
      fullDescription: 'We specialize in mobile application design and development. Whether you need a utility tool, a customer portal, or a native experience, we deliver stable, high-performing apps using Swift, Kotlin, or React Native. Connected with secure real-time databases and payment processing pipelines.',
      image: '/images/services/mobile-dev.jpg',
      features: 'Native Android & iOS, Offline Mode Support, Push Notifications, Secure User Auth, Payment Gateways, Dynamic Store Publishing',
    },
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
      title: 'UI/UX Design',
      slug: 'ui-ux-design',
      shortDescription: 'User-centered design prototypes, wireframes, and screen flows that look stunning and feel natural.',
      fullDescription: 'We focus on high-fidelity designs, interactive wireframes, and micro-interactions. Using Figma, we craft custom components, typography scales, and desaturated dark-mode palettes that ensure premium aesthetics and excellent user flow.',
      image: '/images/services/ui-ux.jpg',
      features: 'Figma Mockups, User Journey Mapping, Interactive Prototypes, Design System Creation, Responsive Grid, Usability Testing',
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
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      shortDescription: 'Complete online marketing strategies combining branding, social media, content, and lead generation.',
      fullDescription: 'Grow your business online with a holistic marketing strategy. We handle content creation, social media scheduling, newsletter email updates, and search campaigns to turn cold traffic into brand advocates.',
      image: '/images/services/digital-marketing.jpg',
      features: 'Social Media Strategy, Content Scheduling, Email Newsletter Setup, Brand Authority Building, Inbound Sales Lead Funnels, Monthly Analytics',
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
      photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmp8WZol0oBzwPhRaXIUcsgc3P0krxqeAxsczB1q5WWReW0m4CVWaNatPsHWz-SkY0qG1GKh2vJLYhtDskmHpDtLcbncTlsOQy_7pGvashV-1Uv5r9SAR93qEGWJqK-PhEYNaxIghxom92qlCNuXdPuMTJmVzaAZQb4oeBcsXEAyt0fnt3wNTwibDzfnVYkYKGABrR95Za8NJjHhTD3YSepbRmjdKS7ZZH6XrmKIt1z3PpkUVP0aayHqsP7Hmaljmqs3a5FRMiEawB',
      bio: 'Leading the core infrastructure, K. Aarsha is responsible for crafting reliable software solutions and complex backend logic that powers our high-performance applications.',
      skills: 'Node.js, PostgreSQL, REST APIs, System Architecture, Docker, Python',
      socialLinks: JSON.stringify({ linkedin: '#', github: '#', email: 'aarsha@togethertech.in' })
    },
    {
      id: 'p-priyadharshini',
      name: 'P. Priyadharshini',
      role: 'Mobile Specialist',
      photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZHEB8mRZevvDlOvqbqtxeir0x9DVlkIOIe_XtT_xtk7xsPbv57WNxpCCPWx1XoDtXQxyklk-fj1wKh6fdvHesAS_V079rO3rLUsh5eZ_U3dmN5TZo6VNNKwfo7o65iEnTPe40hOVBjYGE0WB2-uCsRNB-obMchR8tP3vIQqlMNPLIK0ZInBGGKQRmABLAnkcBXQqYhtg5GPWb1WDHawjZv2znGTYMfborTk_ngKA6tG1yCh1T7gp549t0-kTOg3XFupoHQ9gHXblX',
      bio: 'Specializing in cross-platform excellence, she focuses on building modern, high-performance mobile apps with Flutter, ensuring seamless user journeys across all devices.',
      skills: 'Flutter, Dart, Firebase, iOS/Android Store, State Management, App UX',
      socialLinks: JSON.stringify({ linkedin: '#', github: '#', email: 'priya@togethertech.in' })
    },
    {
      id: 'm-velmurugan',
      name: 'M. Velmurugan',
      role: 'Experience Designer',
      photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVfJRkhltDRyod2qLXblbWnUdXAI-Jrp_QwFueQ8mir8R6mS46LX7hhbctQQYPDxNDJvp0jFjz19xHeJLn8JwAMJ-FBnhrD1_V0iWO27BB1PDsxZK7rCexcfwBKUGU63gDK2uyv2wT0VANKXEL-mAr-DSAgJKRoPD5xC0EXkGmiF4VRdgGW6Feq1Gd7HhNw_BVLxno36JQ7J5SB0OB13XiXSNnjSsBHAACvB6H6gvDJCrzJMhJD8vbL0DqXUErc0Y4EYDYOnGcAW8o',
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

  // 8. Blogs
  const defaultBlogs = [
    {
      id: 'blog-1',
      title: 'Why Custom CRM is Better Than Off-The-Shelf Solutions',
      slug: 'why-custom-crm-is-better',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAqOafszodPpsx5yFOkuz-Si87XkQOmoTObccF91qagAIOUsK13tXh9x1xbExeFeb8t-qshmDdkDLgdbcASmHxawrTPJ7fD4Pi1H1ELUIv6qlG4DZYKxA3IhUwQnU-5_H1mJ0WZVZ_m7vHoLfCbQy_Tw5oMaFWxhUcfSkkTxHeeOmIE-nsacp8YzSMSDfPWV1TozyJFhSjXnDsjVw438a5b-9uZZGXlfbgm-mNlnD27M7HhfPLmwgZXIhFtXv6_6ZLehKfNYc8uH9P',
      content: '<p>Off-the-shelf software is built for everyone, which often means it fits no one\'s specific workflows. A custom CRM designed around your company operations eliminates unnecessary features, makes onboarding faster, and handles data exactly the way you need it to...</p><h2>Key Benefits of Custom Systems</h2><ul><li><strong>Workflow Alignment:</strong> No need to adapt your process to the tool; the tool adapts to you.</li><li><strong>Cost Efficiency:</strong> Avoid monthly per-user license fees.</li><li><strong>Seamless Integration:</strong> Hook into your existing databases and legacy software without hassle.</li></ul>',
      category: 'Software Development',
      seoTitle: 'Why Custom CRM Beats Off-The-Shelf Tools | Together Tech',
      seoDescription: 'Discover why custom software and bespoke CRMs are more productive and cost-effective than standard off-the-shelf subscriptions for growing businesses.',
      status: 'PUBLISHED'
    },
    {
      id: 'blog-2',
      title: '5 Crucial Mobile App UX Design Best Practices in 2026',
      slug: '5-mobile-app-ux-best-practices',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ1DG09YEmF2mBjkEE8hozEYN0u1s0ZOpo3x-Y3fCsPUkDG2ZNCUDgCUJX9r9pMSo2vE76AEdfFIz-xQtBAenjR-EoENq5ZEoZIShyn9JZ2QcbgP1SzinvTunR1HDCZbWy9f20YZ2i4o3a6wvLO8VxCMqmuPrTbJVQxLL43A7bVSBazFfaAWUD6utK2OXPZkfgPFSDQD8zcHhGw_8WXpCZXdVQLQhhtK7jjnUbJ9kGEhMyanTHPwmhsE812bM5Nax_SyicXio3_Kxl',
      content: '<p>With mobile screen sizes growing and user attention spans shrinking, mobile app design requires precision. Here are the top 5 mobile app UX best practices including touch targets, dynamic content loading, and dark theme support...</p>',
      category: 'UI/UX Design',
      seoTitle: '5 Crucial Mobile App UX Design Best Practices | Together Tech',
      seoDescription: 'Learn the top mobile app user experience patterns, touch constraints, and animation speeds to build successful apps in 2026.',
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
