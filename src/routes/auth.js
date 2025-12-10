import express from 'express';
import {
  registerWithEmail,
  loginWithEmail,
  googleCallback,
  logout,
  getCurrentUser,
  updateUserProfile,
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas
router.post('/register', registerWithEmail);
router.post('/login', loginWithEmail);
router.post('/google', googleCallback);

// Rutas protegidas
router.post('/logout', verifyToken, logout);
router.get('/me', verifyToken, getCurrentUser);
router.put('/profile', verifyToken, updateUserProfile);

export default router;
