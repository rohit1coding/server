import express from 'express';
const router = express.Router();

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from '../controllers/categoryController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCategories).post(protect, admin, addCategory);
router
  .route('/:id')
  .get(getCategoryById)
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

export default router;
