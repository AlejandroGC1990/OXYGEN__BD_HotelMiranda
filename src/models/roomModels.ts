import { Room } from "../interfaces/room";
import mongoose, { Document, Schema } from "mongoose";

//? Definir el esquema de Mongoose basado en roomInterfaz
const roomSchema: Schema = new Schema({
    room_id: { type: Number, required: true, unique: true },
    room_number: { type: Number, required: true },
    room_type: { type: String, required: true },
    room_facilities: { type: [String], required: true },
    room_price: { type: Number, required: true },
    offer_price: { type: Number, default: null },
    room_status: { type: String, required: true },
    room_picture: { type: String, required: true },
    room_bedType: { type: String, required: true },
});

//?Crear el modelo a partir del esquema
const RoomModel = mongoose.model<Room & Document>('Room', roomSchema);

export default RoomModel;