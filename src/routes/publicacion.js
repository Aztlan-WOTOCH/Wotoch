import express from 'express';
import * as publicacionController from '../controllers/publicacionController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', publicacionController.obtenerPublicaciones);
router.post('/', verifyToken, publicacionController.crearPublicacion);
router.post('/like', verifyToken, publicacionController.darLike);
router.post('/unlike', verifyToken, publicacionController.quitarLike);

export default router;
