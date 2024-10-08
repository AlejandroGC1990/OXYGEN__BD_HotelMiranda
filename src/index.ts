//! Este archivo configura tu servidor Express, define middlewares (como cors y express.json())
//!  y carga las rutas de tu API. El archivo .env contiene configuraciones como el puerto (PORT). 

import { connectDB } from './config/db';
import dotenv from 'dotenv';
import app from './app';

//? Conectar a MongoDB
connectDB();

dotenv.config(); //? Carga variables del archivo .env

const PORT = process.env.PORT;

//? Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/public/info`);
});