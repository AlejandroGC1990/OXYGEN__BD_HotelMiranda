import { Request, Response } from "express";
import { User } from "../interfaces/user";
import {getAll, getById, create, update, remove } from '../utils/controllers';

//? Ruta al JSON de users
const usersFilePath = '../data/users.json';

//? Obtener todos los usuarios
export const getUsers = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = getById<User>(usersFilePath, 'user_id', id);

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404). json({ message: "Usuario no encontrado"});
    }
};