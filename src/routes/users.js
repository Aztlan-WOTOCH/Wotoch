import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Aquí irán las rutas de usuarios
// Ejemplos:
// router.get('/', verifyToken, getUsers);
// router.get('/:id', getUserById);
// router.put('/:id', verifyToken, updateUser);
// router.delete('/:id', verifyToken, deleteUser);

export default router;
