import githubService from '../services/githubService.js';
import RepoConfig from '../models/RepoConfig.js';

export const getRepositories = async (req, res, next) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const includeHidden = req.query.includeHidden === 'true';

    const result = await githubService.getRepositories({
      includeHidden,
      forceRefresh,
    });

    let repos = result.data;

    // Filter by category if requested
    if (req.query.category && req.query.category.toLowerCase() !== 'all') {
      const targetCat = req.query.category.toLowerCase();
      repos = repos.filter(
        (r) => r.category.toLowerCase() === targetCat || r.category.toLowerCase().includes(targetCat)
      );
    }

    // Filter by search query if requested on backend
    if (req.query.search) {
      const q = req.query.search.toLowerCase();
      repos = repos.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q)) ||
          r.language.toLowerCase().includes(q) ||
          r.topics.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort if requested
    if (req.query.sort === 'stars') {
      repos.sort((a, b) => b.stars - a.stars);
    } else if (req.query.sort === 'name') {
      repos.sort((a, b) => a.name.localeCompare(b.name));
    } else if (req.query.sort === 'created') {
      repos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    res.json({
      success: true,
      total: repos.length,
      fromCache: result.fromCache,
      cacheExpiresInSeconds: result.cacheExpiresInSeconds,
      data: repos,
    });
  } catch (err) {
    next(err);
  }
};

export const getFeaturedRepositories = async (req, res, next) => {
  try {
    const result = await githubService.getFeaturedRepositories();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getProfileStats = async (req, res, next) => {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const result = await githubService.getProfileStats({ forceRefresh });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const refreshGitHubCache = async (req, res, next) => {
  try {
    githubService.invalidateGitHubCache();
    const result = await githubService.getRepositories({ forceRefresh: true, includeHidden: true });
    await githubService.getProfileStats({ forceRefresh: true });

    res.json({
      success: true,
      message: 'GitHub repository cache successfully purged and updated.',
      total: result.total,
    });
  } catch (err) {
    next(err);
  }
};

export const getRepoConfigs = async (req, res, next) => {
  try {
    const configs = await RepoConfig.find({}).sort({ displayOrder: 1 });
    res.json({
      success: true,
      data: configs,
    });
  } catch (err) {
    next(err);
  }
};

export const updateRepoConfig = async (req, res, next) => {
  try {
    const { repoId, repoName, isFeatured, isHidden, displayOrder, customDescription, customCategory, customImage, customTags } = req.body;

    if (!repoId && !repoName) {
      return res.status(400).json({
        success: false,
        message: 'repoId or repoName is required',
      });
    }

    const query = repoId ? { repoId } : { repoName };
    const updateData = {
      ...(repoId && { repoId }),
      ...(repoName && { repoName }),
      ...(isFeatured !== undefined && { isFeatured }),
      ...(isHidden !== undefined && { isHidden }),
      ...(displayOrder !== undefined && { displayOrder: Number(displayOrder) }),
      ...(customDescription !== undefined && { customDescription }),
      ...(customCategory !== undefined && { customCategory }),
      ...(customImage !== undefined && { customImage }),
      ...(customTags !== undefined && { customTags }),
    };

    const config = await RepoConfig.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );

    // Invalidate cache so changes take effect immediately
    githubService.invalidateGitHubCache();

    res.json({
      success: true,
      message: `Portfolio configuration updated for ${repoName || repoId}`,
      data: config,
    });
  } catch (err) {
    next(err);
  }
};
