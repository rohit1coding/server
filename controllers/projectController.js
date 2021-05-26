import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

// @desc    Get a single project by id
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.remove();
    res.json({ message: 'Project removed from the server!' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  const project = new Project({
    name: 'Sample Project',
    demoUrl: 'https://www.sampleurl.com/',
    projectFeatures: ['feature1', 'feature2', 'feature3'],
    projectTechnology: {
      frontend: ['HTML', 'CSS', 'ReactJS'],
      backend: ['NodeJS'],
      database: ['MongoDB'],
    },
    sharingURL: 'http://www.sampleprojectshare.com/',
    basePrice: 99,
    offerPrice: 89,
    deliveryDays: 3,
    image: 'http://imageurl.com/',
    isFeatured: false,
    sale: false,
    collectionItem: false,
    hotOfferItem: {
      isHotOffer: false,
      basic: { basePrice: 1499, offerPrice: 999 },
      value: { basePrice: 1599, offerPrice: 1299 },
      prime: { basePrice: 1699, offerPrice: 1399 },
    },
    category: '',
    subcategory: '',
    user: req.user._id,
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin

const updateProject = asyncHandler(async (req, res) => {
  const {
    name,
    demoUrl,
    projectFeatures,
    projectTechnology,
    sharingUrl,
    basePrice,
    offerPrice,
    deliveryDays,
    image,
    isFeatured,
    sale,
    collectionItem,
    hotOfferItem,

    category,
    subcategory,
    basic,
    value,
    prime,
  } = req.body;

  const project = await Project.findById(req.params.id);

  if (project) {
    project.name = name;
    project.demoUrl = demoUrl;
    project.projectFeatures = projectFeatures;
    project.projectTechnology = projectTechnology;
    project.sharingUrl = sharingUrl;
    project.basePrice = basePrice;
    project.offerPrice = offerPrice;
    project.deliveryDays = deliveryDays;
    project.image = image;
    project.isFeatured = isFeatured;
    project.sale = sale;
    project.collectionItem = collectionItem;
    project.hotOfferItem = hotOfferItem;
    project.category = category;
    project.subcategory = subcategory;
    project.basic = basic;
    project.value = value;
    project.prime = prime;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Get top 10 projects
// @route   GET /api/projects/top
// @access  Public
const getTopProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ id: -1 }).limit(3);

  res.json(projects);
});

// @desc    Get all featured projects
// @route   GET /api/projects/get/featured
// @access  Public

const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ isFeatured: true });

  res.json(projects);
});

export {
  getProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject,
  getTopProjects,
  getFeaturedProjects,
};
