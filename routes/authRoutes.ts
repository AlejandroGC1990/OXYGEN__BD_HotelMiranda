import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

//? Ruta para autenticación (login)
router.post('/login', authenticate);

export default router;