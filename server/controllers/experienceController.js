import Experience from '../models/Experience.js';

// Confirmed default experience for Maduraaganesh N.
const defaultExperience = [
  {
    _id: 'exp1',
    company: 'Zoho',
    role: 'AI Engineer',
    startDate: '[Add employment start date]',
    endDate: 'Present',
    isCurrent: true,
    location: '[Add location]',
    description: 'Engineering intelligent AI and Machine Learning solutions and LLM-powered applications.',
    responsibilities: [
      'Architecting and implementing machine learning and deep learning pipelines for production systems.',
      'Developing Generative AI and Large Language Model (LLM) powered tools and agentic workflows.',
      '[Add responsibility]',
      '[Add achievement]',
    ],
    technologies: [
      'Artificial Intelligence',
      'Machine Learning',
      'Generative AI',
      'LLM Applications',
      'Python',
      '[Add technology]',
    ],
    displayOrder: 1,
    isVisible: true,
  },
];

export const getExperiences = async (req, res, next) => {
  try {
    let experiences = [];
    try {
      experiences = await Experience.find({ isVisible: true }).sort({ displayOrder: 1, createdAt: -1 });
    } catch (e) {
      console.warn('[Experience Controller] Using fallback experience:', e.message);
    }

    if (!experiences || experiences.length === 0) {
      return res.json({
        success: true,
        total: defaultExperience.length,
        data: defaultExperience,
      });
    }

    res.json({
      success: true,
      total: experiences.length,
      data: experiences,
    });
  } catch (err) {
    next(err);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Experience entry created successfully',
      data: experience,
    });
  } catch (err) {
    next(err);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience entry not found' });
    }

    res.json({
      success: true,
      message: 'Experience entry updated successfully',
      data: experience,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience entry not found' });
    }

    res.json({
      success: true,
      message: 'Experience entry deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
