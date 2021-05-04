import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  demoUrl: {
    type: String,
    required: true,
  },
  projectFeatures: {
    type: [String],
  },
  projectTechnology: {
    frontend: { type: [String] },
    backend: { type: [String] },
    database: { type: [String] },
  },
  sharingURL: {
    type: String,
  },
  basePrice: {
    type: Number,
    default: 0.0,
  },
  deliveryDays: {
    type: Number,
    default: 0,
  },
  image: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
