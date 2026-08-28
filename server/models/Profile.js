import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Maduraaganesh N.',
    },
    role: {
      type: String,
      required: true,
      default: 'AI Engineer',
    },
    company: {
      type: String,
      required: true,
      default: 'Zoho',
    },
    qualification: {
      type: String,
      required: true,
      default: 'B.Tech – Information Technology',
    },
    email: {
      type: String,
      required: true,
      default: 'nmaduraaganesh@gmail.com',
    },
    githubUrl: {
      type: String,
      required: true,
      default: 'https://github.com/MADURAAGANESH-N',
    },
    githubUsername: {
      type: String,
      required: true,
      default: 'MADURAAGANESH-N',
    },
    linkedinUrl: {
      type: String,
      default: '[Add correct public LinkedIn URL]',
    },
    tagline: {
      type: String,
      default: 'Building intelligent systems and practical AI solutions that turn complex problems into impactful products.',
    },
    aboutBio: {
      type: String,
      default: 'AI Engineer at Zoho with a B.Tech in Information Technology. Focused on engineering high-impact Artificial Intelligence, Generative AI, and Machine Learning solutions.',
    },
    professionalSummaryPlaceholder: {
      type: String,
      default: '[Add professional summary]',
    },
    interests: {
      type: [String],
      default: [
        'Artificial Intelligence',
        'Machine Learning',
        'Generative AI',
        'LLM Applications',
        'AI Engineering',
        'Software Engineering',
      ],
    },
    statusText: {
      type: String,
      default: 'Engineering AI Solutions @ Zoho',
    },
  },
  { timestamps: true }
);

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
export default Profile;
