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



router.post('/createAssunto', authenticateToken, requireManageUsers, createAssunto);
router.get('/getAllAssuntos', authenticateToken, requireManageUsers, getAllAssuntos);
router.get('/getAssuntoById/:id', authenticateToken, requireManageUsers, getAssuntoById);
//router.get('/getAssuntoByNome/:nome', authenticateToken, requireManageUsers, getAssuntoByNome);
router.put('/updateAssunto/:id', authenticateToken, requireManageUsers, updateAssunto);
router.delete('/deleteAssunto/:id', authenticateToken, requireManageUsers, deleteAssunto);

export default router;