import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
    guest_idReview: { type: Number, required: true, unique: true },
    guest_timeDateReview: { type: String, required: true },
    guest_DateReview: { type: String, required: true },
    guest_name: { type: String, required: true },
    guest_email: { type: String, required: true },
    guest_phone: { type: String, required: true },
    guest_rateReview: { type: Number, required: true },
    guest_commentReview: { type: String, required: true },
    guest_statusReview: { type: String, required: true },
    guest_checkIn: { type: String, required: true },
    guest_checkInTime: { type: String, required: true },
    guest_checkOut: { type: String, required: true },
    guest_checkOutTime: { type: String, required: true },
    guest_orderDateTime: { type: String, required: true },
    guest_orderDate: { type: String, required: true },
    guest_room_state: { type: String, required: true },
});

const ContactModel = model('Contact', contactSchema);
export default ContactModel;
