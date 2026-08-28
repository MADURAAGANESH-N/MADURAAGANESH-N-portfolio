import Education from '../models/Education.js';

// Confirmed default education for Maduraaganesh N.
const defaultEducation = [
  {
    _id: 'edu1',
    degree: 'B.Tech',
    field: 'Information Technology',
    institution: '[College/University]',
    startYear: '[Start year]',
    endYear: '[Graduation year]',
    grade: '[CGPA]',
    description: 'Undergraduate engineering program focused on Information Technology, Artificial Intelligence foundations, algorithms, and software engineering.',
    highlights: [
      'Comprehensive study of Computer Systems, Algorithms, and Modern AI Paradigms.',
      '[Relevant coursework & academic milestones]',
      '[Academic achievements]',
    ],
    displayOrder: 1,
    isVisible: true,
  },
];

export const getEducation = async (req, res, next) => {
  try {
    let educationList = [];
    try {
      educationList = await Education.find({ isVisible: true }).sort({ displayOrder: 1, createdAt: -1 });
    } catch (e) {
      console.warn('[Education Controller] Using fallback education:', e.message);
    }

    if (!educationList || educationList.length === 0) {
      return res.json({
        success: true,
        total: defaultEducation.length,
        data: defaultEducation,
      });
    }

    res.json({
      success: true,
      total: educationList.length,
      data: educationList,
    });
  } catch (err) {
    next(err);
  }
};

export const createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Education record created successfully',
      data: education,
    });
  } catch (err) {
    next(err);
  }
};

export const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!education) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }

    res.json({
      success: true,
      message: 'Education record updated successfully',
      data: education,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }

    res.json({
      success: true,
      message: 'Education record deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
