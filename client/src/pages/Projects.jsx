import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Loader2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Code2,
  FolderGit2,
  Sparkles,
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectFilters from '../components/ProjectFilters';
import githubService from '../services/githubService';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('updated');

  const fetchRepositories = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await githubService.getRepos({ refresh: forceRefresh });
      if (res.success) {
        setRepos(res.data || []);
        setFromCache(res.fromCache);
      } else {
        throw new Error(res.message || 'Failed to retrieve repositories');
      }
    } catch (err) {
      console.error('Projects fetch error:', err);
      setError(
        'Unable to load GitHub projects right now. Please check your connection or view directly on GitHub.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  // Filter and sort repositories
  const filteredRepos = useMemo(() => {
    let result = [...repos];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(
        (r) => r.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q)) ||
          r.language.toLowerCase().includes(q) ||
          r.topics.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stars - a.stars;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'created') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // Default: Recently updated
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return result;
  }, [repos, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-secondary/10 text-secondary border border-secondary/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>GitHub Dynamic Integration</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Open Source <span className="gradient-text-cyan">Projects</span>
          </h1>
          <p className="text-base text-text-muted max-w-2xl">
            Live public repositories dynamically synchronized from GitHub. When a new repository is created under <code className="text-secondary font-mono">MADURAAGANESH-N</code>, it automatically appears here.
          </p>
        </div>

        {/* Live GitHub direct link */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/MADURAAGANESH-N"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono bg-card border border-white/10 text-text hover:text-white hover:border-secondary/40 shadow-sm transition-all"
          >
            <Github className="w-4 h-4 text-secondary" />
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3 h-3 text-text-subtle" />
          </a>

          <button
            onClick={() => fetchRepositories(true)}
            disabled={loading}
            className="p-2.5 rounded-xl bg-card border border-white/10 text-text-muted hover:text-white hover:border-primary/40 transition-all disabled:opacity-50"
            title="Force refresh repositories"
            aria-label="Refresh repositories"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <ProjectFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalCount={repos.length}
        filteredCount={filteredRepos.length}
      />

      {/* Main Content States */}
      {loading ? (
        <div className="py-24 text-center rounded-2xl glass-panel">
          <Loader2 className="w-10 h-10 text-secondary animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">Loading projects from GitHub...</h3>
          <p className="text-xs font-mono text-text-muted">
            Connecting to official GitHub REST API (api.github.com/users/MADURAAGANESH-N/repos)...
          </p>
        </div>
      ) : error ? (
        <div className="py-16 px-6 text-center rounded-2xl glass-panel border-rose-500/30 max-w-xl mx-auto space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Unable to load GitHub projects right now.</h3>
          <p className="text-sm text-text-muted">{error}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => fetchRepositories(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-hover"
            >
              Try Again
            </button>
            <a
              href="https://github.com/MADURAAGANESH-N"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-white/10 text-white"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View GitHub Profile</span>
            </a>
          </div>
        </div>
      ) : filteredRepos.length === 0 ? (
        <div className="py-20 text-center rounded-2xl glass-panel border-dashed">
          <Code2 className="w-12 h-12 text-text-subtle mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No matching repositories found.</h3>
          <p className="text-sm text-text-muted mb-4">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo, idx) => (
            <ProjectCard key={repo.id} repo={repo} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
