import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Search, Sparkles, Brain, Database, Server, Code2, Wrench, Loader2 } from 'lucide-react';
import SkillCard from '../components/SkillCard';
import portfolioService from '../services/portfolioService';

const categories = [
  'All Skills',
  'AI & Machine Learning',
  'Generative AI',
  'Software Engineering',
  'Backend Development',
  'Databases',
  'Tools & Technologies',
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Skills');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await portfolioService.getSkills();
        setSkills(res.data || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills = skills.filter((s) => {
    const matchesCat =
      selectedCategory === 'All Skills' || s.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-secondary/10 text-secondary border border-secondary/20">
          <Cpu className="w-3.5 h-3.5" />
          <span>Skills Architecture & Tech Stack</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Technical <span className="gradient-text-cyan">Expertise</span>
        </h1>
        <p className="text-base text-text-muted max-w-2xl">
          Confirmed technologies and domain proficiencies across AI engineering, LLMs, and full-stack systems.
        </p>
      </div>

      {/* Controls: Search & Category Tabs */}
      <div className="space-y-4">
        <div className="max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
          <input
            type="text"
            placeholder="Search skill (e.g. PyTorch, Python, LLM)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card/80 border border-white/10 rounded-xl text-sm text-white placeholder:text-text-subtle focus:outline-none focus:border-secondary transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                    : 'bg-card/70 border border-white/5 text-text-muted hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-secondary animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-text-muted">Loading technical proficiencies...</p>
        </div>
      ) : filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, idx) => (
            <SkillCard key={skill._id || idx} skill={skill} index={idx} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl glass-panel">
          <Cpu className="w-10 h-10 text-text-subtle mx-auto mb-2" />
          <p className="text-sm text-text-muted">No skills found matching your filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Skills;
