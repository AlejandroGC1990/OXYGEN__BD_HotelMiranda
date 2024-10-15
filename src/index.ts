//! Este archivo configura tu servidor Express, define middlewares (como cors y express.json())
//!  y carga las rutas de tu API. El archivo .env contiene configuraciones como el puerto (PORT). 

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import roomRoutes from './routes/roomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import contactRoutes from './routes/contactRoutes';
import userRoutes from './routes/usersRoutes';
import authRoutes from './routes/authRoutes';
import publicRoutes from './routes/publicRoutes';
// import UserModel from './models/userModels';
// import bcrypt from 'bcrypt';

dotenv.config(); //? Carga variables del archivo .env

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

//? Conexión a MongoDB
mongoose.connect(MONGO_URI!)
  .then(async () => {
    console.log('MongoDB connected');
    //? Para cifrar las contraseñas de los usuarios creados antes de aplicar bcrypt
    // const users = await UserModel.find();
    // users.forEach(async (user) => {
    //     if (!user.user_password.startsWith('$2b$')) { // Si la contraseña no está cifrada
    //         const salt = await bcrypt.genSalt(10);
    //         user.user_password = await bcrypt.hash(user.user_password, salt);
    //         await user.save();
    //         console.log(`Contraseña de ${user.user_name} cifrada correctamente`);
    //     }
    // });
  })
  .catch(err => console.error('MongoDB connection error:', err));

//? Middleware de CORS manual
// app.use((req: Request, res: Response, next: NextFunction) => {
//   if (req.method === 'OPTIONS') {
//     res.end();
//   } else {
//     next();
//   }
// });
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,UPDATE',
  credentials: true,
}));

//? Middleware
app.use(cors({
  origin: '*' // Permite todas las solicitudes de origen cruzado
}
));  // Permite solicitudes desde diferentes dominios
app.use(express.json()); // Parsear cuerpos de las solicitudes en JSON

//? Rutas de autenticación
app.use('/api/login', authRoutes);

//? Rutas
app.use('/public', publicRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);


//? Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/public/info`);
});
