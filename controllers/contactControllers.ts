import { Request, Response } from "express";
import { Contact } from "../interfaces/contact";
import { getAll, getById, create, update, remove, convertJSONToCSV } from '../services/controllers';

//? Ruta al archivo JSON de contactos
const contactsFilePath = '../data/contact.json';

//? Obtener todos los contactos
export const getAllContacts = (req: Request, res: Response): void => {
    const contacts = getAll<Contact>(contactsFilePath);
    res.status(200).json(contacts);
};

//? Obtener contacto por ID
export const getContactById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const contact = getById<Contact>(contactsFilePath, 'guest_idReview', id);

    if (contact) {
        res.status(200).json(contact);
    } else {
        res.status(404).json({ message: "Contacto no encontrado" });
    }
};

//? Crear un nuevo contacto
export const createContact = (req: Request, res: Response): void => {
    const newContact: Contact = req.body;

    if (!newContact.guest_name || !newContact.guest_email) {
        res.status(400).json({ message: 'El nombre y el email son requeridos' });
    }

    const createdContact = create<Contact>(contactsFilePath, newContact, 'guest_idReview');
    res.status(201).json({ message: 'Contacto creado', contact: createdContact });
};

//? Actualizar un contacto existente
export const updateContact = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const updatedData: Partial<Contact> = req.body;

    if (!updatedData.guest_name && !updatedData.guest_email) {
        res.status(400).json({ message: 'Proporcione al menos un nombre o un email para actualizar' });
    }

    const updatedContact = update<Contact>(contactsFilePath, 'guest_idReview', id, updatedData);

    if (updatedContact) {
        res.status(200).json({ message: 'Contacto actualizado', contact: updatedContact });
    } else {
        res.status(404).json({ message: 'Contacto no encontrado' });
    }
};

//? Eliminar un contacto
export const removeContact = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const success = remove<Contact>(contactsFilePath, 'guest_idReview', id);

    if (success) {
        res.status(200).json({ message: 'Contacto eliminado' });
    } else {
        res.status(404).json({ message: 'Contacto no encontrado' });
    }
};

//? Convertir contactos a CSV
export const convertContactsToCSV = (req: Request, res: Response) => {
    const fileName = 'contacts.json';
    const headers = [
        'guest_idReview',
        'guest_timeDateReview',
        'guest_DateReview',
        'guest_name',
        'guest_email',
        'guest_phone',
        'guest_rateReview',
        'guest_commentReview',
        'guest_statusReview',
        'guest_checkIn',
        'guest_checkInTime',
        'guest_checkOut',
        'guest_checkOutTime',
        'guest_orderDateTime',
        'guest_orderDate',
        'guest_room_state'
    ];
    convertJSONToCSV(req, res, fileName, headers);
};
