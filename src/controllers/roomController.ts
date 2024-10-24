import { Request, Response } from "express";
import { connectDB } from '../db/db';
import { Room } from '../interfaces/room';
import { ResultSetHeader } from "mysql2";
import { OkPacketParams } from "mysql2";


//? Obtener todas las habitaciones
export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const connection = await connectDB();
        const [rooms] = await connection.execute('SELECT * FROM Room');
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las habitaciones', error });
    }
};

//? Obtener una habitación por ID
export const getRoomById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const connection = await connectDB();
        const [room] = await connection.execute('SELECT * FROM Room WHERE room_id = ?', [id]);

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
    const { room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType } = req.body;
    try {
        const connection = await connectDB();
        const [result] = await connection.execute<ResultSetHeader>(`
            INSERT INTO Room (room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType]
        );
        const insertId = (result as any).insertId;
        
        res.status(201).json({ message: 'Habitación creada', roomId: result.insertId });
    }  catch (error) {
        res.status(400).json({ message: 'Error al crear la habitación', error });
    }
};

//? Actualizar una habitación existente
export const updateRoom = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType } = req.body;
    try {
        const connection = await connectDB();
        const [result] = await connection.execute(`
            UPDATE Room 
            SET room_number = ?, room_type = ?, room_facilities = ?, room_price = ?, offer_price = ?, room_status = ?, room_picture = ?, room_bedType = ?
            WHERE room_id = ?`, 
            [room_number, room_type, room_facilities, room_price, offer_price, room_status, room_picture, room_bedType, id]
        );

        const okResult = result as OkPacketParams;

        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Habitación actualizada', room: updateRoom });
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
        const connection = await connectDB();
        const [result] = await connection.execute('DELETE FROM Room WHERE room_id = ?', [id]);

        const okResult = result as OkPacketParams;

        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Habitación eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la habitación', error });
    }
};
