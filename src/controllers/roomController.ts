import { Request, Response } from "express";
import { Room } from '../interfaces/room';
import RoomModel from "../models/roomModels";
import { getAll, getById, create, update, remove } from "../services/controllers";

//? Obtener datos de todas las habitaciones
export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
    try {
        const rooms = await getAll<Room>(RoomModel);
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener habitaciones" });
    }
};

//? Obtener una habitación por ID
export const getRoomById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const room = await getById<Room>(RoomModel, id);

        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener habitación" });
    }
};

//? Crear una nueva habitación
export const createRoom = async (req: Request, res: Response): Promise<void> => {
    const newRoom: Room = new RoomModel(req.body);

    try {
        const createdRoom = await newRoom.save();
        res.status(201).json({ message: 'Habitación creada', room: createdRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear habitación" });
    }
};

//? Actualizar una habitación existente
export const updateRoom = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData: Partial<Room> = req.body;

    try {
        const updatedRoom = await update<Room>(RoomModel, id, updatedData);

        if (updatedRoom) {
            res.status(200).json({ message: 'Habitación actualizada exitosamente', room: updatedRoom });
        } else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar habitación" });
    }
};

//? Eliminar una habitación
export const removeRoom = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const isRemoved = await remove<Room>(RoomModel, id);

        if (isRemoved) {
            res.status(200).json({ message: 'Habitación eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar habitación" });
    }
};
