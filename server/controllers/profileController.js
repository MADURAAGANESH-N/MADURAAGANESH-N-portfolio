import Profile from '../models/Profile.js';

// Default verified profile object
const defaultProfile = {
  name: 'Maduraaganesh N.',
  role: 'AI Engineer',
  company: 'Zoho',
  qualification: 'B.Tech – Information Technology',
  email: 'nmaduraaganesh@gmail.com',
  githubUrl: 'https://github.com/MADURAAGANESH-N',
  githubUsername: 'MADURAAGANESH-N',
  linkedinUrl: '[Add correct public LinkedIn URL]',
  tagline: 'Building intelligent systems and practical AI solutions that turn complex problems into impactful products.',
  aboutBio: 'AI Engineer at Zoho with a B.Tech in Information Technology. Focused on engineering high-impact Artificial Intelligence, Generative AI, and Machine Learning solutions.',
  professionalSummaryPlaceholder: '[Add professional summary]',
  interests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Generative AI',
    'LLM Applications',
    'AI Engineering',
    'Software Engineering',
  ],
  statusText: 'Engineering AI Solutions @ Zoho',
};

export const getProfile = async (req, res, next) => {
  try {
    let profile = null;
    try {
      profile = await Profile.findOne();
    } catch (e) {
      console.warn('[Profile Controller] Using in-memory fallback:', e.message);
    }

    if (!profile) {
      return res.json({
        success: true,
        data: defaultProfile,
      });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }

    await profile.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};
