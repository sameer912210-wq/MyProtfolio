import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, ArrowUpRight, Code, Sparkles, Database, X } from 'lucide-react';
import { projects } from '../data/portfolio';
import { Project } from '../types';

export default function Projects() {
  const [filter, setFilter] = useState<'All' | 'Full-Stack' | 'Frontend' | 'AI'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ('All' | 'Full-Stack' | 'Frontend' | 'AI')[] = ['All', 'Full-Stack', 'Frontend', 'AI'];

  const filteredProjects = projects.filter(
    (project) => filter === 'All' || project.category === filter
  );

  return (
    <section id="projects" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-3">
              My Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zinc-100">
              Featured Projects
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-lg">
              A curated selection of dynamic full-stack applications, interactive UI canvasses, and deep integrations that showcase my problem-solving approach.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                id={`filter_btn_${cat}`}
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 font-mono text-xs tracking-wider rounded-lg transition-all duration-200 ${
                  filter === cat
                    ? 'bg-zinc-800 text-emerald-400 border border-zinc-700/50'
                    : 'text-zinc-400 hover:text-zinc-200 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          id="projects_grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                id={`project_card_${project.id}`}
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col justify-between group h-full relative"
              >
                {/* Image Section */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <div className="absolute inset-0 bg-zinc-950/40 z-10 group-hover:bg-zinc-950/20 transition-all duration-300" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Tag overlay */}
                  <span className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-md font-mono text-[10px] text-zinc-300 tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Info Section */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-sans font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-zinc-800/50 border border-zinc-800 rounded text-[10px] font-mono text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-0.5 bg-zinc-800/50 border border-zinc-800 rounded text-[10px] font-mono text-zinc-400">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        id={`proj_details_btn_${project.id}`}
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 py-2 px-3 bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700/40 hover:border-zinc-500/40 text-zinc-300 hover:text-white font-mono text-[11px] font-medium rounded-lg transition-all flex items-center justify-center gap-1.5"
                      >
                        View Details
                      </button>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            id={`proj_github_link_${project.id}`}
                            href={project.githubUrl}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors"
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            id={`proj_live_link_${project.id}`}
                            href={project.liveUrl}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 text-left"
              >
                {/* Close Button */}
                <button
                  id="modal_close_btn"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-zinc-950/60 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors z-20"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Hero Cover */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <span className="px-2.5 py-1 bg-emerald-500 text-zinc-950 font-mono text-[10px] font-bold uppercase rounded tracking-wider">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-3">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>

                  {/* Architecture & Tech Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-b border-zinc-800/80 py-6">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider mb-3">
                        <Code className="w-4 h-4 text-emerald-400" />
                        Key Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-zinc-800/60 border border-zinc-800 rounded text-xs font-mono text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider mb-3">
                        <Database className="w-4 h-4 text-indigo-400" />
                        Infrastructure
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Responsive API pipelines, fully integrated data layers, production builds compiled via modern toolchains, hosted dynamically.
                      </p>
                    </div>
                  </div>

                  {/* Footer links */}
                  <div className="flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex gap-4">
                      {selectedProject.githubUrl && (
                        <a
                          id="modal_github_link"
                          href={selectedProject.githubUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-lg text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
                        >
                          <Github className="w-4 h-4" />
                          View Repository
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a
                          id="modal_live_link"
                          href={selectedProject.liveUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-semibold rounded-lg flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-emerald-500/20"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Application
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
