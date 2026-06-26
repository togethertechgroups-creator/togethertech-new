'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioClientProps {
  portfolios: any[];
}

export default function PortfolioClient({ portfolios }: PortfolioClientProps) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Websites', 'Apps', 'Software', 'UI/UX', 'Logo', 'Posters'];

  const filteredItems = filter === 'All'
    ? portfolios
    : portfolios.filter(item => item.category.toLowerCase() === filter.toLowerCase() || (filter === 'Apps' && item.category === 'Apps') || (filter === 'Websites' && item.category === 'Websites'));

  return (
    <div className="space-y-0">

      {/* Header */}
      <section className="py-24 bg-gradient-to-r from-brandGreen to-[#5c9930] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4 pt-8">
          <span className="text-emerald-100 font-extrabold text-sm uppercase tracking-wider">Our Works</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Project Portfolio</h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
            A comprehensive list of custom web systems, cross-platform apps, and brand mockups.
          </p>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="py-24 bg-slate-50 text-brandDark">
        <div className="max-w-7xl mx-auto px-6 space-y-12">

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 pb-6 border-b border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${filter === cat
                    ? 'bg-brandGreen text-white shadow-md shadow-brandGreen/20'
                    : 'bg-white text-brandGray hover:bg-slate-100 border border-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-brandGreen/35 transition-all duration-300"
                >
                  <div className="h-64 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-brandDark/85 to-transparent z-10 opacity-70" />
                    <div className="text-center z-20 p-6">
                      <span className="px-3 py-1 rounded-full bg-brandGreen text-white font-extrabold text-xxs uppercase tracking-widest">{project.category}</span>
                      <h3 className="font-extrabold text-2xl text-white mt-3">{project.projectName}</h3>
                      <p className="text-xs text-brandGreenLight mt-1 font-semibold">{project.clientName}</p>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <p className="text-sm text-brandGray leading-relaxed min-h-[64px]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.split(',').map((tech: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-brandDark font-bold text-xxs tracking-wide">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 flex justify-between items-center border-t border-slate-155">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="inline-flex items-center text-sm font-bold text-brandGreen hover:text-brandGreenHover transition-colors space-x-2"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 font-bold">No projects uploaded under this category yet.</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
