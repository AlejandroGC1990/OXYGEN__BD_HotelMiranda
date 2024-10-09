import { Request, Response } from "express";
import RoomModel from "../models/roomModels";

//?Obtener datos de todas la habitaciones
export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las habitaciones', error })
    }
};

//?Obtener una habitación por ID
export const getRoomById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id); //Mongoose maneja el ID como string

    try {
        const room = await RoomModel.findById(id);
        res.status(200).json(room);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la habitación', error });
    }
};

//? Crear una nueva habitación
export const createRoom = async (req: Request, res: Response) => {
    const newRoom = req.body;  // Crea una instancia del modelo

    try {
        const createdRoom = await newRoom.save(); //Guarda la habitación.
        res.status(201).json({ message: 'Habitación creada', room: createdRoom });
    
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la habitación' })
    }
};

//? Actualizar una habitación existente
export const updateRoom = async (req: Request, res: Response) => {
    const id = req.params.id;  // Obtén el ID de la habitación desde los parámetros de la solicitud
    const updatedData = req.body; // Obtén los datos actualizados del cuerpo de la solicitud

    try{
        //? Llama a la función de actualización
        const updatedRoom = await RoomModel.findByIdAndUpdate( id, updatedData);
        res.status(200).json({ message: 'Habitación actualizada exitosamente', room: updatedRoom });

    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la habitación' });
    }

};

//? Eliminar una habitación
export const removeRoom = async (req: Request, res: Response) => {
    const id = req.params.id;
    
    try {
        const isRemoved = await RoomModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Habitación eliminada exitosamente', isRemoved });

    } catch {
        res.status(400).json({ message: 'Error al eliminar la habitación' });
    }
};