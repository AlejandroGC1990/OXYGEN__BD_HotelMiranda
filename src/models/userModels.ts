import { User } from '../interfaces/user';
import mongoose, { Document, Schema, CallbackError  } from 'mongoose';
import bcrypt from 'bcrypt';

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

//? Middleware para cifrar la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
    //? Verificar si el campo user_password ha sido modificado o es nuevo
    if (!this.isModified('user_password')) {
        return next();
    }

    try {
        //? Generar una sal (salt) para el hash
        const salt = await bcrypt.genSalt(10);
        //? Cifrar la contraseña
        this.user_password = await bcrypt.hash(this.user_password, salt);
        next();
    } catch (error) {
        next(error as CallbackError);
    }
});

//?Crear el modelo a partir del esquema
const UserModel = mongoose.model<User & Document>('User', userSchema);


export default UserModel;