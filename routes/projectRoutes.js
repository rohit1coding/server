import express from 'express';
const router = express.Router();

import {
  getProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject,
  getTopProjects,
  getFeaturedProjects,
} from '../controllers/projectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProjects).post(protect, admin, createProject);
router.get('/top', getTopProjects);
router.get('/get/featured', getFeaturedProjects);
router
  .route('/:id')
  .get(getProjectById)
  .delete(protect, admin, deleteProject)
  .put(protect, admin, updateProject);

export default router;
