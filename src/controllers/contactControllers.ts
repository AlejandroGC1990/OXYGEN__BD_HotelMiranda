import { Request, Response } from "express";
import ContactModel from "../models/contactModels";

//?? Obtener todos los contactos
export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
    try {
        const contacts = await ContactModel.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los contactos', error });
    }
};

//? Obtener contacto por ID
export const getContactById = async (req: Request, res: Response): Promise<void> => {
    try {
        const contact = await ContactModel.findById(req.params.id);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: "Contacto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el contacto', error });
    }
};

//? Crear un nuevo contacto
export const createContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const newContact = new ContactModel(req.body);

        if (!newContact.guest_name || !newContact.guest_email) {
            res.status(400).json({ message: 'El nombre y el email son requeridos' });
            return;
        }

        //? Guardar el nuevo contacto automáticamente llamará al middleware para hashear la contraseña
        await newContact.save();
        res.status(201).json({ message: 'Usuario creado', contact: newContact });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

//? Actualizar un contacto existente
export const updateContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedContact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (updatedContact) {
            res.status(200).json({ message: 'Contacto actualizado', contact: updatedContact });
        } else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

//? Eliminar un contacto
export const removeContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await ContactModel.findByIdAndDelete(req.params.id);

        if (success) {
            res.status(200).json({ message: 'Contacto eliminado' });
        } else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    };
};