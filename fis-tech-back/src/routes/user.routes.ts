import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { 
  authenticateToken, 
  requireManageUsers
} from '../middlewares/auth.middleware';

const router = Router();

// Rotas protegidas com permissões (inclui ownership automaticamente)
router.post('/', authenticateToken, requireManageUsers, createUser);
router.get('/', authenticateToken, requireManageUsers, getUsers);
router.get('/:id', authenticateToken, requireManageUsers, getUserById);
router.put('/:id', authenticateToken, requireManageUsers, updateUser);
router.delete('/:id', authenticateToken, requireManageUsers, deleteUser);

export default router;