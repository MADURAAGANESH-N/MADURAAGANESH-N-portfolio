import Skill from '../models/Skill.js';

// Confirmed default skills for Maduraaganesh N. (AI Engineer @ Zoho)
const defaultSkills = [
  // AI & Machine Learning
  { _id: 's1', name: 'Machine Learning', category: 'AI & Machine Learning', proficiency: 92, icon: 'Brain', displayOrder: 1, isVisible: true, isConfirmed: true },
  { _id: 's2', name: 'Deep Learning', category: 'AI & Machine Learning', proficiency: 88, icon: 'Cpu', displayOrder: 2, isVisible: true, isConfirmed: true },
  { _id: 's3', name: 'Computer Vision', category: 'AI & Machine Learning', proficiency: 85, icon: 'Eye', displayOrder: 3, isVisible: true, isConfirmed: true },
  { _id: 's4', name: 'Natural Language Processing (NLP)', category: 'AI & Machine Learning', proficiency: 90, icon: 'MessageSquare', displayOrder: 4, isVisible: true, isConfirmed: true },
  
  // Generative AI
  { _id: 's5', name: 'LLM Applications & Prompt Engineering', category: 'Generative AI', proficiency: 95, icon: 'Sparkles', displayOrder: 1, isVisible: true, isConfirmed: true },
  { _id: 's6', name: 'RAG Architecture & Vector DBs', category: 'Generative AI', proficiency: 90, icon: 'Database', displayOrder: 2, isVisible: true, isConfirmed: true },
  { _id: 's7', name: 'AI Agents & Tool Calling', category: 'Generative AI', proficiency: 88, icon: 'Bot', displayOrder: 3, isVisible: true, isConfirmed: true },
  
  // Software Engineering
  { _id: 's8', name: 'Python', category: 'Software Engineering', proficiency: 95, icon: 'Code', displayOrder: 1, isVisible: true, isConfirmed: true },
  { _id: 's9', name: 'TypeScript / JavaScript', category: 'Software Engineering', proficiency: 88, icon: 'FileCode', displayOrder: 2, isVisible: true, isConfirmed: true },
  { _id: 's10', name: 'Data Structures & Algorithms', category: 'Software Engineering', proficiency: 90, icon: 'Binary', displayOrder: 3, isVisible: true, isConfirmed: true },

  // Backend Development
  { _id: 's11', name: 'FastAPI / Flask', category: 'Backend Development', proficiency: 90, icon: 'Zap', displayOrder: 1, isVisible: true, isConfirmed: true },
  { _id: 's12', name: 'Node.js & Express.js', category: 'Backend Development', proficiency: 86, icon: 'Server', displayOrder: 2, isVisible: true, isConfirmed: true },
  { _id: 's13', name: 'RESTful API Design', category: 'Backend Development', proficiency: 92, icon: 'Network', displayOrder: 3, isVisible: true, isConfirmed: true },

  // Databases
  { _id: 's14', name: 'MongoDB & Mongoose', category: 'Databases', proficiency: 88, icon: 'Layers', displayOrder: 1, isVisible: true, isConfirmed: true },
  { _id: 's15', name: 'Vector Databases (Chroma / Pinecone / Qdrant)', category: 'Databases', proficiency: 85, icon: 'Database', displayOrder: 2, isVisible: true, isConfirmed: true },
  { _id: 's16', name: 'PostgreSQL / SQL', category: 'Databases', proficiency: 84, icon: 'Table', displayOrder: 3, isVisible: true, isConfirmed: true },

  // Tools & Technologies
  { _id: 's17', name: 'Git & GitHub', category: 'Tools & Technologies', proficiency: 95, icon: 'GitBranch', displayOrder: 1, isVisible: true, isConfirmed: true },
  { _id: 's18', name: 'Docker & Containerization', category: 'Tools & Technologies', proficiency: 82, icon: 'Box', displayOrder: 2, isVisible: true, isConfirmed: true },
  { _id: 's19', name: 'PyTorch / HuggingFace', category: 'Tools & Technologies', proficiency: 89, icon: 'Activity', displayOrder: 3, isVisible: true, isConfirmed: true },
];

export const getSkills = async (req, res, next) => {
  try {
    let skills = [];
    try {
      skills = await Skill.find({ isVisible: true }).sort({ category: 1, displayOrder: 1 });
    } catch (e) {
      console.warn('[Skills Controller] Using default skills:', e.message);
    }

    if (!skills || skills.length === 0) {
      return res.json({
        success: true,
        total: defaultSkills.length,
        data: defaultSkills,
      });
    }

    res.json({
      success: true,
      total: skills.length,
      data: skills,
    });
  } catch (err) {
    next(err);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const { name, category, proficiency, icon, displayOrder } = req.body;
    const skill = await Skill.create({
      name,
      category,
      proficiency: Number(proficiency) || 80,
      icon: icon || 'Cpu',
      displayOrder: Number(displayOrder) || 0,
      isVisible: true,
      isConfirmed: true,
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill,
    });
  } catch (err) {
    next(err);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: skill,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
