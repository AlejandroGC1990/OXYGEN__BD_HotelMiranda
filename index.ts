import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

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
