import axios from 'axios';
import RepoConfig from '../models/RepoConfig.js';

const GITHUB_USERNAME = 'MADURAAGANESH-N';
const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

// In-memory cache
let reposCache = {
  data: null,
  timestamp: 0,
};

let profileCache = {
  data: null,
  timestamp: 0,
};

/**
 * Determine dynamic category for a repository based on topics, language, name, description
 */
const detectCategory = (repo, customCategory = '') => {
  if (customCategory) return customCategory;

  const textToScan = [
    repo.name,
    repo.description || '',
    ...(repo.topics || []),
    repo.language || '',
  ]
    .join(' ')
    .toLowerCase();

  if (
    textToScan.includes('genai') ||
    textToScan.includes('generative') ||
    textToScan.includes('llm') ||
    textToScan.includes('gpt') ||
    textToScan.includes('rag') ||
    textToScan.includes('diffusion') ||
    textToScan.includes('chatbot')
  ) {
    return 'Generative AI';
  }

  if (
    textToScan.includes('ai') ||
    textToScan.includes('ml') ||
    textToScan.includes('machine-learning') ||
    textToScan.includes('deep-learning') ||
    textToScan.includes('detector') ||
    textToScan.includes('image_vs_real') ||
    textToScan.includes('model') ||
    textToScan.includes('vision') ||
    repo.language === 'Python' ||
    repo.language === 'Jupyter Notebook'
  ) {
    return 'AI / ML';
  }

  if (
    textToScan.includes('backend') ||
    textToScan.includes('server') ||
    textToScan.includes('api') ||
    textToScan.includes('express') ||
    textToScan.includes('database') ||
    textToScan.includes('node')
  ) {
    return 'Backend';
  }

  if (
    repo.language === 'JavaScript' ||
    repo.language === 'TypeScript' ||
    repo.language === 'HTML' ||
    repo.language === 'CSS' ||
    repo.language === 'Astro' ||
    textToScan.includes('web') ||
    textToScan.includes('frontend') ||
    textToScan.includes('tracker') ||
    textToScan.includes('marketing') ||
    textToScan.includes('design')
  ) {
    return 'Web Development';
  }

  return 'Other';
};

/**
 * Helper to build GitHub request headers
 */
const getGithubHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Maduraaganesh-Portfolio-Engine/1.0',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token && token.trim() !== '') {
    headers.Authorization = `Bearer ${token.trim()}`;
  }
  return headers;
};

/**
 * Fetch raw repositories from GitHub API
 */
const fetchRawRepos = async () => {
  const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
  const response = await axios.get(url, {
    headers: getGithubHeaders(),
    timeout: 10000,
  });
  return response.data;
};

/**
 * Fetch raw profile from GitHub API
 */
