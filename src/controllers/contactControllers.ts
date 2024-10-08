import { Request, Response } from "express";
import { Contact } from '../interfaces/contact';
import ContactModel from "../models/contactModels"; 
import { getAll, getById, create, update, remove } from '../services/controllers';

//? Obtener todos los contactos
export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
    try {
        const contacts = await getAll<Contact>(ContactModel); 
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error al obtener contactos" });
    }
};

//? Obtener contacto por ID
export const getContactById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const contact = await getById<Contact>(ContactModel, id); 

        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: "Contacto no encontrado" });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error al obtener contacto" });
    }
};

//? Crear un nuevo contacto
export const createContact = async (req: Request, res: Response): Promise<void> => {
    const newContact: Contact = req.body; 

    if (!newContact.guest_name || !newContact.guest_email) {
        res.status(400).json({ message: 'El nombre y el email son requeridos' });
        return;
    }

    try {
        const createdContact = await create<Contact>(ContactModel, newContact); 
        res.status(201).json({ message: 'Contacto creado', contact: createdContact });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error al crear contacto" });
    }
};

//? Actualizar un contacto existente
export const updateContact = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData: Partial<Contact> = req.body;

    if (!updatedData.guest_name && !updatedData.guest_email) {
        res.status(400).json({ message: 'Proporcione al menos un nombre o un email para actualizar' });
        return;
    }

    try {
        const updatedContact = await update<Contact>(ContactModel, id, updatedData); 

        if (updatedContact) {
            res.status(200).json({ message: 'Contacto actualizado', contact: updatedContact });
        } else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error al actualizar contacto" });
    }
};

//? Eliminar un contacto
export const removeContact = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const success = await remove<Contact>(ContactModel, id);

        if (success) {
            res.status(200).json({ message: 'Contacto eliminado' });
        } else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar contacto" });
    }
};
