import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/user";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const hardcodeUser: User = {
    userName: process.env.HARD_CODED_USERNAME || 'defaultUsername',
    password: process.env.HARD_CODED_PASSWORD || 'defaultPassword',
};

const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'defaultSecretKey';

//? Extender la interfaz Request globalmente para incluir la propiedad 'user'
declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload;
        }
    }
}

//? Middleware de autenticación
export const authenticate = (req: Request, res: Response, next: NextFunction):void => {
    const {userName, password} = req.body;

    //?Verificar credenciales
    if(userName === hardcodeUser.userName && password === hardcodeUser.password) {
        //?Crear el token
        const token = jwt.sign({userName}, SECRET_KEY, {expiresIn:'1h'});
        res.json({token});
    } else {
        res.status(401).json({message: 'Invalid Credentials'});
    }
};

//? Middleware para verificar el token
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
        if(err) {
            return res.sendStatus(403);
        }
        req.user = decoded; // Guardar la información decodificada del token en la solicitud
        next();
    })
}

