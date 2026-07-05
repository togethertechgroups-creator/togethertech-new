import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Calendar, User, ChevronRight, ArrowRight, MessageCircle, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return { title: 'Blog Not Found' };
  
  const title = `${blog.title} | Together Tech`;
  const description = blog.seoDescription || 'Read the full article on the Together Tech blog.';
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.togethertechgroups.in/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.togethertechgroups.in/blog/${slug}`,
      siteName: 'Together Tech',
      locale: 'en_IN',
      type: 'article',
      images: [
        {
          url: blog.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
          alt: blog.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [blog.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
    }
  };
}

export const revalidate = 60; // Cache and revalidate every 60 seconds (ISR)

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog || blog.status !== 'PUBLISHED') {
    notFound();
  }

  // Get other recent blogs for cross-linking
  const recentBlogs = await prisma.blog.findMany({
    where: {
      status: 'PUBLISHED',
      id: { not: blog.id }
    },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://www.togethertechgroups.in/blog/${slug}#post`,
        "headline": blog.title,
        "image": blog.image,
        "datePublished": blog.createdAt.toISOString(),
        "dateModified": blog.createdAt.toISOString(),
        "author": {
          "@type": "Organization",
          "name": "Together Tech",
          "url": "https://www.togethertechgroups.in"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Together Tech",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.togethertechgroups.in/images/logo.png"
          }
        },
        "description": blog.seoDescription
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.togethertechgroups.in/blog/${slug}#breadcrumb`,
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": blog.title,
            "item": `https://www.togethertechgroups.in/blog/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header Banner */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 pt-8 space-y-6">
          <div className="flex items-center space-x-2 text-emerald-100 text-xs font-bold uppercase tracking-wider">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate max-w-[200px] sm:max-w-none">{blog.title}</span>
          </div>
          <div className="space-y-4 max-w-4xl">
            <span className="bg-white/15 border border-white/20 text-white font-extrabold text-xxs px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {blog.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">{blog.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-emerald-100 pt-2 font-medium">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-emerald-25" />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <User className="w-4 h-4 text-emerald-25" />
                <span>By Team Together Tech</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Article Core */}
          <article className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {/* Main Cover Image */}
            <div className="relative h-64 sm:h-[400px] w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
              <img
                src={blog.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rich Text Body */}
            <div
              className="prose prose-slate max-w-none text-slate-700 font-biooris leading-relaxed text-sm sm:text-base pt-4
                prose-headings:font-outfit prose-headings:text-brandDark prose-headings:font-extrabold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2
                prose-p:mb-6 prose-p:font-medium
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                prose-li:mb-2 prose-li:font-medium"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* CTA Card for Lead Generation */}
            <div className="bg-gradient-to-br from-brandGreen to-[#5c9930] text-white p-8 rounded-3xl shadow-md space-y-6">
              <h3 className="font-extrabold text-2xl leading-snug">Need Custom Development?</h3>
              <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                We are a Custom Software and Website Development Company in Chennai. Partner with us to build premium websites, mobile apps, and robust ERP systems.
              </p>
              
              <div className="space-y-4 pt-2">
                <Link
                  href="/contact"
                  className="w-full py-3.5 bg-white hover:bg-slate-50 text-brandGreen font-bold rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <span>Request Call Back</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex gap-2">
                  <a
                    href="https://wa.me/919047549682?text=Hi%20Together%2520Tech,%20I%20read%20your%20article%20and%20need%20details%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xxs font-bold text-center flex items-center justify-center space-x-1 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="tel:+919047549682"
                    className="flex-1 py-2.5 bg-brandDark hover:bg-brandGreen text-white rounded-lg text-xxs font-bold text-center flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Other articles */}
            {recentBlogs.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-extrabold text-lg text-brandDark border-l-4 border-brandGreen pl-3">Recent Articles</h3>
                <div className="space-y-4">
                  {recentBlogs.map((b) => (
                    <div key={b.id} className="group block space-y-1">
                      <span className="text-[10px] text-brandGreen font-bold uppercase tracking-wider">{b.category}</span>
                      <h4 className="font-bold text-sm text-brandDark group-hover:text-brandGreen transition-colors leading-tight font-outfit">
                        <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </aside>

        </div>
      </section>
    </div>
  );
}
