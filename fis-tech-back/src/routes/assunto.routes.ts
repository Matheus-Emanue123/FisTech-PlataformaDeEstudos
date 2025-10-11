import { Router } from 'express';
import { 
  createAssunto,
  getAllAssuntos,
  getAssuntoById,
  updateAssunto,
  deleteAssunto 
} from '../controllers/assunto.controller';
import { authenticateToken, requireManageUsers } from '../middlewares/auth.middleware'; // Ou um middleware de admin

const router = Router();

// Assumindo que apenas usuários com permissão podem gerenciar assuntos
router.use(authenticateToken, requireManageUsers); // Adapte a permissão conforme necessário

router.post('/', authenticateToken, requireManageUsers, createAssunto);
router.get('/', authenticateToken, requireManageUsers, getAllAssuntos);
router.get('/:id', authenticateToken, requireManageUsers, getAssuntoById);
router.put('/:id', authenticateToken, requireManageUsers, updateAssunto);
router.delete('/:id', authenticateToken, requireManageUsers, deleteAssunto);

export default router;