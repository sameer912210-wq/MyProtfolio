import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileCode2, Terminal, Code, Cpu, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const codeSnippet = `const developer = {
  name: "${personalInfo.name}",
  role: "Full Stack Engineer",
  skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  passion: "Minimalist high-performance systems",
  status: "Open to exciting opportunities",
  contact: () => mailTo("${personalInfo.email}")
};`;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-zinc-950"
    >
      {/* Background visual accents */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px]" />
        {/* Fine grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left column: Narrative content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status pill */}
          <motion.div
            id="status_pill"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
              Available for New Projects
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="hero_title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-zinc-100 leading-tight"
          >
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.h2
            id="hero_subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl font-sans font-medium text-zinc-400 mt-3"
          >
            {personalInfo.title}
          </motion.h2>

          {/* Bio */}
          <motion.p
            id="hero_bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mt-6"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Buttons */}
          <motion.div
            id="hero_actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto"
          >
            <button
              id="hero_projects_btn"
              onClick={() => handleScrollTo('projects')}
              className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs font-semibold rounded-lg flex items-center gap-2 transition-all group"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero_contact_btn"
              onClick={() => handleScrollTo('contact')}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-zinc-100 font-mono text-xs font-semibold rounded-lg transition-all"
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Core Tech highlights */}
          <motion.div
            id="hero_tech_highlights"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 mt-12 text-zinc-500 font-mono text-[11px]"
          >
            <span className="uppercase tracking-widest text-zinc-600 text-[10px]">Specialized In:</span>
            <div className="flex items-center gap-1 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800/40">
              <Code className="w-3.5 h-3.5 text-emerald-400" />
              <span>React / Next.js</span>
            </div>
            <div className="flex items-center gap-1 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800/40">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-1 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800/40">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Node.js / SQL</span>
            </div>
          </motion.div>
        </div>

        {/* Right column: Interactive mockup console */}
        <motion.div
          id="hero_ide_mockup"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 w-full max-w-md lg:max-w-none mx-auto"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-emerald-500/5 overflow-hidden">
            {/* Window bar */}
            <div className="px-4 py-3 bg-zinc-950/70 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                <FileCode2 className="w-3 h-3 text-emerald-400" />
                <span>developer.ts</span>
              </div>
              <div className="w-12" /> {/* empty placeholder for alignment */}
            </div>

            {/* Code content */}
            <div className="p-5 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto text-left select-all bg-zinc-950/40">
              <div className="text-zinc-600 mb-1">// Initialization of software developer profile</div>
              {codeSnippet.split('\n').map((line, idx) => {
                // Color formatting (very basic syntax highlighting)
                let coloredLine = line;
                if (line.includes('const')) {
                  coloredLine = line.replace('const', '<span class="text-indigo-400">const</span>');
                }
                if (line.includes('name:')) {
                  coloredLine = line.replace('name:', '<span class="text-zinc-400">name:</span>');
                }
                if (line.includes('role:')) {
                  coloredLine = line.replace('role:', '<span class="text-zinc-400">role:</span>');
                }
                if (line.includes('skills:')) {
                  coloredLine = line.replace('skills:', '<span class="text-zinc-400">skills:</span>');
                }
                if (line.includes('passion:')) {
                  coloredLine = line.replace('passion:', '<span class="text-zinc-400">passion:</span>');
                }
                if (line.includes('status:')) {
                  coloredLine = line.replace('status:', '<span class="text-zinc-400">status:</span>');
                }
                if (line.includes('contact:')) {
                  coloredLine = line.replace('contact:', '<span class="text-zinc-400">contact:</span>');
                }

                // highlight values
                coloredLine = coloredLine
                  .replace(/"([^"]+)"/g, '<span class="text-emerald-400">"$1"</span>')
                  .replace(/\[([^\]]+)\]/g, (match) => {
                    return match.replace(/"([^"]+)"/g, '<span class="text-emerald-400">"$1"</span>');
                  });

                return (
                  <div key={idx} className="flex gap-4">
                    <span className="w-5 text-zinc-700 text-right select-none">{idx + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: coloredLine }} />
                  </div>
                );
              })}
            </div>

            {/* Status bar */}
            <div className="px-4 py-2 bg-zinc-950/80 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">● Main</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-2">
                <span>TypeScript</span>
                <span className="text-zinc-600">|</span>
                <span>Ln 7, Col 22</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
