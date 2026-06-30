import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ChevronRight, ArrowRight, Layers, Tag, User, Globe, Code, ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.portfolio.findUnique({ where: { id } });
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.projectName} | Project Details`,
    description: project.description,
  };
}

export const revalidate = 60; // Cache and revalidate every 60 seconds (ISR)

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.portfolio.findUnique({
    where: { id },
  });

  if (!project || project.status === 'INACTIVE') {
    notFound();
  }

  return (
    <div className="space-y-0">

      {/* Header Banner */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-8">
          <div className="flex items-center space-x-2 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-4">
            <Link href="/portfolio" className="hover:underline">Portfolio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{project.projectName}</span>
          </div>
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">{project.projectName}</h1>
            <p className="text-lg text-emerald-50 font-semibold">{project.clientName}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-md h-96 flex items-center justify-center relative">
              <img
                src={project.image}
                alt={project.projectName}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-brandDark via-brandDark/40 to-transparent z-10" />
              <div className="text-center z-20 p-6 space-y-2">
                <span className="px-3 py-1 rounded-full bg-brandGreen text-white text-xxs font-black uppercase tracking-widest">{project.category}</span>
                <h3 className="font-extrabold text-3xl text-white">{project.projectName}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-black text-brandDark">Project Description</h2>
              <p className="text-brandGray leading-relaxed font-medium text-base">
                {project.description}
              </p>
            </div>
          </div>

          {/* Sidebar parameters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <h3 className="font-extrabold text-xl text-brandDark border-b border-slate-100 pb-3">Project Details</h3>

              <ul className="space-y-4 text-sm">
                <li className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-brandGreen flex-shrink-0" />
                  <div>
                    <span className="text-xxs text-slate-400 font-bold block uppercase">Client Name</span>
                    <span className="font-extrabold text-brandDark">{project.clientName}</span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Tag className="w-5 h-5 text-brandGreen flex-shrink-0" />
                  <div>
                    <span className="text-xxs text-slate-400 font-bold block uppercase">Category</span>
                    <span className="font-extrabold text-brandDark">{project.category}</span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-brandGreen flex-shrink-0" />
                  <div>
                    <span className="text-xxs text-slate-400 font-bold block uppercase">Technologies</span>
                    <span className="font-extrabold text-brandDark">{project.technologies}</span>
                  </div>
                </li>
                {project.projectLink && (
                  <li className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-brandGreen flex-shrink-0" />
                    <div>
                      <span className="text-xxs text-slate-400 font-bold block uppercase">Project Live Link</span>
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="font-extrabold text-brandGreen hover:text-brandGreenHover underline">
                        Visit Live Project
                      </a>
                    </div>
                  </li>
                )}
              </ul>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <Link
                  href={`/contact?enquiry=similar&project=${encodeURIComponent(project.projectName)}`}
                  className="w-full py-3.5 rounded-xl bg-brandGreen hover:bg-brandGreenHover text-white font-bold text-center block text-xs tracking-wider transition-colors shadow-md shadow-brandGreen/10"
                >
                  Enquire For Similar Project
                </Link>
                <Link
                  href="/portfolio"
                  className="w-full py-3.5 rounded-xl border border-slate-200 text-brandDark hover:bg-slate-50 font-bold text-center flex items-center justify-center space-x-2 text-xs transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Portfolio</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
