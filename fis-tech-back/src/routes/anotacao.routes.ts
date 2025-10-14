import { Router } from 'express';
import { 
  createAnotacao,
  getAnotacaoById,
  getAnotacoesByUserId,
  updateAnotacao,
  deleteAnotacao 
} from '../controllers/anotacao.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/createAnotacao', authenticateToken, createAnotacao);
router.get('/findAnotacaoById/:id', authenticateToken, getAnotacaoById);
router.get('/userAnotacoes', authenticateToken, getAnotacoesByUserId);
router.put('/updateAnotacao/:id', authenticateToken, updateAnotacao);
router.delete('/deleteAnotacao/:id', authenticateToken, deleteAnotacao);
export default router;