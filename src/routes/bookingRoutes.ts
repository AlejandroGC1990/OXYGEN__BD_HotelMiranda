import { Router } from 'express';
import {getAllBookings, getBookingById, createBooking, updateBooking, removeBooking} from '../controllers/bookingControllers';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.get('/booking', verifyToken, getAllBookings);
router.get('/booking/:id', verifyToken, getBookingById);
router.post('/booking', verifyToken, createBooking);
router.put('/booking/:id', verifyToken, updateBooking);
router.delete('/booking/:id', verifyToken, removeBooking);

export default router;