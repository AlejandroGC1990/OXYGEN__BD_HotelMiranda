import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { createContact, getAllContacts, getContactById, removeContact, updateContact } from "../controllers/contactControllers";

const router = Router();

router.get('/', verifyToken, getAllContacts);
router.get('/:id', verifyToken, getContactById);
router.post('/', verifyToken, createContact);
router.put('/:id', verifyToken, updateContact);
router.delete('/:id', verifyToken, removeContact);

export default router;