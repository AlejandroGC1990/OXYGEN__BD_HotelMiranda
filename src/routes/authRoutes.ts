import { Router } from 'express';
import { authenticate, checkAuthentication  } from '../middleware/auth';

const router = Router();

//? Ruta para autenticación (login)
router.post('/', authenticate);

//? Ruta para comprobar el estado de autenticación
router.get('/status', checkAuthentication, (req, res) => {
    if ((req as any).isAuthenticated) {
        res.json({ message: 'Authenticated' });
    } else {
        res.json({ message: 'Not Authenticated' });
    }
});

export default router;