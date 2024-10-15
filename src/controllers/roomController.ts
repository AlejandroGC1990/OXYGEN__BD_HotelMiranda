import { Request, Response } from "express";
import RoomModel from "../models/roomModels";

//? Obtener todas las habitaciones
export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las habitaciones', error });
    }
};

//? Obtener una habitación por ID
export const getRoomById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const room = await RoomModel.findById(id);
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ message: "Habitación no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la habitación', error });
    }
};

//? Crear una nueva habitación
export const createRoom = async (req: Request, res: Response) => {
    const newRoom = new RoomModel(req.body);
    try {
        const createdRoom = await newRoom.save();
        res.status(201).json({ message: 'Habitación creada', room: createdRoom });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la habitación', error });
    }
};

//? Actualizar una habitación existente
export const updateRoom = async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedRoom = await RoomModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (updatedRoom) {
            res.status(200).json({ message: 'Habitación actualizada', room: updatedRoom });
        } else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la habitación', error });
    }
};

//? Eliminar una habitación
export const removeRoom = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const removedRoom = await RoomModel.findByIdAndDelete(id);
        if (removedRoom) {
            res.status(200).json({ message: 'Habitación eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la habitación', error });
    }
};
