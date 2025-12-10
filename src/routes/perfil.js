import express from 'express';
import * as perfilController from '../controllers/perfilController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, perfilController.getPerfil);
router.post('/', perfilController.crearPerfil);
router.put('/', verifyToken, perfilController.actualizarPerfil);

export default router;
