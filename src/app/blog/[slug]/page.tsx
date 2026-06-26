import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ChevronRight, Calendar, User, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return { title: 'Article Not Found' };
  return {
    title: `${blog.seoTitle || blog.title} | Together Tech Groups`,
    description: blog.seoDescription || 'Blog article details',
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog || blog.status === 'DRAFT') {
    notFound();
  }

  const recentBlogs = await prisma.blog.findMany({
    where: {
      status: 'PUBLISHED',
      NOT: { id: blog.id },
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  // Estimate read time
  const getReadTime = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const words = plainText.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-slate-100 overflow-hidden pt-32 pb-24">
      {/* Ambient mesh background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30 pointer-events-none bg-[radial-gradient(at_0%_0%,rgba(112,179,63,0.2)_0px,transparent_50%),radial-gradient(at_100%_0%,rgba(0,132,255,0.15)_0px,transparent_50%)]" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 space-y-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <Link href="/blog" className="hover:text-brandGreen hover:underline transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-200">Article Detail</span>
        </div>

        {/* Article Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Article Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header / Meta */}
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-brandGreen/10 border border-brandGreen/25 text-brandGreen font-bold text-xxs uppercase tracking-widest inline-block">
                {blog.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
                {blog.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-slate-400 text-xxs font-bold uppercase tracking-wider pt-2 border-b border-white/[0.06] pb-6">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-brandGreen" />
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-brandGreen" />
                  <span>{getReadTime(blog.content)} MIN READ</span>
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-white/[0.08] relative">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>

            {/* Article Content Render */}
            <article className="prose prose-invert max-w-none prose-headings:font-black prose-headings:text-white prose-p:leading-relaxed prose-p:text-slate-300 prose-li:text-slate-300 bg-white/[0.02] p-8 md:p-12 border border-white/[0.08] rounded-3xl">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>

            {/* Back Button */}
            <div className="pt-4">
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 text-sm font-bold text-brandGreen hover:text-brandGreenHover transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Back to Tech Insights</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Related Articles */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl p-8 space-y-6">
              <h3 className="font-extrabold text-xl text-white border-b border-white/[0.06] pb-3">
                Related Articles
              </h3>
              <div className="space-y-6">
                {recentBlogs.map((item) => (
                  <div key={item.id} className="space-y-2 group">
                    <span className="text-xxs text-brandGreen font-bold uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <Link 
                      href={`/blog/${item.slug}`} 
                      className="font-extrabold text-slate-200 group-hover:text-brandGreen text-sm transition-colors block line-clamp-2 leading-snug"
                    >
                      {item.title}
                    </Link>
                    <span className="text-xxs text-slate-500 block">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {recentBlogs.length === 0 && (
                  <p className="text-xs text-slate-500 italic">No other insights published yet.</p>
                )}
              </div>
            </div>

            {/* Quick Contact Widget */}
            <div className="bg-gradient-to-br from-white/[0.01] to-brandGreen/[0.03] border border-white/[0.08] p-8 rounded-3xl space-y-6">
              <h3 className="font-extrabold text-2xl tracking-tight leading-tight text-white">
                Ready to Kickstart Your Project?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect with Aarsha, Priyadharshini, and Velmurugan to start wireframing your system flows today.
              </p>
              <div className="space-y-3 pt-2">
                <Link
                  href="/contact"
                  className="w-full py-3.5 bg-brandGreen hover:bg-brandGreenHover text-white font-bold text-center block text-xs tracking-wider transition-colors rounded-xl shadow-md"
                >
                  Contact Us Now
                </Link>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Together%20Tech%20Groups,%20I%20need%20details%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200 font-bold text-center block text-xs tracking-wider transition-colors rounded-xl flex items-center justify-center space-x-1"
                >
                  <MessageCircle className="w-4 h-4 text-brandGreen fill-brandGreen/20" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
