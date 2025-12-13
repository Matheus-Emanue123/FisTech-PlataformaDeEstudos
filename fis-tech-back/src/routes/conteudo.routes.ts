import { Router } from 'express';
import { 
  createConteudo,
  getAllConteudos,
  getConteudoById,
  updateConteudo,
  deleteConteudo 
} from '../controllers/conteudo.controller';
import { authenticateToken, requireManageUsers } from '../middlewares/auth.middleware';

const router = Router();

router.post('/createConteudo', authenticateToken, requireManageUsers, createConteudo);
router.get('/getAllConteudos', getAllConteudos);
router.get('/getConteudoById/:id', getConteudoById);
router.put('/updateConteudo/:id', authenticateToken, requireManageUsers, updateConteudo);
router.delete('/deleteConteudo/:id', authenticateToken, requireManageUsers, deleteConteudo);

export default router;