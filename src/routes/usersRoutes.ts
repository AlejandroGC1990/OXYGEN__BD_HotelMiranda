import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { getUsersById, getAllUsers, createUser, updateUser, removeUser} from '../controllers/usersControllers';

const router = Router();

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUsersById);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, removeUser);

export default router;