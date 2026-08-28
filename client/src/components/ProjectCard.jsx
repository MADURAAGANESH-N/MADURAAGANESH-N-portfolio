import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  Sparkles,
  Tag,
  Code2,
} from 'lucide-react';

const languageColorMap = {
  python: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  typescript: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  javascript: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  astro: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  html: 'bg-red-500/20 text-red-300 border-red-500/30',
  css: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  code: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

const ProjectCard = ({ repo, index = 0 }) => {
  const langKey = (repo.language || 'code').toLowerCase();
  const langBadgeClass = languageColorMap[langKey] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';

  const formattedDate = repo.updatedAt
    ? new Date(repo.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative rounded-2xl glass-panel p-6 flex flex-col justify-between glass-panel-hover overflow-hidden ${
        repo.isFeatured ? 'border-primary/40 shadow-glow' : ''
      }`}
    >
      {/* Top ambient highlight on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top bar: Category + Featured badge + Language */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-mono font-medium ${langBadgeClass}`}>
              {repo.language || 'Code'}
            </span>

            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-text-muted font-mono">
              {repo.category}
            </span>
          </div>

          {repo.isFeatured && (
            <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-primary/20 text-primary-light border border-primary/30 font-medium">
              <Sparkles className="w-3 h-3 text-secondary" />
              Featured
            </span>
          )}
        </div>

        {/* Repository Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors tracking-tight mb-2 flex items-center gap-2">
          <span className="truncate">{repo.name}</span>
        </h3>

        {/* Description */}
        <p className="text-sm text-text-muted line-clamp-3 mb-4 leading-relaxed min-h-[4rem]">
          {repo.description || (
            <span className="text-text-subtle italic">
              Public repository on GitHub by Maduraaganesh N.
            </span>
          )}
        </p>

        {/* Topics Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {repo.topics.slice(0, 4).map((topic, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#11192e] text-slate-400 border border-slate-800"
              >
                #{topic}
              </span>
            ))}
            {repo.topics.length > 4 && (
              <span className="text-[11px] font-mono px-1.5 py-0.5 text-text-subtle">
                +{repo.topics.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom info & Action buttons */}
      <div className="pt-4 border-t border-white/5 mt-auto">
        <div className="flex items-center justify-between text-xs text-text-subtle font-mono mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" title="Stars">
              <Star className="w-3.5 h-3.5 text-yellow-400/80" />
              <span className="text-text-muted">{repo.stars}</span>
            </span>
            <span className="flex items-center gap-1" title="Forks">
              <GitFork className="w-3.5 h-3.5 text-cyan-400/80" />
              <span className="text-text-muted">{repo.forks}</span>
            </span>
          </div>

          {formattedDate && (
            <span className="flex items-center gap-1" title="Last Updated">
              <Calendar className="w-3 h-3 text-text-subtle" />
              <span>{formattedDate}</span>
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-text hover:text-white border border-white/10 hover:border-primary/40 transition-all group/btn"
          >
            <Github className="w-3.5 h-3.5 text-text-muted group-hover/btn:text-primary transition-colors" />
            <span>GitHub</span>
          </a>

          {/* Render Live Demo ONLY if valid homepage URL exists */}
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-secondary/15 hover:bg-secondary/25 text-secondary-light border border-secondary/30 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
