import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Terminal, Code, Cpu } from 'lucide-react';
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 gap-12 items-center w-full">
        {/* Left column: Narrative content */}
        <div className="flex flex-col items-start text-left">
          {/* Profile Photo & Status Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
            {personalInfo.photoUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="relative group cursor-pointer shrink-0"
              >
                {/* Glowing ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.name}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-zinc-800 object-cover bg-zinc-950"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}
            <div className="flex flex-col gap-2">
              <motion.div
                id="status_pill"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
                  Available for New Projects
                </span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5 px-1"
              >
                <span>Based in {personalInfo.location}</span>
              </motion.div>
            </div>
          </div>

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
              <span>Playwright / Selenium</span>
            </div>
            <div className="flex items-center gap-1 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800/40">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>API Testing</span>
            </div>
            <div className="flex items-center gap-1 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800/40">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>BDD / CI-CD</span>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
