import mongoose, { Schema, model } from 'mongoose';
import { User } from '../interfaces/user';

//? Esquema de User con mensajes de error
const UserSchema: Schema = new Schema({
    user_id: { 
        type: Number, 
        required: [true, 'User ID is required'], 
        unique: true 
    },
    user_name: { 
        type: String, 
        required: [true, 'User name is required'] 
    },
    user_password: { 
        type: String, 
        required: [true, 'User password is required'] 
    },
    user_picture: { 
        type: String, 
        required: [false, 'User picture can be empty'] 
    },
    user_joined: { 
        type: String, 
        required: [true, 'Join date is required'] 
    },
    user_jobDescription: { 
        type: String, 
        required: [true, 'Job description is required'] 
    },
    user_schedule: { 
        type: [String], 
        required: [true, 'User schedule is required'] 
    },
    user_contact: { 
        type: String, 
        required: [true, 'Contact information is required'] 
    },
    user_status: { 
        type: String, 
        required: [true, 'User status is required'] 
    }
});

//? Crear el modelo 'User'
const UserModel = model<User>('User', UserSchema);

//? Función async para crear un usuario y manejar errores
async function run() {
    try {
        //?Crear un nuevo documento en la colección 'users'
        const newUser = new UserModel({
            user_id: 1,
            user_name: "John Doe",
            user_password: "password123",
            user_picture: "profile-pic.jpg",
            user_joined: "2024-01-01",
            user_jobDescription: "Hotel Manager",
            user_schedule: ["Mon", "Wed", "Fri"],
            user_contact: "john.doe@email.com",
            user_status: "Active"
        });

        //?Guardar el usuario en la base de datos
        await newUser.save();
        console.log(newUser.user_name);
    } catch (error: any) {
        console.error("Error while saving user: ", error.message);
    }
}

run().catch(err => console.log(err));
