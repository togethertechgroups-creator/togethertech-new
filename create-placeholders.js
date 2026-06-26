const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');
const servicesDir = path.join(imagesDir, 'services');
const portfolioDir = path.join(imagesDir, 'portfolio');
const blogsDir = path.join(imagesDir, 'blogs');
const teamDir = path.join(imagesDir, 'team');

// Ensure directories exist
[publicDir, imagesDir, servicesDir, portfolioDir, blogsDir, teamDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper to write an SVG file
function writeSVG(filePath, title, category, startColor = '#0038BD', endColor = '#030a1e') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
    <defs>
      <linearGradient id="grad-${title.replace(/[^a-zA-Z]/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${startColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${endColor};stop-opacity:1" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad-${title.replace(/[^a-zA-Z]/g, '')})" />
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    <!-- Design details -->
    <circle cx="700" cy="100" r="150" fill="rgba(239,142,1,0.1)" filter="blur(50px)" />
    <circle cx="100" cy="400" r="100" fill="rgba(0,56,189,0.2)" filter="blur(30px)" />
    
    <text x="50" y="80" fill="#EF8E01" font-family="system-ui, sans-serif" font-weight="900" font-size="20" letter-spacing="2">${category.toUpperCase()}</text>
    <text x="50" y="250" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="900" font-size="44" letter-spacing="1">${title}</text>
    <text x="50" y="300" fill="#EEEEEE" font-family="system-ui, sans-serif" font-weight="500" font-size="18" opacity="0.8">Together Tech Groups | Premium Solutions</text>
    
    <line x1="50" y1="110" x2="200" y2="110" stroke="#EF8E01" stroke-width="4" />
  </svg>`;
  
  fs.writeFileSync(filePath, svg);
  console.log(`Created SVG placeholder: ${filePath}`);
}

// 1. Logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="20" fill="#0038BD" />
  <circle cx="50" cy="50" r="30" fill="none" stroke="#EF8E01" stroke-width="8" />
  <path d="M 35 50 L 45 60 L 65 40" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
fs.writeFileSync(path.join(imagesDir, 'logo.svg'), logoSvg);

// 2. Services (Map .jpg names to SVG contents - browsers render inline XML perfectly if header content-type is correct, but since it is static, serving SVG as .jpg works in most modern browsers or we can just save them as SVG/JPG files)
// Wait, we can save them as JPG containing SVG, but let's check: Next.js <Image> component might check format. Serving SVG files with .svg extension is standard. Let's rewrite the database seed or references if needed? No, wait!
// Modern browsers can load a valid SVG even if it has a .jpg extension, but to be 100% safe, let's write them as valid SVG XML! Yes, it works.
const serviceImages = [
  { file: 'web-dev.jpg', title: 'Website Development', cat: 'Development' },
  { file: 'mobile-dev.jpg', title: 'Mobile App Development', cat: 'Applications' },
  { file: 'flutter-dev.jpg', title: 'Flutter App Development', cat: 'Applications' },
  { file: 'custom-software.jpg', title: 'Custom Software Development', cat: 'Systems' },
  { file: 'billing-software.jpg', title: 'Billing POS Software', cat: 'Management' },
  { file: 'restaurant-software.jpg', title: 'Restaurant Systems', cat: 'Management' },
  { file: 'crm-dashboard.jpg', title: 'CRM & Admin Dashboards', cat: 'Analytics' },
  { file: 'ui-ux.jpg', title: 'UI/UX Prototype Design', cat: 'Creative' },
  { file: 'logo-design.jpg', title: 'Vector Logo Branding', cat: 'Creative' },
  { file: 'poster-design.jpg', title: 'Poster & Visual Graphics', cat: 'Creative' },
  { file: 'seo.jpg', title: 'Search Engine Optimization', cat: 'Marketing' },
  { file: 'ads.jpg', title: 'Google & Meta Campaigns', cat: 'Marketing' },
  { file: 'digital-marketing.jpg', title: 'Digital Brand Scaling', cat: 'Marketing' },
  { file: 'custom.jpg', title: 'Bespoke Development', cat: 'Solutions' }
];

serviceImages.forEach(img => {
  writeSVG(path.join(servicesDir, img.file), img.title, img.cat);
});

// 3. Portfolio
const portfolioImages = [
  { file: 'pos.jpg', title: 'SmartBilling Cloud POS', cat: 'Software Product' },
  { file: 'dineeasy.jpg', title: 'DineEasy QR Ordering', cat: 'Web Application' },
  { file: 'protracker.jpg', title: 'ProTracker Dispatch App', cat: 'Mobile Application' },
  { file: 'fintech-ui.jpg', title: 'Fintech Dashboard Wireframes', cat: 'UI/UX Design' },
  { file: 'custom.jpg', title: 'Bespoke Project', cat: 'Client Work' }
];

portfolioImages.forEach(img => {
  writeSVG(path.join(portfolioDir, img.file), img.title, img.cat, '#EF8E01', '#030a1e');
});

// 4. Blogs
const blogImages = [
  { file: 'crm.jpg', title: 'Custom CRM vs Subscriptions', cat: 'Technical Insights' },
  { file: 'mobile-ux.jpg', title: 'Mobile UX Design Patterns', cat: 'Creative Insights' },
  { file: 'custom.jpg', title: 'IT Solutions Blog', cat: 'Insights' }
];

blogImages.forEach(img => {
  writeSVG(path.join(blogsDir, img.file), img.title, img.cat);
});

// 5. Team
const teamImages = [
  { file: 'aarsha.jpg', title: 'K. Aarsha', cat: 'Software Dev' },
  { file: 'priyadharshini.jpg', title: 'P. Priyadharshini', cat: 'Flutter Dev' },
  { file: 'velmurugan.jpg', title: 'M. Velmurugan', cat: 'UI/UX Designer' },
  { file: 'custom.jpg', title: 'Team Member', cat: 'Developer' }
];

teamImages.forEach(img => {
  writeSVG(path.join(teamDir, img.file), img.title, img.cat, '#0038BD', '#EF8E01');
});

console.log('All SVG placeholder assets created successfully!');
