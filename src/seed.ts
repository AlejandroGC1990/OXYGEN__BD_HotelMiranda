import mongoose from 'mongoose';
import UserModel from './models/userModels.js';
import { fakeUsers } from './data/fake/fakeUsers';
import dotenv from 'dotenv';

dotenv.config();

//? URI para conectarse a la base de datos de MongoDB
const uri = "MONGO_URI";

//? Función para guardar datos ficticios de usuarios
const saveFakeUsers = async () => {
    for (let i = 0; i < 10; i++) {
        const fakeUser = fakeUsers(); // Generar un usuario fake
        const newUser = new UserModel(fakeUser); // Crear una nueva instancia del modelo con los datos fake
        await newUser.save(); // Guardar el usuario en la base de datos
    }
};

//? Función principal para iniciar el seed
export async function seedDB() {
    await dbConnection(); // Conectamos a la base de datos
    await saveFakeUsers(); // Guardamos los usuarios ficticios
    mongoose.connection.close(); // Cerramos la conexión después de completar el proceso
}

//? Función para conectar a MongoDB
async function dbConnection() {
    try {
        await mongoose.connect(uri); // Conectar a MongoDB usando la URI
        console.log("Conexión exitosa a la base de datos");
    } catch (err: any) {
        console.log(err.stack);
        await mongoose.disconnect(); // Desconectar en caso de fallo
    }
}

//? Ejecutamos la función para iniciar el proceso de seed
seedDB();
