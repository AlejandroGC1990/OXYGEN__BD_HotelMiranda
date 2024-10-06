import { Router } from 'express';
import { getHotelInfo } from '../controllers/infoController';

const router = Router();

//? Ruta pública para mostrar información del hotel y endpoints privados
router.get('/info', getHotelInfo);

export default router;