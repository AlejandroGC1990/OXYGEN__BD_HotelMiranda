import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from "../models/userModels";

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any; // o define un tipo más específico si lo deseas
            isAuthenticated?: boolean;
        }
    }
}

//? Clave secreta para firmar el token JWT
const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'defaultSecretKey';

//? Middleware de autenticación
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_name, user_password } = req.body;  // Obtener las credenciales del cuerpo de la solicitud

    try {
        //?Buscar usuario en la BD
        const user = await UserModel.findOne({ user_name });

        //?Verificar credenciales
        if (user && await bcrypt.compare(user_password, user.user_password)) {

            // Crear el token JWT
            const token = jwt.sign({ user_name: user.user_name }, SECRET_KEY);
            res.json({ token }); // Enviar el token como respuesta
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

//? Middleware para verificar el token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    //? Obtener el token del encabezado de autorización
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.sendStatus(403); //Si no hay token, no party
        return;
    }

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded; // Guardar la información decodificada del token en la solicitud
        next(); // Pasar al siguiente middleware
    })
};

//? Middleware para comprobar si el usuario está autenticado
export const checkAuthentication = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado de autorización

    console.log('Token recibido:', token);

    if (!token) {
        req.isAuthenticated = false; // Si no hay token, el usuario no está autenticado
        return next();
    }

    jwt.verify(token, SECRET_KEY, (err: any) => {
        if (err) {
            req.isAuthenticated = false;
        } else {
            req.isAuthenticated = true;
        }
        next();
    });
};