import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import RepoConfig from '../models/RepoConfig.js';

dotenv.config();

const seedData = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.error('[Seeder] Could not connect to MongoDB. Aborting seed.');
      process.exit(1);
    }

    console.log('[Seeder] Cleaning existing collections...');
    await User.deleteMany();
    await Profile.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Education.deleteMany();

    console.log('[Seeder] Creating Admin User...');
    const adminEmail = process.env.ADMIN_EMAIL || 'nmaduraaganesh@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@ZohoAI2026';

    const admin = new User({
      name: 'Maduraaganesh N.',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    await admin.save();
    console.log(`[Seeder] Admin user created: ${adminEmail}`);

    console.log('[Seeder] Creating Profile with verified information...');
    await Profile.create({
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
    });

    console.log('[Seeder] Creating Confirmed Skills...');
    await Skill.insertMany([
      { name: 'Machine Learning', category: 'AI & Machine Learning', proficiency: 92, icon: 'Brain', displayOrder: 1 },
      { name: 'Deep Learning', category: 'AI & Machine Learning', proficiency: 88, icon: 'Cpu', displayOrder: 2 },
      { name: 'Computer Vision', category: 'AI & Machine Learning', proficiency: 85, icon: 'Eye', displayOrder: 3 },
      { name: 'Natural Language Processing (NLP)', category: 'AI & Machine Learning', proficiency: 90, icon: 'MessageSquare', displayOrder: 4 },
      
      { name: 'LLM Applications & Prompt Engineering', category: 'Generative AI', proficiency: 95, icon: 'Sparkles', displayOrder: 1 },
      { name: 'RAG Architecture & Vector DBs', category: 'Generative AI', proficiency: 90, icon: 'Database', displayOrder: 2 },
      { name: 'AI Agents & Tool Calling', category: 'Generative AI', proficiency: 88, icon: 'Bot', displayOrder: 3 },

      { name: 'Python', category: 'Software Engineering', proficiency: 95, icon: 'Code', displayOrder: 1 },
      { name: 'TypeScript / JavaScript', category: 'Software Engineering', proficiency: 88, icon: 'FileCode', displayOrder: 2 },
      { name: 'Data Structures & Algorithms', category: 'Software Engineering', proficiency: 90, icon: 'Binary', displayOrder: 3 },

      { name: 'FastAPI / Flask', category: 'Backend Development', proficiency: 90, icon: 'Zap', displayOrder: 1 },
      { name: 'Node.js & Express.js', category: 'Backend Development', proficiency: 86, icon: 'Server', displayOrder: 2 },
      { name: 'RESTful API Design', category: 'Backend Development', proficiency: 92, icon: 'Network', displayOrder: 3 },

      { name: 'MongoDB & Mongoose', category: 'Databases', proficiency: 88, icon: 'Layers', displayOrder: 1 },
      { name: 'Vector Databases (Chroma / Pinecone / Qdrant)', category: 'Databases', proficiency: 85, icon: 'Database', displayOrder: 2 },
      { name: 'PostgreSQL / SQL', category: 'Databases', proficiency: 84, icon: 'Table', displayOrder: 3 },

      { name: 'Git & GitHub', category: 'Tools & Technologies', proficiency: 95, icon: 'GitBranch', displayOrder: 1 },
      { name: 'Docker & Containerization', category: 'Tools & Technologies', proficiency: 82, icon: 'Box', displayOrder: 2 },
      { name: 'PyTorch / HuggingFace', category: 'Tools & Technologies', proficiency: 89, icon: 'Activity', displayOrder: 3 },
    ]);

    console.log('[Seeder] Creating Experience...');
    await Experience.create({
      company: 'Zoho',
      role: 'AI Engineer',
      startDate: '[Add employment start date]',
      endDate: 'Present',
      isCurrent: true,
      location: '[Add location]',
      description: 'Working as an AI Engineer developing cutting-edge AI and software solutions at Zoho.',
      responsibilities: [
        'Developing and optimizing AI models and machine learning pipelines for enterprise applications.',
        'Collaborating with cross-functional engineering teams to integrate intelligent capabilities into core products.',
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
    });

    console.log('[Seeder] Creating Education...');
    await Education.create({
      degree: 'B.Tech',
      field: 'Information Technology',
      institution: '[College/University]',
      startYear: '[Start year]',
      endYear: '[Graduation year]',
      grade: '[CGPA]',
      description: 'Undergraduate engineering program in Information Technology.',
      highlights: [
        'Specialization in Information Technology with strong foundation in computing algorithms and AI concepts.',
        '[Relevant coursework & academic achievements]',
      ],
      displayOrder: 1,
    });

    console.log('[Seeder] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error] ${error.message}`);
    process.exit(1);
  }
};

seedData();
