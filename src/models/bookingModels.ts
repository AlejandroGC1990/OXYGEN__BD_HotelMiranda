import mongoose, { Schema, Document } from 'mongoose';
import { Booking } from "../interfaces/booking";

const bookingSchema: Schema = new Schema({
    booking_Id: { type: Number, required: true, unique: true },
    guest: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },    
    specialRequest: { type: String }, 
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },    
});

const BookingModel = mongoose.model<Document & Booking>('Booking', bookingSchema);

export default BookingModel;
