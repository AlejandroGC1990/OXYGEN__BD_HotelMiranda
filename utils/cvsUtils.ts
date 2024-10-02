//! Explicación: Este archivo contiene utilidades para convertir las habitaciones en formato CSV y 
//!escribir este CSV en un archivo. Las funciones son usadas para:
//!  -convertToCSV: Convierte un array de habitaciones en una cadena de texto con formato CSV.
//!  -writeCSVFile: Escribe el CSV en un archivo (rooms.csv).

import { Room } from '../interfaces/room';
import * as fs from 'fs';

//? Convertir los datos a formato CSV
export const convertToCSV = (rooms: Room[]): string => {
    const csvHeaders = 'Room Id, Room Number, Room Type, Room Facilities, Room Price, Room Status, Room Picture, Room BedType\n';
    let csvContent = csvHeaders;

    rooms.forEach((room: Room) => {
        csvContent += `${room.room_id}, ${room.room_number}, ${room.room_type}, ${room.room_facilities.join('|')}, ${room.room_price}, ${room.room_status}, ${room.room_picture}, ${room.room_bedType}\n`;
    });

    return csvContent;
};

//? Escribir el archivo CSV
export const writeCSVFile = (rooms: Room[]): void => {
    const csvContent = convertToCSV(rooms);
    fs.writeFileSync('src/exports/rooms.csv', csvContent);
};