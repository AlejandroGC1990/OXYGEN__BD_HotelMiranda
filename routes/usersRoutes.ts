import { Router } from "express";
import { getUsersById, getAllUsers, createUser, updateUser, removeUser, convertUsersToCSV} from '../controllers/usersControllers';
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUsersById);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, removeUser);
router.get('/csv', verifyToken, convertUsersToCSV);

export default router;