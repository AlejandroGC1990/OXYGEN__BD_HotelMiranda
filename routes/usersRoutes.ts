import { Router } from "express";
import { getUser, getUsers, createUser, modifyUser, removeUser } from '../controllers/roomController';
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/users', verifyToken, getUsers);
router.get('/user/:id', verifyToken, getUser);
router.post('/user', verifyToken, createUser);
router.put('/user/:id', verifyToken, modifyUser);
router.delete('/user/:id', verifyToken, removeUser);

export default router;