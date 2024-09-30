import { Router } from "express";
import { convertRoomsToCSV } from "../controllers/roomController";

const router = Router();

router.get('/convert-to-csv', convertRoomsToCSV);

export default router;