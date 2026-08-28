import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Code2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Education', path: '/education' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav shadow-lg py-3'
          : 'bg-bg/60 backdrop-blur-md py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-0.5 shadow-glow group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-bg rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
            </div>
          </div>
          <div>
            <div className="font-bold tracking-tight text-text group-hover:text-white flex items-center gap-1.5">
              <span>Maduraaganesh N.</span>
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
            </div>
            <div className="text-xs text-text-muted font-mono flex items-center gap-1">
              <span>AI Engineer</span>
              <span className="text-secondary/70">@ Zoho</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-all relative ${
                  isActive
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons & Socials */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://github.com/MADURAAGANESH-N"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {isAuthenticated ? (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-primary/20 text-primary-light border border-primary/40 hover:bg-primary/30 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="p-2 rounded-lg text-text-subtle hover:text-text-muted hover:bg-white/5 transition-colors"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          )}

          <Link
            to="/contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white shadow-glow transition-all active:scale-95"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-card border border-border text-text-muted hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-nav border-b border-border px-4 pt-3 pb-6 space-y-2 mt-2"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'text-white bg-primary/20 border-l-4 border-primary'
                      : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/MADURAAGANESH-N"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card text-text-muted hover:text-white"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <Link
                  to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
                  className="p-2 rounded-lg bg-card text-text-muted hover:text-white flex items-center gap-1.5 text-xs font-mono"
                >
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Admin</span>
                </Link>
              </div>

              <Link
                to="/contact"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary to-accent text-white"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
