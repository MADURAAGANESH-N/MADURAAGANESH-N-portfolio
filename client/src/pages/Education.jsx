import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Award, Sparkles, Loader2 } from 'lucide-react';
import EducationCard from '../components/EducationCard';
import portfolioService from '../services/portfolioService';

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        const res = await portfolioService.getEducation();
        setEducationList(res.data || []);
      } catch (err) {
        console.error('Error fetching education:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEdu();
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-accent/10 text-accent border border-accent/20">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic Background</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Education & <span className="gradient-text-purple">Qualifications</span>
        </h1>
        <p className="text-base text-text-muted max-w-2xl">
          Verified degree in Information Technology with foundations in algorithms, software systems, and artificial intelligence.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-text-muted">Loading educational background...</p>
        </div>
      ) : (
        <EducationCard education={educationList} />
      )}
    </div>
  );
};

export default Education;
