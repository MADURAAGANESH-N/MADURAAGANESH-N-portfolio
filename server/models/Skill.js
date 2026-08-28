import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: [
        'AI & Machine Learning',
        'Generative AI',
        'Software Engineering',
        'Backend Development',
        'Databases',
        'Tools & Technologies',
      ],
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 85,
    },
    icon: {
      type: String,
      default: 'Cpu',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    isConfirmed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
export default Skill;
