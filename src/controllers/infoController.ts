import { Request, Response } from 'express';

export const getHotelInfo = (req: Request, res: Response) => {
    const hotelInfo = {
        name: "Hotel Miranda",
        description: "Bienvenido al Hotel Miranda, donde ofrecemos las mejores habitaciones y servicios.",
        privateEndpoints: [
            { method: "GET", path: "/api/rooms", description: "Obtener habitaciones" },
            { method: "GET", path: "/api/rooms/:id", description: "Obtener una habitación por ID" },
            { method: "POST", path: "/api/rooms", description: "Crear una nueva habitación" },
            { method: "PUT", path: "/api/rooms/:id", description: "Modificar una habitación existente" },
            { method: "DELETE", path: "/api/rooms/:id", description: "Eliminar una habitación" },
            { method: "GET", path: "/api/rooms/csv", description: "Convertir habitaciones a CSV" },   
        ]
    };

    res.status(200).json(hotelInfo);
};