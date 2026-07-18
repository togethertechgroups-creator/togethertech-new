'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

export interface ProjectCardProps {
  id: string;
  projectName: string;
  clientName: string;
  category: string;
  image: string;
  description: string;
  technologies: string;
}

export const ProjectCard: React.FC<{ project: ProjectCardProps }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-[380px] mx-auto overflow-visible"
    >
      <BorderGlow
        edgeSensitivity={30}
        glowColor="100 80 50"
        backgroundColor="#ffffff"
        borderRadius={40}
        glowRadius={40}
        glowIntensity={1.0}
        coneSpread={25}
        animated={false}
        colors={['#70B33F', '#EF8E01', '#38bdf8']}
        className="w-full group overflow-visible"
        fillOpacity={0.15}
      >
        <div 
          className="flex flex-col p-3 gap-3 w-full min-h-[480px] justify-between overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
      {/* Top Header Row */}
      <motion.div 
        className='flex justify-between p-2 items-center z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Category Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-black uppercase tracking-widest bg-brandGreen/10 border border-brandGreen/20 text-brandGreen rounded-full px-3 py-1">
            {project.category}
          </span>
        </div>
        
        {/* Top-Right Arrow Action Button */}
        <Link 
          href={`/portfolio/${project.id}`}
          aria-label={`View details for ${project.projectName}`}
        >
          <motion.div 
            className='w-10 h-10 bg-brandGreen rounded-full flex items-center justify-center cursor-pointer text-white'
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "#84c64e",
              boxShadow: "0 0 15px rgba(112, 179, 99, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </motion.div>
        </Link>
      </motion.div>

      {/* Main Column Body */}
      <div className='flex flex-col gap-5 flex-grow justify-between pb-4'>
        {/* Title */}
        <motion.div 
          className="title text-xl text-center font-black text-slate-900 px-4 leading-snug group-hover:text-brandGreen transition-colors duration-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {project.projectName.toUpperCase()}
          <span className="block text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
            {project.clientName}
          </span>
        </motion.div>

        {/* Image Containers */}
        <motion.div 
          className="image relative h-48 overflow-hidden rounded-2xl mx-2 border border-slate-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Blurred Background zoom overlay */}
          <div className="absolute inset-0 rounded-2xl opacity-15 z-0 overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image 
                src={project.image} 
                alt={`${project.projectName} Background`} 
                className="w-full h-full object-cover blur-sm scale-150 opacity-70"
                width={500}
                height={300}
                unoptimized
              />
            </motion.div>
          </div>
          
          {/* Main front image */}
          <motion.div 
            className="relative z-10 p-2 h-full"
            animate={{ scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image 
              src={project.image} 
              alt={project.projectName} 
              className="rounded-2xl w-full h-full object-cover shadow-sm"
              width={500}
              height={300}
              unoptimized
            />
          </motion.div>
        </motion.div>

        {/* Description & Technologies */}
        <div className="space-y-4">
          <motion.div 
            className="desc text-xs text-center max-w-[280px] mx-auto text-slate-600 font-medium leading-relaxed line-clamp-3 min-h-[54px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {project.description}
          </motion.div>

          {/* Technologies split list */}
          <motion.div 
            className="flex flex-wrap justify-center gap-1.5 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            {project.technologies.split(',').map((tech, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-slate-700 font-bold text-[9px] uppercase tracking-wider"
              >
                {tech.trim()}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </BorderGlow>
</motion.div>
);
};

export default ProjectCard;
