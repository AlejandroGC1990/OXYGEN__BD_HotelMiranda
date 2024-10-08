import express from 'express';
import cors from 'cors';
import roomRoutes from './routes/roomRoutes';
import contactRoutes from './routes/contactRoutes';
import userRoutes from './routes/usersRoutes';
import authRoutes from './routes/authRoutes';
import publicRoutes from './routes/publicRoutes';

//? Configurar la aplicación
const app = express();

//? Middleware
app.use(cors());
app.use(express.json());

//? Rutas
app.use('/api/login', authRoutes);
app.use('/public', publicRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

export default app;
