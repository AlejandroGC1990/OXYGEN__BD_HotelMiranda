//! Manejar la conexión a MongoDB. Este archivo, puedes gestionar la conexión a MongoDB
//! utilizando Mongoose.

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado a MongoDB con éxito');
  } catch (err: any) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1); 
  }
};

