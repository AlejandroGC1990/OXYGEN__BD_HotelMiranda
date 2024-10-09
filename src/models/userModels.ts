import { User } from '../interfaces/user';
import mongoose, { Document, Schema } from 'mongoose';

//? Definir el esquema de Mongoose basado en userInterfaz
const userSchema = new Schema({
    user_name: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    user_picture: { type: String },
    user_joined: { type: Date, default: Date.now },
    user_jobDescription: { type: String },
    user_schedule: { type: [String] },
    user_contact: { type: String },
    user_status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

//?Crear el modelo a partir del esquema
const UserModel = mongoose.model<User & Document>('User', userSchema);


export default UserModel;