const fetchRawProfile = async () => {
  const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`;
  const response = await axios.get(url, {
    headers: getGithubHeaders(),
    timeout: 10000,
  });
  return response.data;
};

/**
 * Get all repositories with MongoDB overrides and caching
 */
export const getRepositories = async ({ includeHidden = false, forceRefresh = false } = {}) => {
  const now = Date.now();
  const isCacheValid = reposCache.data && now - reposCache.timestamp < CACHE_TTL_MS;

  let rawRepos = [];

  if (!forceRefresh && isCacheValid) {
    rawRepos = reposCache.data;
  } else {
    try {
      rawRepos = await fetchRawRepos();
      reposCache = {
        data: rawRepos,
        timestamp: now,
      };
    } catch (error) {
      console.error(`[GitHub Service Error] Failed to fetch repos: ${error.message}`);
      // Return stale cache if available
      if (reposCache.data) {
        console.warn('[GitHub Service] Serving stale cache due to API error.');
        rawRepos = reposCache.data;
      } else {
        throw error;
      }
    }
  }

  // Fetch overrides from MongoDB RepoConfig if available
  let configs = [];
  try {
    configs = await RepoConfig.find({}).lean();
  } catch (err) {
    console.warn(`[RepoConfig] Could not query RepoConfig from DB: ${err.message}`);
  }

  const configMap = new Map();
  configs.forEach((cfg) => {
    configMap.set(cfg.repoId, cfg);
    configMap.set(cfg.repoName.toLowerCase(), cfg);
  });

  // Transform and normalize repositories
  const processedRepos = rawRepos.map((r) => {
    const config = configMap.get(r.id) || configMap.get(r.name.toLowerCase()) || {};

    const cleanHomepage =
      r.homepage && typeof r.homepage === 'string' && r.homepage.trim().startsWith('http')
        ? r.homepage.trim()
        : null;

    const detectedCategory = detectCategory(r, config.customCategory);

    return {
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: config.customDescription || r.description || null,
      htmlUrl: r.html_url,
      homepage: cleanHomepage,
      language: r.language || 'Code',
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      topics: Array.from(new Set([...(r.topics || []), ...(config.customTags || [])])),
      category: detectedCategory,
      updatedAt: r.updated_at,
      createdAt: r.created_at,
      pushedAt: r.pushed_at,
      size: r.size,
      isArchived: r.archived || false,
      isFork: r.fork || false,
      // Portfolio-specific fields from MongoDB
      isFeatured: config.isFeatured || false,
      isHidden: config.isHidden || false,
      displayOrder: config.displayOrder !== undefined ? config.displayOrder : 100,
      customImage: config.customImage || '',
    };
  });

  // Filter out hidden repos unless explicitly requested (e.g. for Admin Dashboard)
  const filtered = includeHidden ? processedRepos : processedRepos.filter((r) => !r.isHidden);

  // Sort: Featured first, then displayOrder ascending, then updatedAt descending
  filtered.sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return a.isFeatured ? -1 : 1;
    }
    if (a.displayOrder !== b.displayOrder) {
      return a.displayOrder - b.displayOrder;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return {
    success: true,
    total: filtered.length,
    fromCache: !forceRefresh && isCacheValid,
    cacheExpiresInSeconds: Math.max(0, Math.round((CACHE_TTL_MS - (now - reposCache.timestamp)) / 1000)),
    data: filtered,
  };
};

/**
 * Get Featured repositories for Home page
 */
export const getFeaturedRepositories = async () => {
  const result = await getRepositories({ includeHidden: false });
  // Featured repos: explicitly marked featured OR top 4 recently updated AI/ML/GenAI repos
  let featured = result.data.filter((r) => r.isFeatured);

  if (featured.length === 0) {
    // If none explicitly marked, pick top repos with priority for AI/ML/TypeScript/Astro
    featured = result.data.slice(0, 3);
  }

  return {
    success: true,
    count: featured.length,
    data: featured,
  };
};

/**
 * Get GitHub User Profile & Calculated Stats
 */
export const getProfileStats = async ({ forceRefresh = false } = {}) => {
  const now = Date.now();
  const isCacheValid = profileCache.data && now - profileCache.timestamp < CACHE_TTL_MS;

  let rawProfile = null;

  if (!forceRefresh && isCacheValid) {
    rawProfile = profileCache.data;
  } else {
    try {
      rawProfile = await fetchRawProfile();
      profileCache = {
        data: rawProfile,
        timestamp: now,
      };
    } catch (error) {
      console.error(`[GitHub Service Error] Profile fetch failed: ${error.message}`);
      if (profileCache.data) {
        rawProfile = profileCache.data;
      } else {
        throw error;
      }
    }
  }

  // Calculate total stars and language distribution from repos
  let totalStars = 0;
  let totalForks = 0;
  const languageMap = {};

  try {
    const reposRes = await getRepositories({ includeHidden: true });
    reposRes.data.forEach((repo) => {
      totalStars += repo.stars;
      totalForks += repo.forks;
      if (repo.language && repo.language !== 'Code') {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }
    });
  } catch (err) {
    console.warn(`[GitHub Stats] Repos tally error: ${err.message}`);
  }

  const topLanguages = Object.entries(languageMap)
    .sort((a, b) => b[1] - a[1])
    .map(([lang, count]) => ({ language: lang, count }));

  return {
    success: true,
    data: {
      username: rawProfile.login,
      name: 'Maduraaganesh N.',
      avatarUrl: rawProfile.avatar_url,
      htmlUrl: rawProfile.html_url,
      bio: rawProfile.bio,
      publicRepos: rawProfile.public_repos,
      followers: rawProfile.followers,
      following: rawProfile.following,
      totalStars,
      totalForks,
      topLanguages,
      createdAt: rawProfile.created_at,
      updatedAt: rawProfile.updated_at,
    },
  };
};

/**
 * Invalidate GitHub caches
 */
export const invalidateGitHubCache = () => {
  reposCache = { data: null, timestamp: 0 };
  profileCache = { data: null, timestamp: 0 };
  return true;
};

export default {
  getRepositories,
  getFeaturedRepositories,
  getProfileStats,
  invalidateGitHubCache,
};
