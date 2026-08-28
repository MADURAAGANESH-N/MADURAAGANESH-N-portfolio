import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';

const EducationCard = ({ education = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {education.map((edu, index) => (
        <motion.div
          key={edu._id || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="rounded-2xl glass-panel p-6 sm:p-8 glass-panel-hover"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-card border border-white/10 flex items-center justify-center text-secondary shrink-0 shadow-glow-cyan">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {edu.degree} — <span className="text-secondary">{edu.field}</span>
                </h3>
                <div className="text-sm text-text-muted mt-1 flex items-center gap-2 flex-wrap">
                  {edu.institution.startsWith('[') ? (
                    <span className="placeholder-badge">{edu.institution}</span>
                  ) : (
                    <span className="text-white font-medium">{edu.institution}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-text-muted sm:self-start">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-white/5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {edu.startYear.startsWith('[') ? (
                  <span className="placeholder-badge text-[11px]">{edu.startYear}</span>
                ) : (
                  edu.startYear
                )}
                <span>—</span>
                {edu.endYear.startsWith('[') ? (
                  <span className="placeholder-badge text-[11px]">{edu.endYear}</span>
                ) : (
                  edu.endYear
                )}
              </span>

              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-white/5">
                <Award className="w-3.5 h-3.5 text-yellow-400" />
                <span>CGPA:</span>
                {edu.grade.startsWith('[') ? (
                  <span className="placeholder-badge text-[11px]">{edu.grade}</span>
                ) : (
                  <span className="text-white font-semibold">{edu.grade}</span>
                )}
              </span>
            </div>
          </div>

          <p className="text-sm text-text leading-relaxed mb-6">
            {edu.description.startsWith('[') ? (
              <span className="placeholder-badge">{edu.description}</span>
            ) : (
              edu.description
            )}
          </p>

          {edu.highlights && edu.highlights.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-white/5">
              <h4 className="text-xs font-mono font-semibold text-text-subtle uppercase tracking-wider">
                Academic Highlights & Coursework
              </h4>
              <ul className="space-y-2 text-sm text-text-muted">
                {edu.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      {item.startsWith('[') && item.endsWith(']') ? (
                        <span className="placeholder-badge">{item}</span>
                      ) : (
                        <span>{item}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default EducationCard;
