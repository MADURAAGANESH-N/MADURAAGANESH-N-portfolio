import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Cpu, ChevronRight } from 'lucide-react';

const ExperienceTimeline = ({ experiences = [] }) => {
  return (
    <div className="relative pl-6 md:pl-8 border-l border-primary/20 space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp._id || index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group"
        >
          {/* Timeline node icon */}
          <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-bg border-2 border-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <div className="w-2 h-2 rounded-full bg-secondary animate-ping" />
          </div>

          <div className="rounded-2xl glass-panel p-6 sm:p-8 glass-panel-hover">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="text-primary font-bold text-lg">@ {exp.company}</span>
                  {exp.isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-secondary/15 text-secondary border border-secondary/30">
                      Current Role
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-text-muted mt-2 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {exp.startDate.startsWith('[') ? (
                      <span className="placeholder-badge">{exp.startDate}</span>
                    ) : (
                      <span>{exp.startDate}</span>
                    )}
                    <span>—</span>
                    <span>{exp.endDate}</span>
                  </span>

                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      {exp.location.startsWith('[') ? (
                        <span className="placeholder-badge">{exp.location}</span>
                      ) : (
                        <span>{exp.location}</span>
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-12 h-12 rounded-xl bg-card border border-white/10 flex items-center justify-center text-primary group-hover:text-secondary transition-colors shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text leading-relaxed mb-6">
              {exp.description}
            </p>

            {/* Responsibilities */}
            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-mono font-semibold text-text-subtle uppercase tracking-wider">
                  Key Responsibilities & Highlights
                </h4>
                <ul className="space-y-2 text-sm text-text-muted">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        {resp.startsWith('[') && resp.endsWith(']') ? (
                          <span className="placeholder-badge">{resp}</span>
                        ) : (
                          <span>{resp}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {exp.technologies && exp.technologies.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-semibold text-text-subtle uppercase tracking-wider mb-2.5">
                  Core Technologies & Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <div key={i}>
                      {tech.startsWith('[') && tech.endsWith(']') ? (
                        <span className="placeholder-badge">{tech}</span>
                      ) : (
                        <span className="tech-pill">
                          <Cpu className="w-3 h-3 text-secondary" />
                          <span>{tech}</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
