import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://togethertechgroups.in';

  // Static routes
  const staticRoutes = ['', '/about', '/contact', '/portfolio', '/services', '/packages', '/team', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    // Service pages
    const services = await prisma.service.findMany({
      where: { status: 'ACTIVE' },
      select: { slug: true, createdAt: true },
    });

    const serviceRoutes = services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.createdAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Blog pages
    const blogs = await prisma.blog.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, createdAt: true },
    });

    const blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.createdAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}
