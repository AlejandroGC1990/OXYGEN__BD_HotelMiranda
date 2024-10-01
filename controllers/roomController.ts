import { Request, Response } from "express";
import fs from 'fs';
import { Room } from '../interfaces/room';
import { writeCSVFile } from '../utils/cvsUtils'; 

//?Leer las habitaciones de un archivo JSON
const readRoomsFromFile = (): Room[] => {
    const data = fs.readFileSync('rooms.json', 'utf-8');
    return JSON.parse(data) as Room[];
};

//?Obtener datos de todas la habitaciones
export const getRooms = (req: Request, res: Response) => {
    const rooms = readRoomsFromFile();
    res.status(200).json(rooms);
};

//?Obtener una habitación por ID
export const getRoom = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const rooms = readRoomsFromFile();
    const room = rooms.find(r => r.room_id === id);

    if(room){
        res.status(200).json(room);
    } else {
        res.status(404).json({message: 'Habitación no encontrada'});
    }
};

//? Guardar habitaciones en un archivo JSON
const saveRoomsToFile = (rooms: Room[]) => {
    fs.writeFileSync('src/data/rooms.json', JSON.stringify(rooms, null, 2), 'utf-8');
};

//? Crear una nueva habitación
export const createRoom = (req: Request, res: Response) => {
    const newRoom: Room = req.body;
    const rooms = readRoomsFromFile();

    //asignar un id único
    newRoom.room_id = rooms.length > 0 ? rooms[rooms.length -1].room_id + 1 : 1;

    rooms.push(newRoom);
    saveRoomsToFile(rooms);

    res.status(201).json({message: 'Habitación creada', room: newRoom });
};

//? Actualizar una habitación existente
export const modifyRoom = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedData: Partial<Room> = req.body;
    const rooms = readRoomsFromFile();
    const roomIndex = rooms.findIndex(r => r.room_id === id);

    if (roomIndex !== -1) {
        const updatedRoom = { ...rooms[roomIndex], ...updatedData };
        rooms[roomIndex] = updatedRoom;
        saveRoomsToFile(rooms);
        res.status(200).json({ message: 'Habitación actualizada exitosamente', room: updatedRoom });
    } else {
        res.status(404).json({ message: 'Habitación no encontrada' });
    }
};

//? Eliminar una habitación
export const removeRoom = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let rooms = readRoomsFromFile();
    const roomExists = rooms.some(r => r.room_id === id);

    if (roomExists) {
        rooms = rooms.filter(r => r.room_id !== id);
        saveRoomsToFile(rooms);
        res.status(200).json({ message: 'Habitación eliminada exitosamente' });
    } else {
        res.status(404).json({ message: 'Habitación no encontrada' });
    }
};

//? Convertir habitaciones a CSV
export const convertRoomsToCSV = (req: Request, res: Response) => {
    try {
        const rooms = readRoomsFromFile();

        // Ordenar habitaciones por precio
        rooms.sort((a: Room, b: Room) => a.room_price - b.room_price);

        // Escribir el archivo CSV
        writeCSVFile(rooms);

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