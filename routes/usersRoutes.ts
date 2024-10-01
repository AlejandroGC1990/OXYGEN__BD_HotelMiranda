import { Router } from "express";
import { getUser, getUsers, createUser, modifyUser, removeUser } from '../controllers/roomController';

const router = Router();

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.post('/user', createUser);
router.put('/user/:id', modifyUser);
router.delete('/user/:id', removeUser);

export default router;