import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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
    <header
      id="site_header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'py-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/40'
          : 'py-6 bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <motion.div
          id="logo_container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavClick('about')}
        >
          <div className="p-2 bg-zinc-800 rounded-lg border border-zinc-700/50 group-hover:border-zinc-500 transition-colors">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-mono text-sm font-semibold tracking-wider text-zinc-100 group-hover:text-emerald-400 transition-colors">
            SAMEER.M
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav id="desktop_nav" className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80">
          {navItems.map((item) => (
            <button
              id={`nav_btn_${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-4 py-1.5 text-xs font-mono tracking-wide rounded-full transition-colors duration-200 ${activeSection === item.id ? 'text-emerald-400' : 'text-zinc-400 hover:text-zinc-100'
                }`}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeBubble"
                  className="absolute inset-0 bg-zinc-800 border border-zinc-700/50 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social Actions & Resume Link */}
        <div id="desktop_socials" className="hidden md:flex items-center gap-4">
          <a
            id="github_link"
            href={personalInfo.github}
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            id="linkedin_link"
            href={personalInfo.linkedin}
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <button
            id="header_contact_btn"
            onClick={() => handleNavClick('contact')}
            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            id="mobile_menu_toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile_drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-zinc-800/60 bg-zinc-950/95 backdrop-blur-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <motion.button
                  id={`mobile_nav_btn_${item.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2 px-4 rounded-lg font-mono text-sm transition-all ${activeSection === item.id
                      ? 'bg-zinc-900 text-emerald-400 border-l-2 border-emerald-400'
                      : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="h-[1px] bg-zinc-800/60 my-2" />
              <div className="flex items-center gap-6 px-4">
                <a
                  id="mobile_github"
                  href={personalInfo.github}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-zinc-400 hover:text-zinc-100"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  id="mobile_linkedin"
                  href={personalInfo.linkedin}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-zinc-400 hover:text-zinc-100"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  id="mobile_email"
                  href={`mailto:${personalInfo.email}`}
                  className="text-zinc-400 hover:text-zinc-100"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
