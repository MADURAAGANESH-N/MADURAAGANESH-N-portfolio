import React, { useState, useEffect } from 'react';
import { Briefcase, Building2, Sparkles, Loader2 } from 'lucide-react';
import ExperienceTimeline from '../components/ExperienceTimeline';
import portfolioService from '../services/portfolioService';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const res = await portfolioService.getExperience();
        setExperiences(res.data || []);
      } catch (err) {
        console.error('Error fetching experience:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Career Journey & Professional Milestones</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Work <span className="gradient-text-primary">Experience</span>
        </h1>
        <p className="text-base text-text-muted max-w-2xl">
          Verified professional experience as an AI Engineer at Zoho, driving artificial intelligence and machine learning solutions.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-text-muted">Loading experience timeline...</p>
        </div>
      ) : (
        <ExperienceTimeline experiences={experiences} />
      )}
    </div>
  );
};

export default Experience;
