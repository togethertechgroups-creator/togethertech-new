import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://togethertechgroups.in';

  // Static routes — ordered by SEO priority
  const staticRoutes = [
    { url: baseUrl,                         priority: 1.0 },
    { url: `${baseUrl}/services`,           priority: 0.9 },
    { url: `${baseUrl}/about`,              priority: 0.8 },
    { url: `${baseUrl}/portfolio`,          priority: 0.8 },
    { url: `${baseUrl}/packages`,           priority: 0.8 },
    { url: `${baseUrl}/contact`,            priority: 0.8 },
    { url: `${baseUrl}/blog`,              priority: 0.7 },
  ].map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
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
