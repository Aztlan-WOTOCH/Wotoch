import express from 'express';
import * as donacionesController from '../controllers/donacionesController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Obtener todas las publicaciones
router.get('/', donacionesController.obtenerPublicaciones);

// Crear publicación
router.post('/', verifyToken, donacionesController.crearPublicacion);

// Like
router.post('/like', verifyToken, donacionesController.darLike);

// Unlike
router.post('/unlike', verifyToken, donacionesController.quitarLike);

export default router;
