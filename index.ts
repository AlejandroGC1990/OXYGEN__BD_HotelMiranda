import express from 'express';
import * as fs from 'fs';
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

//? Ruta para convertir JSON a CSV
app.get('/convert-to-csv', (req, res) => {
    try {
        const data = fs.readFileSync('rooms.json', 'utf-8');
        const rooms: Room[] = JSON.parse(data);

        rooms.sort((a: Room, b: Room) => a.room_price - b.room_price);
        //res.status(200).json(rooms); // Para visualizar el JSON

        //? Convertir los datos a formato CSV
        const csvHeaders = 'Room Id, Room Number, Room Type, Room Facilities, Room Price, Room Status, Room Picture, Room BedType\n';
        let csvContent = csvHeaders;

        rooms.forEach((room: Room) => {
            csvContent += `${room.room_id}, ${room.room_number}, ${room.room_type}, ${room.room_facilities.join('|')}, ${room.room_price}, ${room.room_status}, ${room.room_picture}, ${room.room_bedType}\n`;
        });

        //? Escribir el archivo CSV
        fs.writeFileSync('rooms.csv', csvContent);

        //? Enviar respuesta al cliente
        res.status(200).json({ message: 'Archivo CSV creado exitosamente.' });
    } catch (error: unknown) {
        console.error('Error al convertir a CSV:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error al convertir a CSV', error: error.message });
        } else {
            res.status(500).json({ message: 'Error desconocido' });
        }
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
