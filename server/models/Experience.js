import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      default: 'Zoho',
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role title is required'],
      default: 'AI Engineer',
      trim: true,
    },
    startDate: {
      type: String,
      default: '[Add employment start date]',
    },
    endDate: {
      type: String,
      default: 'Present',
    },
    isCurrent: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      default: '[Add location]',
    },
    description: {
      type: String,
      default: 'Working as an AI Engineer developing cutting-edge AI and software solutions at Zoho.',
    },
    responsibilities: {
      type: [String],
      default: [
        'Developing and optimizing AI models and machine learning pipelines for enterprise applications.',
        'Collaborating with cross-functional engineering teams to integrate intelligent capabilities into core products.',
        '[Add responsibility]',
        '[Add achievement]',
      ],
    },
    technologies: {
      type: [String],
      default: ['Artificial Intelligence', 'Machine Learning', 'Generative AI', 'LLM Applications', '[Add technology]'],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
export default Experience;
