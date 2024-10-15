import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { createRoom, getAllRooms, getRoomById, removeRoom, updateRoom } from "../controllers/roomController";

const router = Router();

router.get('/', verifyToken, getAllRooms);
router.get('/:id', verifyToken, getRoomById);
router.post('/', verifyToken, createRoom);
router.put('/:id', verifyToken, updateRoom);
router.delete('/:id', verifyToken, removeRoom);

export default router;