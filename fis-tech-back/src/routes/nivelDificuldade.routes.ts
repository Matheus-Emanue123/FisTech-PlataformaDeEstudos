import { Router } from 'express';
import {
  createNivelDificuldade,
  getAllNiveisDificuldade,
  getNivelDificuldadeById,
  updateNivelDificuldade,
  deleteNivelDificuldade,
} from '../controllers/nivelDificuldade.controller';
import { authenticateToken, requireManageUsers } from '../middlewares/auth.middleware';

const router = Router();

router.post('/createNivelDificuldade', authenticateToken, requireManageUsers, createNivelDificuldade);
router.get('/getAllNiveisDificuldade', authenticateToken, getAllNiveisDificuldade);
router.get('/getNivelDificuldadeById/:id', authenticateToken, getNivelDificuldadeById);
router.put('/updateNivelDificuldade/:id', authenticateToken, requireManageUsers, updateNivelDificuldade);
router.delete('/deleteNivelDificuldade/:id', authenticateToken, requireManageUsers, deleteNivelDificuldade);

export default router;