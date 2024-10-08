import { Router } from "express";
import { createRoom, updateRoom, removeRoom, getRoomById, getAllRooms } from '../controllers/roomController';
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/', verifyToken, getAllRooms);
router.get('/:id', verifyToken, getRoomById);
// router.get('/csv', verifyToken, convertRoomToCSV);
router.post('/', verifyToken, createRoom);
router.put('/:id', verifyToken, updateRoom);
router.delete('/:id', verifyToken, removeRoom);

export default router;