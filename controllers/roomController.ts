import { Request, Response } from "express";
import { Room } from '../interfaces/room';
import { convertJSONToCSV, create, getAll, getById, remove, update } from "../services/controllers";

// Ruta al archivo JSON de habitaciones
const roomsFilePath = '../data/rooms.json';

//?Obtener datos de todas la habitaciones
export const getAllRooms = (req: Request, res: Response) => {
    const rooms = getAll<Room>(roomsFilePath);
    res.status(200).json(rooms);
};

//?Obtener una habitación por ID
export const getRoomById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const room = getById<Room>(roomsFilePath, 'room_id', id);

    if (room) {
        res.status(200).json(room);
    } else {
        res.status(404).json({ message: 'Habitación no encontrada' });
    }
};

//? Crear una nueva habitación
export const createRoom = (req: Request, res: Response) => {
    const newRoom: Room = req.body;
    const createdRoom = create<Room>(roomsFilePath, newRoom, 'room_id'); // Asigna ID único
    res.status(201).json({ message: 'Habitación creada', room: createdRoom });
};

//? Actualizar una habitación existente
export const updateRoom = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedData: Partial<Room> = req.body;
    const updatedRoom = update<Room>(roomsFilePath, 'room_id', id, updatedData);

    if (updatedRoom) {
        res.status(200).json({message: 'Habitación actualizada exitosamente', room: updatedRoom });
    } else {
        res.status(404).json({ message: 'Habitación no encontrada' });
    }
};

//? Eliminar una habitación
export const removeRoom = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const isRemoved = remove<Room>(roomsFilePath, 'room_id', id);


    if (isRemoved) {
        res.status(200).json({ message: 'Habitación eliminada exitosamente' });
    } else {
        res.status(404).json({ message: 'Habitación no encontrada' });
    }
};

//? Convertir usuarios a CSV
export const convertRoomToCSV = (req: Request, res: Response) => {
    const headers = [
        'room_id',
         'room_number',
         'room_type',
         'room_facilities',
         'room_price',
         'offer_price',
         'room_status',
         'room_picture',
         'room_bedType'];
    convertJSONToCSV(req, res, 'room.json', headers);
};