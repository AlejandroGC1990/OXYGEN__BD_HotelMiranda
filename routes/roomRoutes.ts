import { Router } from "express";
import { getRoom, getRooms, createRoom, modifyRoom, removeRoom } from '../controllers/roomController';

const router = Router();

router.get('/rooms', getRooms);
router.get('/rooms/:id', getRoom);
router.post('/rooms', createRoom);
router.put('/rooms/:id', modifyRoom);
router.delete('/rooms/:id', removeRoom);

export default router;