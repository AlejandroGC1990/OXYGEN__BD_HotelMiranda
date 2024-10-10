import { Request, Response } from "express";
import UserModel from "models/userModels";

//?? Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

//?? Obtener usuarios por Id
export const getUsersById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await UserModel.findById(req.params.id);
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
    try {
        const newUser = new UserModel(req.body);

        if (!newUser.user_name || !newUser.user_password) {
            res.status(400).json({ message: 'Nombre y contraseña son requeridos' });
            return;
        }

        await newUser.save();
        res.status(201).json({ message: 'Usuario creado', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

//? Actualizar un usuario existente
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (updatedUser) {
            res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

//? Eliminar un usuario
export const removeUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if (user) {
            res.status(200).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};