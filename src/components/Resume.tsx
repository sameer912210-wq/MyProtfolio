import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Download, Printer, CheckCircle, Mail, Phone, Globe, MapPin, Sparkles, Code2, Layers, ShieldCheck } from 'lucide-react';
import { personalInfo, skills, experiences, education, certifications } from '../data/portfolio';

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-24 bg-zinc-950 border-t border-zinc-900">
      {/* Printable styles injected locally */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
            background: white !important;
            color: black !important;
          }
          #printable_resume_sheet, #printable_resume_sheet * {
            visibility: visible;
          }
          #printable_resume_sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            background: white !important;
            color: black !important;
            border: none !important;
            box-shadow: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 no-print">
          <div className="text-left">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-3">
              Curriculum Vitae
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zinc-100">
              Interactive Resume
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-lg">
              Analyze my skill densities, or download/print a perfectly formatted A4 copy of my developer profile.
            </p>
          </div>

          <button
            id="print_resume_btn"
            onClick={handlePrint}
            className="no-print px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white font-mono text-xs font-semibold rounded-lg flex items-center gap-2 transition-all self-start md:self-auto hover:shadow-lg hover:shadow-emerald-500/5"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            Print / Save PDF
          </button>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Skill progress bars & expertise densities */}
          <div className="lg:col-span-4 space-y-8 text-left no-print">
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
              <h3 className="text-lg font-sans font-bold text-zinc-100 mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                Technical Competencies
              </h3>

              <div className="space-y-8">
                {skills.map((cat, cIdx) => (
                  <div key={cIdx} className="space-y-4">
                    <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                      {cat.title}
                    </h4>
                    <div className="space-y-3">
                      {cat.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-300 font-sans font-medium">
                              {skill.name}
                            </span>
                            <span className="text-zinc-500 font-mono">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values / Strengths list */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
              <h3 className="text-lg font-sans font-bold text-zinc-100 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                Professional Pillars
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Automation Framework Design</strong> — Scalable Page Object Model architecture, reusable test utilities, type-safe test code with Playwright & TypeScript.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>Risk-Based Test Coverage</strong> — Deep edge-case analysis, cross-browser & cross-device validation, defect prevention over late-stage detection.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>CI/CD Integrated Quality</strong> — Jenkins pipeline gating, fast feedback loops, flaky test triage, and continuous regression reporting.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Dynamic paper mockup resume sheet */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div
              id="printable_resume_sheet"
              ref={resumeRef}
              className="w-full bg-zinc-900 border border-zinc-800/80 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-left"
            >
              {/* Paper accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-zinc-800 to-indigo-500 no-print" />

              {/* Resume Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-zinc-800 pb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zinc-100 printable-text-black">
                    {personalInfo.name}
                  </h3>
                  <p className="font-mono text-sm text-emerald-400 printable-text-primary mt-1">
                    {personalInfo.title}
                  </p>
                  <p className="text-xs text-zinc-400 printable-text-gray mt-3 max-w-md leading-relaxed">
                    {personalInfo.subtitle}
                  </p>
                </div>

                {/* Print Contact info block */}
                <div className="flex flex-col gap-2 font-mono text-[11px] text-zinc-400 printable-text-gray shrink-0">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-400 printable-icon" />
                    <a href={`mailto:${personalInfo.email}`} className="hover:text-zinc-200">
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 printable-icon" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-emerald-400 printable-icon" />
                    <a href={personalInfo.linkedin} className="hover:text-zinc-200">
                      linkedin.com/sameer-mohammad
                    </a>
                  </div>
                </div>
              </div>

              {/* Resume Summary */}
              <div className="py-8 border-b border-zinc-800">
                <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 printable-header mb-3">
                  Summary Profile
                </h4>
                <p className="text-sm text-zinc-300 printable-text-black leading-relaxed">
                  Passionate and results-oriented Software Quality Engineer with a solid background in test automation and quality assurance for modern web applications. Skilled in designing scalable automation frameworks with Playwright, Selenium, and SpecFlow, using type-safe TypeScript, robust Page Object Model architectures, and seamless CI/CD integration with Jenkins. Committed to clean, maintainable test code and close collaboration within agile teams to ship reliable, high-quality software.
                </p>
              </div>

              {/* Resume Work History */}
              <div className="py-8 border-b border-zinc-800">
                <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 printable-header mb-6">
                  Professional Experience
                </h4>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <h5 className="text-base font-sans font-bold text-zinc-200 printable-text-black">
                          {exp.role} — <span className="text-emerald-400 font-mono text-xs font-medium printable-text-primary">{exp.company}</span>
                        </h5>
                        <span className="font-mono text-[10px] text-zinc-500 printable-text-gray">
                          {exp.period}
                        </span>
                      </div>
                      <p className="font-mono text-[10px] text-zinc-500 printable-text-gray mt-0.5">
                        {exp.location}
                      </p>
                      <ul className="mt-3 space-y-1.5 text-xs text-zinc-400 printable-text-black list-disc pl-4 leading-relaxed">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Education */}
              <div className="py-8 border-b border-zinc-800">
                <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 printable-header mb-6">
                  Education & Credentials
                </h4>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <h5 className="text-base font-sans font-bold text-zinc-200 printable-text-black">
                          {edu.degree}
                        </h5>
                        <span className="font-mono text-[10px] text-zinc-500 printable-text-gray">
                          {edu.period}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="font-mono text-xs text-indigo-400 printable-text-primary">
                          {edu.institution}
                        </p>
                        {edu.grade && (
                          <span className="font-mono text-[10px] text-zinc-400 printable-text-black bg-zinc-800/40 px-2 py-0.5 rounded">
                            Grade: {edu.grade}
                          </span>
                        )}
                      </div>
                      {edu.highlights && (
                        <ul className="mt-3 space-y-1 text-xs text-zinc-400 printable-text-black list-disc pl-4 leading-relaxed">
                          {edu.highlights.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Skills summary - only visible when printing */}
              <div className="hidden print:block py-8">
                <h4 className="font-mono text-xs uppercase tracking-wider text-black mb-4">
                  Core Skills Matrix
                </h4>
                <div className="grid grid-cols-3 gap-4 text-xs text-black">
                  {skills.map((cat, idx) => (
                    <div key={idx}>
                      <h5 className="font-bold border-b border-gray-300 pb-1 mb-2">
                        {cat.title}
                      </h5>
                      <ul className="space-y-1 list-disc pl-4">
                        {cat.skills.map((skill) => (
                          <li key={skill.name}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
