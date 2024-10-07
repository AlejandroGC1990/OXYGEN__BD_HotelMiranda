import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/user";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

//? Usuario hardcodeado para autenticación
const hardcodeUser: User = {
    user_id: 11,
    user_name: process.env.HARD_CODED_USERNAME || 'defaultUsername',
    user_password: process.env.HARD_CODED_PASSWORD || 'defaultPassword',
    user_picture: "http://dummyimage.com/237x100.png/ff4444/ffffff",
    user_joined: "2024-03-13 07:22:02",
    user_jobDescription: "Offer restaurant and activity recommendations and assist guests in arranging transportation",
    user_schedule: ["Monday", "Wednesday"],
    user_contact: "666 666 6666",
    user_status: "Inactive"
};
//? Clave secreta para firmar el token JWT
const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'defaultSecretKey';


//? Extender la interfaz Request globalmente para incluir la propiedad 'user'
declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload;
            isAuthenticated?: boolean;
        }
    }
}

//? Middleware de autenticación
export const authenticate = (req: Request, res: Response, next: NextFunction):void => {
    const {user_name, user_password} = req.body;  // Obtener las credenciales del cuerpo de la solicitud
console.log("patata1");
//?Verificar credenciales
if(user_name === hardcodeUser.user_name && user_password === hardcodeUser.user_password) {
    console.log("patata2");
    // Crear el token JWT con una validez de 1 hora
    const token = jwt.sign({user_name: hardcodeUser.user_name}, SECRET_KEY, {expiresIn:'24h'});
    res.json({token}); // Enviar el token como respuesta
} else {
        console.log("patata3");
        res.status(401).json({message: 'Invalid Credentials'});
    }
};

//? Middleware para verificar el token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    //? Obtener el token del encabezado de autorización
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) {
        res.sendStatus(403); //Si no hay token, no party
        return ;
    }

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
        if(err) {
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