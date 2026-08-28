import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

const categories = [
  'All',
  'AI / ML',
  'Generative AI',
  'Web Development',
  'Backend',
  'Other',
];

const sortOptions = [
  { value: 'updated', label: 'Recently Updated' },
  { value: 'stars', label: 'Most Stars' },
  { value: 'name', label: 'Repository Name' },
  { value: 'created', label: 'Recently Created' },
];

const ProjectFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Top row: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, language, topic..."
            className="w-full pl-10 pr-10 py-2.5 bg-card/90 border border-white/10 rounded-xl text-sm text-text placeholder:text-text-subtle focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-subtle hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="project-sort" className="text-xs font-mono text-text-muted flex items-center gap-1.5 whitespace-nowrap">
            <ArrowUpDown className="w-3.5 h-3.5 text-secondary" />
            <span>Sort:</span>
          </label>
          <select
            id="project-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-card border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-text focus:outline-none focus:border-secondary transition-all"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-card text-text">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                  : 'bg-card/70 border border-white/5 text-text-muted hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          );
        })}

        <div className="ml-auto text-xs font-mono text-text-subtle pl-2 whitespace-nowrap">
          Showing <span className="text-white font-semibold">{filteredCount}</span> of {totalCount} repos
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
