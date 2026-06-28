import Link from 'next/link';
import { prisma } from '@/lib/db';
import { 
  Calendar, Clock, User, ArrowRight, 
  ChevronLeft, ChevronRight, Mail, ExternalLink 
} from 'lucide-react';

export const metadata = {
  title: 'Blog & Insights | Together Tech Groups',
  description: 'Read the latest technical deep-dives, frameworks strategy, and digital industry updates from Together Tech Groups.',
};

export const revalidate = 0; // Dynamic server rendering

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
  });

  const featuredBlog = blogs[0];
  const gridBlogs = blogs.slice(1);

  // Helper to calculate estimated read time dynamically
  const getReadTime = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const words = plainText.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-slate-100 overflow-hidden pt-32 pb-24">
      {/* Ambient mesh background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30 pointer-events-none bg-[radial-gradient(at_0%_0%,rgba(112,179,63,0.2)_0px,transparent_50%),radial-gradient(at_100%_0%,rgba(0,132,255,0.15)_0px,transparent_50%)]" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 space-y-20">
        {/* Hero Section */}
        <header className="text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandGreen/10 border border-brandGreen/20 text-brandGreen font-semibold text-xs tracking-wider uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-brandGreen animate-pulse"></span>
            THE TECH INSIGHTS
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Technical <span className="bg-gradient-to-r from-brandGreen to-[#0084FF] bg-clip-text text-transparent">Excellence</span> meets<br className="hidden md:inline"/>
            Human <span className="bg-gradient-to-r from-brandGreen to-[#0084FF] bg-clip-text text-transparent">Ingenuity</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Exploring the frontiers of digital transformation, AI integration, and the modern web architectural shifts that define the future of business.
          </p>
        </header>

        {/* Featured Post (Asymmetric Layout) */}
        {featuredBlog && (
          <section>
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl overflow-hidden flex flex-col lg:flex-row min-h-[440px] group hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(112,179,63,0.06)]">
              {/* Image Column */}
              <div className="lg:w-3/5 h-64 lg:h-auto relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={featuredBlog.title} 
                  src={featuredBlog.image} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-brandGreen text-white px-4 py-1.5 rounded-full font-bold text-xxs uppercase tracking-wider shadow-md">
                    FEATURED
                  </span>
                  <span className="bg-black/60 text-white/95 px-4 py-1.5 rounded-full font-bold text-xxs uppercase tracking-wider backdrop-blur-sm">
                    {featuredBlog.category}
                  </span>
                </div>
              </div>

              {/* Text Content Column */}
              <div className="lg:w-2/5 p-10 flex flex-col justify-center space-y-6">
                <div className="text-slate-400 font-bold text-xxs uppercase tracking-widest flex items-center gap-3">
                  <span>{new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  <span>{getReadTime(featuredBlog.content)} MIN READ</span>
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight hover:text-brandGreen transition-colors duration-300">
                  <Link href={`/blog/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                </h2>

                <div 
                  className="text-slate-400 text-sm leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: featuredBlog.content.replace(/<[^>]*>/g, '').substring(0, 180) + '...' }}
                />

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-brandGreen/30 flex items-center justify-center bg-white/[0.02]">
                      <User className="w-4 h-4 text-brandGreen" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-300">Together Tech Team</span>
                  </div>
                  <Link 
                    href={`/blog/${featuredBlog.slug}`} 
                    className="inline-flex items-center gap-2 text-brandGreen font-bold text-xs uppercase tracking-wider hover:gap-4 transition-all duration-300"
                  >
                    <span>Read Full Insight</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bento Grid Blog Layout */}
        {gridBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridBlogs.map((blog) => (
              <article 
                key={blog.id} 
                className="bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-3xl overflow-hidden flex flex-col justify-between group hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(112,179,63,0.06)]"
              >
                <div className="h-56 relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={blog.title} 
                    src={blog.image} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/60 text-slate-200 px-3 py-1 rounded-full font-bold text-xxs uppercase tracking-wider border border-white/10 backdrop-blur-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="text-slate-400 font-bold text-xxs uppercase tracking-widest">
                      {getReadTime(blog.content)} MIN READ
                    </div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-brandGreen transition-colors duration-300 line-clamp-2">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <div 
                      className="text-slate-400 text-xs leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: blog.content.replace(/<[^>]*>/g, '').substring(0, 140) + '...' }}
                    />
                  </div>

                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="w-full py-3.5 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] transition-colors font-black text-xxs uppercase tracking-widest flex items-center justify-center gap-2 text-slate-300 hover:text-white"
                  >
                    <span>Read More</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {blogs.length === 0 && (
          <div className="text-center py-20 bg-white/[0.02] border border-white/[0.08] rounded-3xl">
            <p className="text-slate-500 font-bold">No tech insights published yet.</p>
          </div>
        )}

        {/* Minimal Static Pagination Controls */}
        {blogs.length > 0 && (
          <div className="mt-20 flex justify-center items-center gap-3 pt-8 border-t border-white/[0.06]">
            <button className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-slate-400 hover:bg-white/[0.04] hover:text-white transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-11 h-11 rounded-full bg-brandGreen text-white font-bold text-sm shadow-md shadow-brandGreen/20">
              1
            </button>
            <button className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-slate-400 hover:bg-white/[0.04] hover:text-white transition-all">
              2
            </button>
            <span className="text-slate-600 px-1">...</span>
            <button className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-slate-400 hover:bg-white/[0.04] hover:text-white transition-all">
              8
            </button>
            <button className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center text-slate-400 hover:bg-white/[0.04] hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Newsletter Section */}
        <section className="pt-12">
          <div className="bg-gradient-to-br from-white/[0.01] to-brandGreen/[0.02] border border-white/[0.08] p-10 md:p-16 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
              <Mail className="w-96 h-96 text-white translate-x-12 -translate-y-12" />
            </div>
            <div className="relative z-10 max-w-xl space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">Stay at the Forefront</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Get the latest technical deep-dives and digital strategy shifts delivered directly to your inbox. No spam, just pure technical ingenuity.
              </p>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to our newsletter!');
                }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <input 
                  className="flex-grow bg-black/60 border border-white/[0.08] rounded-xl px-6 py-4 text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-brandGreen/25 focus:border-brandGreen transition-all outline-none" 
                  placeholder="Email Address" 
                  type="email"
                  required
                />
                <button 
                  className="px-8 py-4 rounded-xl bg-brandGreen hover:bg-brandGreenHover text-white font-bold transition-all text-sm flex items-center justify-center gap-2 shadow-md shadow-brandGreen/10 active:scale-95" 
                  type="submit"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
