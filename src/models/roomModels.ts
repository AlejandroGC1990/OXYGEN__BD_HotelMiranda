import mongoose, { Schema, model } from 'mongoose';
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

//? Función async para crear una habitación y manejar errores
async function run() {
    try {
        //?Conectar a MongoDB
        await mongoose.connect('mongodb://localhost:27017/yourDatabaseName');

        //?Crear un nuevo documento en la colección 'rooms'
        const newRoom = new RoomModel({
            room_id: 101,
            room_number: 205,
            room_type: "Deluxe",
            room_facilities: ["WiFi", "TV", "Air Conditioner"],
            room_price: 120,
            offer_price: 100,
            room_status: "Available",
            room_picture: "room-205.jpg",
            room_bedType: "King"
        });

        //?Guardar la habitación en la base de datos
        await newRoom.save();
        console.log(newRoom.room_number);
    } catch (error) {
        console.error("Error while saving room: ", error.message);
    }
}

run().catch(err => console.log(err));
