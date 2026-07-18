'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ui/ProjectCard';

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
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-neogen">Project Portfolio</h1>
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
                    ? 'bg-brandGreen text-brandDark font-extrabold shadow-md shadow-brandGreen/20'
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                >
                  <ProjectCard project={project} />
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
