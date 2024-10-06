import { Router } from "express";
import { getAllContacts, getContactById, createContact, updateContact, removeContact } from '../controllers/contactControllers';
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/', verifyToken, getAllContacts);
router.get('/:id', verifyToken, getContactById);
router.post('/', verifyToken, createContact);
router.put('/:id', verifyToken, updateContact);
router.delete('/:id', verifyToken, removeContact);

export default router;