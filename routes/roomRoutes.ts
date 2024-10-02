import { Router } from "express";
import { getRoom, getRooms, createRoom, modifyRoom, removeRoom, convertRoomsToCSV } from '../controllers/roomController';
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/', getRooms);
router.get('/:id', getRoom);
router.get('/csv', verifyToken, convertRoomsToCSV);
router.post('/', verifyToken, createRoom);
router.put('/:id', verifyToken, modifyRoom);
router.delete('/:id', verifyToken, removeRoom);

export default router;