import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Github,
  Sparkles,
  Briefcase,
  GraduationCap,
  MessageSquare,
  RefreshCw,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import githubService from '../../services/githubService';
import portfolioService from '../../services/portfolioService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRepos: 0,
    featuredRepos: 0,
    skillsCount: 0,
    experienceCount: 0,
    educationCount: 0,
    unreadMessages: 0,
  });
  const [recentRepos, setRecentRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const loadDashboardData = async (force = false) => {
    try {
      const [reposRes, skillsRes, expRes, eduRes, msgRes] = await Promise.allSettled([
        githubService.getRepos({ refresh: force, includeHidden: true }),
        portfolioService.getSkills(),
        portfolioService.getExperience(),
        portfolioService.getEducation(),
        portfolioService.getMessages(),
      ]);

      const reposData = reposRes.status === 'fulfilled' ? reposRes.value.data || [] : [];
      const skillsData = skillsRes.status === 'fulfilled' ? skillsRes.value.data || [] : [];
      const expData = expRes.status === 'fulfilled' ? expRes.value.data || [] : [];
      const eduData = eduRes.status === 'fulfilled' ? eduRes.value.data || [] : [];
      const msgData = msgRes.status === 'fulfilled' ? msgRes.value.data || [] : [];
      const unreadCount = msgRes.status === 'fulfilled' ? msgRes.value.unreadCount || 0 : 0;

      setStats({
        totalRepos: reposData.length,
        featuredRepos: reposData.filter((r) => r.isFeatured).length,
        skillsCount: skillsData.length,
        experienceCount: expData.length,
        educationCount: eduData.length,
        unreadMessages: unreadCount,
      });

      setRecentRepos(reposData.slice(0, 5));
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefreshCache = async () => {
    setRefreshing(true);
    setStatusMsg('');
    try {
      await githubService.refreshCache();
      await loadDashboardData(true);
      setStatusMsg('GitHub repository cache successfully updated!');
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (err) {
      setStatusMsg('Error refreshing cache.');
    } finally {
      setRefreshing(false);
    }
  };

  const statCards = [
    { title: 'Total GitHub Repos', value: stats.totalRepos, icon: Github, color: 'text-secondary', link: '/admin/projects', sub: 'MADURAAGANESH-N' },
    { title: 'Featured Projects', value: stats.featuredRepos, icon: Sparkles, color: 'text-primary', link: '/admin/projects', sub: 'Displayed on Home' },
    { title: 'Skills Managed', value: stats.skillsCount, icon: Cpu, color: 'text-accent', link: '/admin/skills', sub: 'Across 6 categories' },
    { title: 'Experience Entries', value: stats.experienceCount, icon: Briefcase, color: 'text-emerald-400', link: '/admin/experience', sub: 'Zoho AI Engineer' },
    { title: 'Education Records', value: stats.educationCount, icon: GraduationCap, color: 'text-cyan-400', link: '/admin/education', sub: 'B.Tech IT' },
    { title: 'Unread Inquiries', value: stats.unreadMessages, icon: MessageSquare, color: 'text-rose-400', link: '/admin/messages', sub: 'Contact submissions' },
  ];

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-text-muted">Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Portfolio Administration
          </h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Maduraaganesh N. • AI Engineer @ Zoho
          </p>
        </div>

        <div className="flex items-center gap-3">
          {statusMsg && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {statusMsg}
            </span>
          )}
          <button
            onClick={handleRefreshCache}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-secondary/15 text-secondary border border-secondary/30 hover:bg-secondary/25 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh GitHub Data'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="rounded-2xl glass-panel p-5 glass-panel-hover flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-text-subtle">{card.title}</span>
                <Icon className={`w-4 h-4 ${card.color} group-hover:scale-110 transition-transform`} />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {card.value}
                </div>
                <div className="text-[11px] font-mono text-text-muted mt-1 flex items-center justify-between">
                  <span>{card.sub}</span>
                  <ArrowUpRight className="w-3 h-3 text-text-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* GitHub Sync Status Section */}
      <div className="rounded-2xl glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-secondary" />
            <h2 className="text-lg font-bold text-white">GitHub Public Repositories Sync</h2>
          </div>
          <Link
            to="/admin/projects"
            className="text-xs font-mono text-primary hover:underline"
          >
            Manage Configurations →
          </Link>
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          GitHub username <code className="text-secondary font-mono">MADURAAGANESH-N</code> is connected. All newly created public repositories are dynamically fetched and cached automatically without requiring manual creation.
        </p>

        <div className="space-y-2 pt-2">
          {recentRepos.map((repo) => (
            <div
              key={repo.id}
              className="flex items-center justify-between p-3 rounded-xl bg-card border border-white/5 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-white font-medium truncate">{repo.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-text-muted">
                  {repo.language}
                </span>
                {repo.isFeatured && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary-light">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-text-subtle font-mono shrink-0">
                <span>★ {repo.stars}</span>
                <span>⑂ {repo.forks}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
