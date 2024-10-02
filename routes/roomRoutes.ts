import { Router } from "express";
import { getRoom, getRooms, createRoom, modifyRoom, removeRoom, convertRoomsToCSV } from '../controllers/roomController';
// import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/', getRooms);
router.get('/csv', convertRoomsToCSV);
router.get('/:id', getRoom);
router.post('/', createRoom);
router.put('/:id', modifyRoom);
router.delete('/:id', removeRoom);

export default router;