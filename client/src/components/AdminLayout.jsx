import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Github,
  Sparkles,
  Briefcase,
  GraduationCap,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import githubService from '../services/githubService';

const adminNavItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Profile Settings', path: '/admin/profile', icon: User },
  { name: 'GitHub Projects', path: '/admin/projects', icon: Github },
  { name: 'Skills', path: '/admin/skills', icon: Sparkles },
  { name: 'Experience', path: '/admin/experience', icon: Briefcase },
  { name: 'Education', path: '/admin/education', icon: GraduationCap },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleRefreshCache = async () => {
    setRefreshing(true);
    setRefreshToast('');
    try {
      const res = await githubService.refreshCache();
      setRefreshToast(res.message || 'GitHub cache refreshed!');
      setTimeout(() => setRefreshToast(''), 4000);
    } catch (err) {
      setRefreshToast('Failed to refresh cache.');
      setTimeout(() => setRefreshToast(''), 4000);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040714] text-text flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-card/60 backdrop-blur-xl p-5 sticky top-0 h-screen justify-between z-30">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-glow">
              M
            </div>
            <div>
              <div className="font-bold text-sm text-white">Maduraaganesh N.</div>
              <div className="text-[11px] font-mono text-primary">Admin Control Center</div>
            </div>
          </Link>

          {/* Nav list */}
          <nav className="space-y-1.5">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary/20 text-white border border-primary/40 shadow-glow'
                        : 'text-text-muted hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-primary-light" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom controls */}
        <div className="pt-4 border-t border-white/5 space-y-2">
          <button
            onClick={handleRefreshCache}
            disabled={refreshing}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono bg-secondary/10 border border-secondary/20 text-secondary hover:bg-secondary/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Purging Cache...' : 'Refresh GitHub Cache'}</span>
          </button>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-bg/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-card border border-border text-text-muted"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-xs font-mono text-text-subtle hidden sm:inline-block">
              Connected as: <span className="text-white font-medium">{user?.email || 'Administrator'}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {refreshToast && (
              <span className="text-xs font-mono text-secondary px-3 py-1 rounded-lg bg-secondary/10 border border-secondary/20 animate-fade-in">
                {refreshToast}
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
              AI
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-card border-b border-border p-4 space-y-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${
                      isActive ? 'bg-primary text-white' : 'text-text-muted'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-rose-400"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* Page Outlet */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
