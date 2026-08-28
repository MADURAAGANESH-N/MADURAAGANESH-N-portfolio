import React, { useState, useEffect } from 'react';
import {
  Github,
  Search,
  Star,
  GitFork,
  Sparkles,
  Eye,
  EyeOff,
  RefreshCw,
  Loader2,
  CheckCircle2,
  SlidersHorizontal,
  Save,
  ArrowUpDown,
} from 'lucide-react';
import githubService from '../../services/githubService';

const AdminProjects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState('');

  const fetchRepos = async (force = false) => {
    setLoading(true);
    try {
      const res = await githubService.getRepos({ includeHidden: true, refresh: force });
      setRepos(res.data || []);
    } catch (err) {
      console.error('Error fetching admin repos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleToggleFeatured = async (repo) => {
    setSavingId(repo.id);
    const newFeatured = !repo.isFeatured;
    try {
      await githubService.updateRepoConfig({
        repoId: repo.id,
        repoName: repo.name,
        isFeatured: newFeatured,
      });
      setRepos((prev) =>
        prev.map((r) => (r.id === repo.id ? { ...r, isFeatured: newFeatured } : r))
      );
      setToast(`Updated ${repo.name}: ${newFeatured ? 'Marked Featured' : 'Removed from Featured'}`);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to update repository configuration.');
    } finally {
      setSavingId(null);
    }
  };

  const handleToggleHidden = async (repo) => {
    setSavingId(repo.id);
    const newHidden = !repo.isHidden;
    try {
      await githubService.updateRepoConfig({
        repoId: repo.id,
        repoName: repo.name,
        isHidden: newHidden,
      });
      setRepos((prev) =>
        prev.map((r) => (r.id === repo.id ? { ...r, isHidden: newHidden } : r))
      );
      setToast(`Updated ${repo.name}: ${newHidden ? 'Hidden from Public' : 'Visible on Public'}`);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to update visibility.');
    } finally {
      setSavingId(null);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await githubService.refreshCache();
      await fetchRepos(true);
      setToast('GitHub repositories successfully refreshed!');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to refresh.');
    } finally {
      setRefreshing(false);
    }
  };

  const filteredRepos = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.language && r.language.toLowerCase().includes(search.toLowerCase())) ||
      (r.category && r.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            GitHub Projects Management
          </h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Control portfolio visibility and featured status. Source of truth is GitHub.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {toast && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {toast}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-secondary/15 text-secondary border border-secondary/30 hover:bg-secondary/25 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh from GitHub'}</span>
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="max-w-md relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
        <input
          type="text"
          placeholder="Filter repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-card border border-white/10 rounded-xl text-xs text-white placeholder:text-text-subtle focus:outline-none focus:border-primary transition-all"
        />
      </div>

      {/* Repository List Table */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
          <p className="text-xs font-mono text-text-muted">Loading repositories...</p>
        </div>
      ) : (
        <div className="rounded-2xl glass-panel overflow-hidden border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-card border-b border-white/5 font-mono text-text-subtle uppercase">
                <tr>
                  <th className="py-3.5 px-4">Repository</th>
                  <th className="py-3.5 px-4">Language / Category</th>
                  <th className="py-3.5 px-4 text-center">Stars & Forks</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-center">Visibility</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRepos.map((repo) => (
                  <tr key={repo.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white font-mono text-sm">{repo.name}</div>
                      <p className="text-[11px] text-text-muted line-clamp-1 max-w-sm mt-0.5">
                        {repo.description || 'No description on GitHub'}
                      </p>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-white/5 text-text-muted font-mono text-[10px]">
                          {repo.language || 'Code'}
                        </span>
                        <div className="text-[10px] font-mono text-text-subtle">
                          {repo.category}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center font-mono text-text-muted">
                      <span>★ {repo.stars}</span>
                      <span className="mx-2">•</span>
                      <span>⑂ {repo.forks}</span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(repo)}
                        disabled={savingId === repo.id}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium font-mono transition-all ${
                          repo.isFeatured
                            ? 'bg-primary/20 text-primary-light border border-primary/40'
                            : 'bg-card text-text-subtle border border-white/5 hover:text-white'
                        }`}
                      >
                        {repo.isFeatured ? '★ Featured' : 'Standard'}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleHidden(repo)}
                        disabled={savingId === repo.id}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium font-mono inline-flex items-center gap-1 transition-all ${
                          repo.isHidden
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {repo.isHidden ? (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Visible</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <a
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline"
                      >
                        <Github className="w-3 h-3" />
                        <span>GitHub</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
