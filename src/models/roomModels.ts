import { Schema, model } from 'mongoose';
import { Room } from '../interfaces/room';

//? Esquema de Room con mensajes de error
const RoomSchema: Schema = new Schema({
    room_id: { 
        type: Number, 
        required: [true, 'Room ID is required'], 
        unique: true 
    },
    room_number: { 
        type: Number, 
        required: [true, 'Room number is required'] 
    },
    room_type: { 
        type: String, 
        required: [true, 'Room type is required'] 
    },
    room_facilities: { 
        type: [String], 
        required: [true, 'Room facilities are required'] 
    },
    room_price: { 
        type: Number, 
        required: [true, 'Room price is required'] 
    },
    offer_price: { 
        type: Number, 
        required: false 
    },
    room_status: { 
        type: String, 
        required: [true, 'Room status is required'] 
    },
    room_picture: { 
        type: String, 
        required: false 
    },
    room_bedType: { 
        type: String, 
        required: [true, 'Room bed type is required'] 
    }
});

//? Crear el modelo 'Room'
const RoomModel = model<Room>('Room', RoomSchema);

export default RoomModel;