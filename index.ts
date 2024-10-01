import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import roomRoutes from './routes/roomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import contactRoutes from './routes/contactRoutes';
import userRoutes from './routes/usersRoutes';
import authRoutes from './routes/authRoutes';
import publicRoutes from './routes/publicRoutes';

dotenv.config(); //? Carga variables del archivo .env

const app = express();
const PORT = process.env.PORT;

//? Middleware
app.use(cors()); 
app.use(express.json()); 

//? Rutas
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);
app.use('/public', publicRoutes);


//? Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
