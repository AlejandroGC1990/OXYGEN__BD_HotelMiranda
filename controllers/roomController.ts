import { Request, Response } from "express";
import { Room } from '../interfaces/room';
import { getAllRooms } from "../services/roomsService";

//?Obtener datos de todas la habitaciones
export const getRooms = (req: Request, res: Response) => {
    const rooms = getAllRooms();
    res.status(200).json(rooms);
}

//?Obtener datos de todas la habitaciones
export const getRoom = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
}





export const convertRoomsToCSV = (req: Request, res: Response) => {
    try {
        //? Obtener datos del json
        const data = fs.readFileSync('rooms.json', 'utf-8');
        const rooms: Room[] = JSON.parse(data);

        //? Ordenar el precio de menor a mayor
        rooms.sort((a: Room, b: Room) => a.room_price - b.room_price);

        //? Escribir el archivo CSV con la función controlador de utils
        writeCSVFile(rooms);

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
};