import { Request, Response } from "express";
import { User } from "../interfaces/user";
import { getAll, getById, create, update, remove, convertJSONToCSV } from '../services/controllers';

//?? Ruta al JSON de users
const usersFilePath = '../data/users.json';

//?? Obtener todos los usuarios
export const getAllUsers = (req: Request, res: Response): void => {
    const users = getAll<User>(usersFilePath);
    res.status(200).json(users);
};

//?? Obtener usuarios por Id
export const getUsersById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const user = getById<User>(usersFilePath, 'user_id', id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
};

//? Crear un nuevo usuario
export const createUser = (req: Request, res: Response): void => {
    const newUser: User = req.body;

    if (!newUser.user_name) {
        res.status(400).json({ message: 'Nombre es requerido' });
    }

    const createdUser = create<User>(usersFilePath, newUser, 'user_id');
    res.status(201).json({ message: 'Usuario creado', user: createdUser });
};

//? Actualizar un usuario existente
export const updateUser = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const updatedData: Partial<User> = req.body;

    if (!updatedData.user_name) {
        res.status(400).json({ message: 'Proporcione al menos un nombre o un correo para actualizar' });
    }

    const updatedUser = update<User>(usersFilePath, 'user_id', id, updatedData);

    if (updatedUser) {
        res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

//? Eliminar un usuario
export const removeUser = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const success = remove<User>(usersFilePath, 'user_id', id);

    if (success) {
        res.status(200).json({ message: 'Usuario eliminado' });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

//? Convertir usuarios a CSV
export const convertUsersToCSV = (req: Request, res: Response) => {
    const headers = [
        'user_id',
         'user_name',
         'user_password',
         'user_picture',
         'user_joined',
         'user_jobDescription',
         'user_schedule',
         'user_contact',
         'user_status'];
    convertJSONToCSV(req, res, 'users.json', headers);
};