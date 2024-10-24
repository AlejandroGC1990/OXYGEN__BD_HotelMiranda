import { Request, Response } from "express";
import { connectDB } from '../db/db';
import { Contact } from '../interfaces/contact';
import { OkPacketParams } from "mysql2";

//?? Obtener todos los contactos
export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
    try {

        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM Contact');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los contactos', error });
    }
};

//? Obtener contacto por ID
export const getContactById = async (req: Request, res: Response): Promise<void> => {
    try {

        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM Contact');

        if (rows) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ message: "Contacto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el contacto', error });
    }
};

//? Crear un nuevo contacto
export const createContact = async (req: Request, res: Response): Promise<void> => {
    const { guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview } = req.body;

    try {
        const connection = await connectDB();
        const [result] = await connection.execute(`
            INSERT INTO Contact (guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview) 
            VALUES (?, ?, ?, ?, ?)`,
            [guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview]
        );

        const insertId = (result as any).insertId;

        res.status(201).json({ message: 'Usuario creado', contactId: insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

//? Actualizar un contacto existente
export const updateContact = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview } = req.body;

    try {
        const connection = await connectDB();
        const [result] = await connection.execute(`
            UPDATE Contact 
            SET guest_name = ?, guest_email = ?, guest_phone = ?, guest_commentReview = ?, guest_rateReview = ?
            WHERE guest_idReview = ?`,
            [guest_name, guest_email, guest_phone, guest_commentReview, guest_rateReview, id]
        );

        const okResult = result as OkPacketParams;

        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Contacto actualizado', contact: updateContact });
        } else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

//? Eliminar un contacto
export const removeContact = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const connection = await connectDB();
        const [result] = await connection.execute('DELETE FROM Contact WHERE guest_idReview = ?', [id]);

        const okResult = result as OkPacketParams;

        if (okResult.affectedRows) {
            res.status(200).json({ message: 'Contacto eliminado' });
        } else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el contacto', error });
    }
};