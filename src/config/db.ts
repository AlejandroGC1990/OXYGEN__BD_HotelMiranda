//! Manejar la conexión a MongoDB. Este archivo, puedes gestionar la conexión a MongoDB
//! utilizando Mongoose.

import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = (process.env.MONGO_URI) ? process.env.MONGO_URI : '';

const connectDB = async () => {
  try {
    await connect(mongoURI);
    console.log('Conectado a MongoDB con éxito');
  } catch (err: any) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;

