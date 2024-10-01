import { Router } from "express";
import { getContact, getContacts, createContacts, modifyContact, removeContact } from '../controllers/roomController';

const router = Router();

router.get('/contact', getContacts);
router.get('/contact/:id', getContact);
router.post('/contact', createContacts);
router.put('/contact/:id', modifyContact);
router.delete('/contact/:id', removeContact);

export default router;