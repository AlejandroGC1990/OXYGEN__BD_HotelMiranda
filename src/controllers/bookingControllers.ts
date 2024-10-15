import { Request, Response } from "express";
import BookingModel from "../models/bookingModels";
import RoomModel from "../models/roomModels";
import ContactModel from "../models/contactModels";
import { Booking } from "../interfaces/booking";

//? Obtener todas las reservas
export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookings = await BookingModel.find().populate('guest').populate('room');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas', error });
    }
};

//? Obtener una reserva por ID
export const getBookingById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const booking = await BookingModel.findById(id).populate('guest').populate('room');
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message: "Reserva no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la reserva', error });
    }
};

//? Crear una nueva reserva
export const createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { guest, room, specialRequest } = req.body;

        //? Verifica si el contacto y la habitación existen
        const contactExists = await ContactModel.findById(guest);
        const roomExists = await RoomModel.findById(room);

        if (!contactExists || !roomExists) {
            res.status(400).json({ message: 'El contacto o la habitación no existen' });
        }

        const newBooking = new BookingModel({
            // booking_id,
            guest,
            guest_idReview: guest.guest_idReview,
            guest_name: guest.guest_name,  
            guest_orderDate: guest.guest_orderDate,  
            guest_checkIn: guest.guest_checkIn,
            guest_checkOut: guest.guest_checkOut,
            booking_specialRequest: specialRequest,
            room,
            room_number: room.guest_name,
            room_type: room.room_type,
            room_status: room.room_status
        });

        const createdBooking = await newBooking.save();
        res.status(201).json({ message: 'Reserva creada', booking: createdBooking });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la reserva', error });
    }
};

//? Actualizar una reserva existente
export const updateBooking = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const updatedBooking = await BookingModel.findByIdAndUpdate(id, updatedData, { new: true }).populate('guest').populate('room');
        if (updatedBooking) {
            res.status(200).json({ message: 'Reserva actualizada', booking: updatedBooking });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la reserva', error });
    }
};

//? Eliminar una reserva
export const removeBooking = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const removedBooking = await BookingModel.findByIdAndDelete(id);
        if (removedBooking) {
            res.status(200).json({ message: 'Reserva eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la reserva', error });
    }
};