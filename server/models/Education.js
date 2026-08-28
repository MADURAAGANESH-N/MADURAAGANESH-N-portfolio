import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      default: 'B.Tech',
      trim: true,
    },
    field: {
      type: String,
      required: [true, 'Field of study is required'],
      default: 'Information Technology',
      trim: true,
    },
    institution: {
      type: String,
      default: '[College/University]',
      trim: true,
    },
    startYear: {
      type: String,
      default: '[Start year]',
    },
    endYear: {
      type: String,
      default: '[Graduation year]',
    },
    grade: {
      type: String,
      default: '[CGPA]',
    },
    description: {
      type: String,
      default: '[Relevant coursework & academic achievements]',
    },
    highlights: {
      type: [String],
      default: [
        'Specialization in Information Technology with strong foundation in computing algorithms and AI concepts.',
        '[Add academic milestone or coursework]',
      ],
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

const Education = mongoose.models.Education || mongoose.model('Education', educationSchema);
export default Education;
