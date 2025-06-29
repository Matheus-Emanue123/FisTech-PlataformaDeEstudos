import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { authenticateToken, requireRole, requireAdmin, requireModerator } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', createUser);

router.get('/', authenticateToken, getUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

// Custom role combinations
// router.get('/moderator-stats', authenticateToken, requireModerator, getModeratorStats);
// router.delete('/:id', authenticateToken, requireAdmin, deleteUser);
// router.put('/:id', authenticateToken, requireModerator, updateUser);

export default router;