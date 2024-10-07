import mongoose, { Schema } from 'mongoose';
import { Contact } from '../interfaces/contact';

//? Esquema de Contact
const ContactSchema: Schema = new Schema({
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
    guest_room_state: { type: String, required: true }
});

//? Crear el modelo Contact
const ContactModel = mongoose.model<Contact>('Contact', ContactSchema);

async function run() {
    //? Conectar a MongoDB
    await mongoose.connect('mongodb://localhost:27017/yourDatabaseName');

    //? Crear un nuevo documento en la colección 'contacts'
    const billContact = new ContactModel({
        guest_idReview: 102,
        guest_timeDateReview: "08-09-2001T12:00:00Z",
        guest_DateReview: "08-09-2001",
        guest_name: "Bill",
        guest_email: "billytheboy@email.com",
        guest_phone: "666 777 987",
        guest_rateReview: 2,
        guest_commentReview: "Good service",
        guest_statusReview: "Published",
        guest_checkIn: "08-09-2001",
        guest_checkInTime: "14:00",
        guest_checkOut: "10-09-2001",
        guest_checkOutTime: "12:00",
        guest_orderDateTime: "08-09-2001T11:00:00Z",
        guest_orderDate: "08-09-2001",
        guest_room_state: "Clean"
    });

    //? Guardar el contacto en la base de datos
    await billContact.save();
    try {
        console.log("Contact saved successfully:", billContact.guest_email);
    } catch (error) {
        console.error("Error while saving contact:", error.message);
    }
}

run().catch(err => console.log(err));