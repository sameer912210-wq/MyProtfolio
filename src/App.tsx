import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = ['about', 'projects', 'experience', 'resume', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // focused center of the viewport
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans selection:bg-emerald-500/20 selection:text-emerald-400 overflow-x-hidden antialiased">
      {/* Top sticky floating navigation capsule */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Page Layout Sections */}
      <main className="flex flex-col">
        {/* Section: Hero & Brief Bio */}
        <Hero setActiveSection={setActiveSection} />

        {/* Section: Works & Projects showcase */}
        <Projects />

        {/* Section: Timeline Experience & Academic History */}
        <Experience />

        {/* Section: Printable CV / Resume layout */}
        <Resume />

        {/* Section: Contact Mail Form Dispatcher */}
        <Contact />
      </main>

      {/* Footer copyright and Back-to-top trigger */}
      <Footer />
    </div>
  );
}
