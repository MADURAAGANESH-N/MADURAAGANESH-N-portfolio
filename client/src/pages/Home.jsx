import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Cpu,
  Brain,
  Code2,
  Layers,
  ChevronRight,
  ExternalLink,
  Loader2,
  Building2,
} from 'lucide-react';
import HeroBackground from '../components/HeroBackground';
import StatsCounter from '../components/StatsCounter';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import githubService from '../services/githubService';
import portfolioService from '../services/portfolioService';

const Home = () => {
  const [featuredRepos, setFeaturedRepos] = useState([]);
  const [skills, setSkills] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [reposRes, skillsRes, statsRes] = await Promise.allSettled([
          githubService.getFeaturedRepos(),
          portfolioService.getSkills(),
          githubService.getProfileStats(),
        ]);

        if (reposRes.status === 'fulfilled') {
          setFeaturedRepos(reposRes.value.data || []);
        }
        if (skillsRes.status === 'fulfilled') {
          setSkills((skillsRes.value.data || []).slice(0, 6));
        }
        if (statsRes.status === 'fulfilled') {
          setStats(statsRes.value.data || {});
        }
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <HeroBackground />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 border border-primary/30 text-xs font-mono text-text shadow-glow"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary font-medium">AI Engineer</span>
            <span className="text-text-subtle">@</span>
            <span className="text-white font-semibold">Zoho</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="gradient-text-primary">Maduraaganesh N.</span>
            </h1>
            <p className="text-lg sm:text-2xl font-mono text-secondary font-medium">
              AI Engineer & Software Developer
            </p>
          </motion.div>

          {/* Verified Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            Building intelligent systems and practical AI solutions that turn complex problems into impactful products. Specialized in Artificial Intelligence, Generative AI, and scalable machine learning workflows.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/projects"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white shadow-glow transition-all active:scale-95"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-card hover:bg-white/10 text-white border border-white/10 hover:border-primary/40 transition-all active:scale-95"
            >
              <Mail className="w-4 h-4 text-secondary" />
              <span>Contact Me</span>
            </Link>

            <a
              href="https://github.com/MADURAAGANESH-N"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs text-text-muted hover:text-white bg-card border border-white/5 hover:border-white/20 transition-all"
            >
              <Github className="w-4 h-4 text-primary" />
              <span>GitHub Profile</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatsCounter stats={stats} />
      </section>

      {/* 3. FEATURED GITHUB REPOSITORIES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-secondary uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>GitHub Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-sm text-text-muted mt-2 max-w-xl">
              Dynamically discovered public repositories straight from GitHub. Real code, zero placeholders.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors group"
          >
            <span>Explore All GitHub Repos</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono text-text-muted">Loading projects directly from GitHub API...</p>
          </div>
        ) : featuredRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRepos.map((repo, idx) => (
              <ProjectCard key={repo.id} repo={repo} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl glass-panel border-dashed">
            <Github className="w-10 h-10 text-text-subtle mx-auto mb-2" />
            <p className="text-sm text-text-muted">No featured repositories selected.</p>
            <Link to="/projects" className="text-xs text-primary font-mono mt-2 inline-block">
              View all public repositories →
            </Link>
          </div>
        )}
      </section>

      {/* 4. CORE SKILLS HIGHLIGHT */}
      <section className="py-20 bg-card/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-2">
                <Cpu className="w-4 h-4" />
                <span>Technical Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                AI & Software Domains
              </h2>
              <p className="text-sm text-text-muted mt-2 max-w-xl">
                Confirmed competencies in Artificial Intelligence, Generative AI, and backend architectures.
              </p>
            </div>

            <Link
              to="/skills"
              className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-secondary-light transition-colors group"
            >
              <span>View All Skill Categories</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill, idx) => (
              <SkillCard key={skill._id || idx} skill={skill} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative rounded-3xl glass-panel p-8 sm:p-14 overflow-hidden border-primary/30 shadow-glow">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Let's Build the Next Generation of <span className="gradient-text-cyan">Intelligent Systems</span>
            </h2>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              Open for technical discussions, AI engineering collaborations, research initiatives, and impactful projects.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-primary to-accent text-white shadow-glow hover:from-primary-hover hover:to-accent-hover transition-all"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/experience"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-card hover:bg-white/10 text-text hover:text-white border border-white/10 transition-all"
              >
                View Experience @ Zoho
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
