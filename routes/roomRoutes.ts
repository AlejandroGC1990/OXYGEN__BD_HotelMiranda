import { Router } from "express";
import { getRoom, getRooms, createRooms, modifyRoom, removeRoom } from "../controllers/roomController";

const router = Router();

router.get('/rooms', getRooms);
router.get('/rooms/:id', getRoom);
router.post('/rooms', createRooms);
router.put('/rooms/:id', modifyRoom);
router.delete('/rooms', removeRoom);

export default router;