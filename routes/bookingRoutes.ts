import { Router } from 'express';
import {getBookings, getBooking, createBooking, modifyBooking, removeBooking} from '../controllers/bookingController';

const router = Router();

router.get('/booking', getBookings);
router.get('/booking/:id', getBooking);
router.post('/booking', createBooking);
router.put('/booking/:id', modifyBooking);
router.delete('/booking/:id', removeBooking);

export default router;