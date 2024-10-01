import { Router } from "express";
import { getRoom, getRooms, createRoom, modifyRoom, removeRoom, convertRoomsToCSV } from '../controllers/roomController';
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/rooms',  verifyToken, getRooms);
router.get('/rooms/:id',  verifyToken, getRoom);
router.post('/rooms',  verifyToken, createRoom);
router.put('/rooms/:id',  verifyToken, modifyRoom);
router.delete('/rooms/:id',  verifyToken, removeRoom);
router.get('/rooms/csv', verifyToken, convertRoomsToCSV);

export default router;