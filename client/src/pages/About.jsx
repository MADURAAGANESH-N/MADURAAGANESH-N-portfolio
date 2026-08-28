import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  GraduationCap,
  Building2,
  Brain,
  Sparkles,
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  Mail,
  Github,
  ExternalLink,
} from 'lucide-react';
import portfolioService from '../services/portfolioService';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await portfolioService.getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const interests = [
    { title: 'Artificial Intelligence', desc: 'Developing foundational and neural architectures to solve complex computational problems.', icon: Brain, color: 'text-primary' },
    { title: 'Machine Learning', desc: 'Designing data-driven predictive models, classification systems, and optimization pipelines.', icon: Cpu, color: 'text-secondary' },
    { title: 'Generative AI', desc: 'Harnessing modern foundational models to generate content, logic, and intelligent responses.', icon: Sparkles, color: 'text-accent' },
    { title: 'LLM Applications', desc: 'Building Retrieval-Augmented Generation (RAG), vector search systems, and automated agent workflows.', icon: Layers, color: 'text-emerald-400' },
    { title: 'AI Engineering', desc: 'Bridging experimental machine learning research into production-grade, highly scalable software services.', icon: Code2, color: 'text-cyan-400' },
    { title: 'Software Engineering', desc: 'Writing clean, modular, and maintainable full-stack systems and resilient RESTful APIs.', icon: User, color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Top Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          <User className="w-3.5 h-3.5" />
          <span>Profile & Verified Background</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="gradient-text-primary">Maduraaganesh N.</span>
        </h1>
        <p className="text-base text-text-muted max-w-2xl">
          AI Engineer at Zoho with an academic background in Information Technology.
        </p>
      </div>

      {/* Main Verified Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Profile Card */}
        <div className="rounded-2xl glass-panel p-6 sm:p-8 space-y-6 lg:col-span-1 border-primary/20">
          <div className="space-y-3 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-accent p-0.5 mx-auto sm:mx-0 shadow-glow">
              <div className="w-full h-full bg-bg rounded-[14px] flex items-center justify-center">
                <span className="text-2xl font-bold font-mono text-white">MN</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Maduraaganesh N.</h2>
              <p className="text-sm font-mono text-secondary">AI Engineer @ Zoho</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/5 text-xs font-mono">
            <div className="flex items-center gap-2 text-text-muted">
              <Building2 className="w-4 h-4 text-primary shrink-0" />
              <span>Company: <strong className="text-white">Zoho</strong></span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <GraduationCap className="w-4 h-4 text-secondary shrink-0" />
              <span>Qualification: <strong className="text-white">B.Tech – IT</strong></span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <span className="truncate">Email: <strong className="text-white">nmaduraaganesh@gmail.com</strong></span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Github className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>GitHub: <a href="https://github.com/MADURAAGANESH-N" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MADURAAGANESH-N</a></span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <a
              href="mailto:nmaduraaganesh@gmail.com"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-glow"
            >
              <Mail className="w-4 h-4" />
              <span>Direct Email</span>
            </a>
          </div>
        </div>

        {/* Right Column: Narrative & Focus */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl glass-panel p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>Professional Overview</span>
            </h3>
            <p className="text-sm text-text leading-relaxed">
              I am an <strong>AI Engineer at Zoho</strong> with a <strong>B.Tech in Information Technology</strong>. My primary focus is building intelligent systems, deploying machine learning pipelines, and engineering Generative AI and Large Language Model (LLM) applications that solve real-world problems.
            </p>
            <p className="text-sm text-text leading-relaxed">
              I emphasize clean software design, modular architectures, and practical AI implementations where theoretical intelligence translates directly into measurable product impact.
            </p>

            {/* Editable placeholder section */}
            <div className="mt-4 p-4 rounded-xl bg-card/60 border border-dashed border-primary/30 space-y-2">
              <div className="text-xs font-mono text-primary flex items-center gap-2">
                <span>Extended Bio / Summary</span>
                <span className="placeholder-badge text-[10px]">Editable in Admin</span>
              </div>
              <p className="text-xs text-text-muted font-mono leading-relaxed">
                {profile?.professionalSummaryPlaceholder || '[Add professional summary]'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmed Areas of Interest Grid */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono text-secondary uppercase tracking-wider">
            Domain Competencies
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Confirmed Areas of Focus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {interests.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-2xl glass-panel p-6 glass-panel-hover space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-card border border-white/10 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="font-bold text-white text-base">{item.title}</h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
