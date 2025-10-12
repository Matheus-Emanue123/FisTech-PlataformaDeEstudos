import { Router } from 'express';
import { 
  createTopico,
  getAllTopicos,
  getTopicoById,
  updateTopico,
  deleteTopico 
} from '../controllers/topico.controller';
import { authenticateToken, requireManageUsers } from '../middlewares/auth.middleware';

const router = Router();



router.post('/createTopico', authenticateToken, requireManageUsers, createTopico);
router.get('/getAllTopicos', authenticateToken, requireManageUsers, getAllTopicos);
router.get('/getTopicoById/:id', authenticateToken, requireManageUsers, getTopicoById);
router.put('/updateTopico/:id', authenticateToken, requireManageUsers, updateTopico);
router.delete('/deleteTopico/:id', authenticateToken, requireManageUsers, deleteTopico);

export default router;