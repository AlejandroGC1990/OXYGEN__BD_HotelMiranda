import { Router } from "express";
import { getRoom, getRooms, createRoom, modifyRoom, removeRoom, convertRoomsToCSV } from '../controllers/roomController';
// import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/', getRooms);
router.get('/rooms/csv', convertRoomsToCSV);
router.get('/rooms/:id', getRoom);
router.post('/rooms', createRoom);
router.put('/rooms/:id', modifyRoom);
router.delete('/rooms/:id', removeRoom);

export default router;