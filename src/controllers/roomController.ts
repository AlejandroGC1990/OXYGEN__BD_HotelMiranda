import { Request, Response } from "express";
import ContactModel from "../models/contactModels";

//? Obtener todos los contactos
export const getAllContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await ContactModel.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los contactos', error });
    }
};

//? Obtener un contacto por ID
export const getContactById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const contact = await ContactModel.findById(id);
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
export const createContact = async (req: Request, res: Response) => {
    const newContact = new ContactModel(req.body);
    try {
        const createdContact = await newContact.save();
        res.status(201).json({ message: 'Contacto creado', contact: createdContact });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el contacto', error });
    }
};

//? Actualizar un contacto existente
export const updateContact = async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedContact = await ContactModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (updatedContact) {
            res.status(200).json({ message: 'Contacto actualizado', contact: updatedContact });
        } else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el contacto', error });
    }
};

//? Eliminar un contacto
export const removeContact = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const removedContact = await ContactModel.findByIdAndDelete(id);
        if (removedContact) {
            res.status(200).json({ message: 'Contacto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el contacto', error });
    }
};
