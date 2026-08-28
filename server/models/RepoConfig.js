import mongoose from 'mongoose';

const repoConfigSchema = new mongoose.Schema(
  {
    repoId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    repoName: {
      type: String,
      required: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 100,
    },
    customDescription: {
      type: String,
      default: '',
    },
    customTags: {
      type: [String],
      default: [],
    },
    customCategory: {
      type: String,
      default: '',
    },
    customImage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const RepoConfig = mongoose.models.RepoConfig || mongoose.model('RepoConfig', repoConfigSchema);
export default RepoConfig;
