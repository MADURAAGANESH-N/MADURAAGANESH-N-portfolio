import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUp, Sparkles, Terminal, Code } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030612] border-t border-white/5 pt-16 pb-12 text-text-muted relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-glow">
                <div className="w-full h-full bg-bg rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-secondary" />
                </div>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Maduraaganesh N.</span>
            </div>
            
            <p className="text-sm text-text-muted max-w-md leading-relaxed">
              AI Engineer at <span className="text-white font-medium">Zoho</span> specializing in Artificial Intelligence, Generative AI, Machine Learning, and scalable software solutions.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-secondary/10 text-secondary border border-secondary/20">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                B.Tech – Information Technology
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About & Interests</Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-white transition-colors">Skills & Domains</Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-white transition-colors">Experience @ Zoho</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">GitHub Projects</Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-white transition-colors">Education</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-text mb-4">
              Connect Directly
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:nmaduraaganesh@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="truncate">nmaduraaganesh@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MADURAAGANESH-N"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Github className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
                  <span>MADURAAGANESH-N</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Linkedin className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  <span className="placeholder-badge text-[11px]">[LinkedIn URL]</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Maduraaganesh N. All rights reserved.</span>
            <span>•</span>
            <span className="font-mono text-text-subtle">MERN Architecture</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="text-text-subtle hover:text-text-muted transition-colors font-mono">
              Admin Access
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-card border border-white/5 text-text-muted hover:text-white hover:border-primary/40 transition-all"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
