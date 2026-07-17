import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer id="site_footer" className="bg-zinc-950 border-t border-zinc-900 py-12 relative overflow-hidden no-print">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 text-left">
        {/* Left Side: Brand info */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs tracking-wider text-zinc-400">
            SAMEER.M • &copy; {new Date().getFullYear()}
          </span>
        </div>

        {/* Center Side: Heart tag */}
        <p className="font-mono text-[10px] text-zinc-500 flex items-center gap-1.5">
          Designed & Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> using React, TS & Tailwind
        </p>

        {/* Right Side: Back to top */}
        <button
          id="scroll_to_top_btn"
          onClick={scrollToTop}
          className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-lg transition-all flex items-center justify-center gap-1 text-xs font-mono group"
          title="Scroll to Top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
