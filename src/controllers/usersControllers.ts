import { Request, Response } from "express";
import { connectDB } from '../db/db';
import { OkPacketParams } from "mysql2";

//?? Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = await connectDB();
        const [users] = await connection.execute('SELECT * FROM User');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

//?? Obtener usuarios por Id
export const getUsersById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const connection = await connectDB();
        const [user] = await connection.execute('SELECT * FROM User WHERE user_id = ?', [id]);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

//? Crear un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { user_name, user_password, user_picture, user_jobDescription, user_schedule, user_contact, user_status } = req.body;

    if (!user_name || !user_password) {
        res.status(400).json({ message: 'Nombre y contraseña son requeridos' });
        return;
    }
    try {
        const connection = await connectDB();
        await connection.execute(
            'INSERT INTO User (user_name, user_password, user_picture, user_jobDescription, user_schedule, user_contact, user_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user_name, user_password, user_picture, user_jobDescription, JSON.stringify(user_schedule), user_contact, user_status]
        );

        res.status(201).json({ message: 'Usuario creado'});
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

//? Actualizar un usuario existente
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = req.body;
    const connection = await connectDB();

    try {
        const [result] = await connection.execute(
            'UPDATE User SET user_name = ?, user_password = ?, user_picture = ?, user_jobDescription = ?, user_schedule = ?, user_contact = ?, user_status = ? WHERE user_id = ?',
            [updatedData.user_name, updatedData.user_password, updatedData.user_picture, updatedData.user_jobDescription, JSON.stringify(updatedData.user_schedule), updatedData.user_contact, updatedData.user_status, id]
        );

        const okResult = result as OkPacketParams;

        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Usuario actualizado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

//? Eliminar un usuario
export const removeUser = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const connection = await connectDB();

    try {
        const [result] = await connection.execute('DELETE FROM User WHERE user_id = ?', [id]);
        
        const okResult = result as OkPacketParams;

        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};