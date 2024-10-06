import { Router } from "express";
import { getAllContacts, getContactById, createContact, updateContact, removeContact } from '../controllers/contactControllers';
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get('/contact', verifyToken, getAllContacts);
router.get('/contact/:id', verifyToken, getContactById);
router.post('/contact', verifyToken, createContact);
router.put('/contact/:id', verifyToken, updateContact);
router.delete('/contact/:id', verifyToken, removeContact);

export default router;