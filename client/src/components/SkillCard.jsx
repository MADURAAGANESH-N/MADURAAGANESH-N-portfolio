import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const SkillCard = ({ skill, index = 0 }) => {
  // Dynamically resolve icon from Lucide
  const IconComponent = Icons[skill.icon] || Icons.Cpu;

  const getCategoryGradient = (cat) => {
    switch (cat) {
      case 'AI & Machine Learning':
        return 'from-primary to-secondary';
      case 'Generative AI':
        return 'from-accent to-secondary';
      case 'Software Engineering':
        return 'from-blue-500 to-indigo-500';
      case 'Backend Development':
        return 'from-emerald-500 to-cyan-500';
      case 'Databases':
        return 'from-amber-500 to-orange-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const gradientClass = getCategoryGradient(skill.category);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="group relative rounded-2xl glass-panel p-5 glass-panel-hover flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-card border border-white/10 flex items-center justify-center text-primary group-hover:text-secondary group-hover:border-secondary/40 transition-all shadow-sm">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm group-hover:text-white transition-colors">
              {skill.name}
            </h4>
            <span className="text-[11px] font-mono text-text-subtle">
              {skill.category}
            </span>
          </div>
        </div>

        <span className="font-mono text-xs font-semibold text-text-muted">
          {skill.proficiency}%
        </span>
      </div>

      {/* Proficiency Bar */}
      <div className="w-full h-1.5 bg-card border border-white/5 rounded-full overflow-hidden mt-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.02, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${gradientClass} rounded-full`}
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;
