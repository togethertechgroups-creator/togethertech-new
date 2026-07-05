import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowRight, Calendar, User, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Together Tech',
  description: 'Stay updated with the latest trends in custom software development, eCommerce websites, mobile app innovations, and digital marketing strategies from Together Tech Chennai.',
  alternates: {
    canonical: 'https://www.togethertechgroups.in/blog',
  },
};

export const revalidate = 60; // Cache and revalidate every 60 seconds (ISR)

export default async function BlogIndexPage() {
  const blogs = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.togethertechgroups.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.togethertechgroups.in/blog"
      }
    ]
  };

  return (
    <div className="space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4 pt-8">
          <div className="flex items-center justify-center space-x-2 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Blog</span>
          </div>
          <span className="text-emerald-100 font-extrabold text-sm uppercase tracking-wider">Our Knowledge Base</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-neogen">Latest Insights & News</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            Discover software development tutorials, website design principles, SEO hacks, and online marketing updates.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 font-bold">No blog posts published yet. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-brandGreen/25 transition-all duration-300 group"
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-150">
                      <img
                        src={blog.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-brandGreen text-white font-bold text-xxs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {blog.category}
                      </span>
                    </div>

                    {/* Content body */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center space-x-4 text-xxs font-bold text-slate-400 uppercase tracking-wide">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-brandGreen" />
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User className="w-3.5 h-3.5 text-brandGreen" />
                          <span>By Team Together</span>
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-extrabold text-brandDark group-hover:text-brandGreen transition-colors leading-tight font-outfit">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h2>
                      
                      <p className="text-xs text-brandGray leading-relaxed font-medium line-clamp-3">
                        {blog.seoDescription || 'Read our latest analysis and tips on how to implement modern software systems, responsive UI designs, and digital marketing routes to scale operations.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-50 mt-4">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center text-xs font-bold text-brandGreen hover:text-brandGreenHover uppercase tracking-widest space-x-2 pt-4"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
