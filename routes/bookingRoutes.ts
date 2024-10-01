import { Router } from 'express';
import {getBookings, getBooking, createBooking, modifyBooking, removeBooking} from '../controllers/bookingController';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.get('/booking', verifyToken, getBookings);
router.get('/booking/:id', verifyToken, getBooking);
router.post('/booking', verifyToken, createBooking);
router.put('/booking/:id', verifyToken, modifyBooking);
router.delete('/booking/:id', verifyToken, removeBooking);

export default router;