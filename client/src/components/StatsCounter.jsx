import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, BookOpen, Sparkles, Building2, Code2 } from 'lucide-react';

const StatsCounter = ({ stats = {} }) => {
  const statItems = [
    {
      label: 'Current Company',
      value: 'Zoho',
      subtitle: 'AI Engineer Role',
      icon: Building2,
      color: 'text-primary',
      borderColor: 'border-primary/30',
      bgGlow: 'bg-primary/5',
    },
    {
      label: 'GitHub Public Repos',
      value: stats.publicRepos !== undefined ? stats.publicRepos : '11+',
      subtitle: 'MADURAAGANESH-N',
      icon: Github,
      color: 'text-secondary',
      borderColor: 'border-secondary/30',
      bgGlow: 'bg-secondary/5',
    },
    {
      label: 'Primary Domains',
      value: 'GenAI & ML',
      subtitle: 'LLM & AI Systems',
      icon: Sparkles,
      color: 'text-accent',
      borderColor: 'border-accent/30',
      bgGlow: 'bg-accent/5',
    },
    {
      label: 'Core Stack',
      value: 'Python / MERN',
      subtitle: 'AI & Full-Stack',
      icon: Code2,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgGlow: 'bg-emerald-500/5',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className={`rounded-2xl glass-panel p-5 border ${item.borderColor} ${item.bgGlow} flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-text-subtle uppercase tracking-wider">
                {item.label}
              </span>
              <Icon className={`w-4 h-4 ${item.color}`} />
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {item.value}
              </div>
              <div className="text-xs font-mono text-text-muted mt-1">
                {item.subtitle}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCounter;
