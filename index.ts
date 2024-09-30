import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); //? Carga variables del archivo .env

const app = express();
const PORT = process.env.PORT;

//? Middleware
app.use(cors()); 
app.use(express.json()); 

//? Ruta raíz
app.get('/', (req, res) => {
    res.send('API del Hotel Miranda');
});

//? Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
