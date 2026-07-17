import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, ExternalLink, ArrowRight } from 'lucide-react';
import { experiences, education, certifications } from '../data/portfolio';

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'all' | 'work' | 'education'>('all');

  return (
    <section id="experience" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-left mb-16">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-3">
            My Path
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zinc-100">
            Experience & Education
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-lg">
            A comprehensive overview of my professional timeline, academic achievements, and continuous technical learning.
          </p>
        </div>

        {/* Tab filters (Mobile / quick filter) */}
        <div className="flex gap-2 mb-12 bg-zinc-900/40 p-1 rounded-xl border border-zinc-800/80 w-fit">
          <button
            id="tab_all"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 font-mono text-xs tracking-wider rounded-lg transition-all ${
              activeTab === 'all' ? 'bg-zinc-800 text-emerald-400 border border-zinc-700/50' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Show All
          </button>
          <button
            id="tab_work"
            onClick={() => setActiveTab('work')}
            className={`px-4 py-1.5 font-mono text-xs tracking-wider rounded-lg transition-all ${
              activeTab === 'work' ? 'bg-zinc-800 text-emerald-400 border border-zinc-700/50' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Experience
          </button>
          <button
            id="tab_edu"
            onClick={() => setActiveTab('education')}
            className={`px-4 py-1.5 font-mono text-xs tracking-wider rounded-lg transition-all ${
              activeTab === 'education' ? 'bg-zinc-800 text-emerald-400 border border-zinc-700/50' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Education
          </button>
        </div>

        {/* Grid of timelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
          {/* Work Timeline Column */}
          {(activeTab === 'all' || activeTab === 'work') && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-sans font-bold text-zinc-100">Work Experience</h3>
              </div>

              <div className="relative border-l border-zinc-800 ml-4 pl-8 space-y-12">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative group">
                    {/* Circle timeline indicator */}
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-emerald-400 transition-colors flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-emerald-400 transition-colors" />
                    </div>

                    <div className="bg-zinc-900/40 hover:bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] text-zinc-500 flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                          <Calendar className="w-3 h-3 text-emerald-400" />
                          {exp.period}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>

                      <h4 className="text-lg font-sans font-bold text-zinc-100">
                        {exp.role}
                      </h4>
                      <h5 className="font-mono text-xs text-emerald-400 mt-1">
                        {exp.company}
                      </h5>

                      <ul className="mt-4 space-y-2 text-zinc-400 text-xs sm:text-sm list-disc pl-4 leading-relaxed">
                        {exp.description.map((desc, dIdx) => (
                          <li key={dIdx}>{desc}</li>
                        ))}
                      </ul>

                      {/* Experience Skills Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-6 border-t border-zinc-800/40 pt-4">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education & Credentials Timeline Column */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-xl font-sans font-bold text-zinc-100">Education & Certificates</h3>
              </div>

              <div className="relative border-l border-zinc-800 ml-4 pl-8 space-y-12 mb-12">
                {education.map((edu, index) => (
                  <div key={edu.id} className="relative group">
                    {/* Circle timeline indicator */}
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-indigo-400 transition-colors flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-indigo-400 transition-colors" />
                    </div>

                    <div className="bg-zinc-900/40 hover:bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] text-zinc-500 flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                          <Calendar className="w-3 h-3 text-indigo-400" />
                          {edu.period}
                        </span>
                        {edu.grade && (
                          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-full">
                            Grade: {edu.grade}
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg font-sans font-bold text-zinc-100">
                        {edu.degree}
                      </h4>
                      <h5 className="font-mono text-xs text-indigo-400 mt-1">
                        {edu.institution}
                      </h5>

                      {edu.highlights && (
                        <ul className="mt-4 space-y-2 text-zinc-400 text-xs sm:text-sm list-disc pl-4 leading-relaxed">
                          {edu.highlights.map((hl, hIdx) => (
                            <li key={hIdx}>{hl}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications Block */}
              <div className="mt-8 pt-6 border-t border-zinc-800/60">
                <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-6 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Industry Credentials
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-center justify-between gap-4 group transition-colors"
                    >
                      <div className="text-left">
                        <h5 className="text-sm font-sans font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                          {cert.name}
                        </h5>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                      {cert.url && (
                        <a
                          id={`cert_url_${cert.id}`}
                          href={cert.url}
                          className="p-1.5 bg-zinc-800 group-hover:bg-zinc-700 text-zinc-400 group-hover:text-zinc-100 rounded-lg border border-zinc-700/50 transition-colors flex items-center justify-center"
                          title="Verify Credential"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
