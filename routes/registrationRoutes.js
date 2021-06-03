import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/registrationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getUsers);
router.route('/').post(registerUser);
router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(getUserById)
  .put(protect, admin, updateUser);

export default router;
