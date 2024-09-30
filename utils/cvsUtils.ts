import { Room } from '../interfaces/room';
import * as fs from 'fs';

export const convertToCSV = (rooms: Room[]): string => {
    //? Convertir los datos a formato CSV
    const csvHeaders = 'Room Id, Room Number, Room Type, Room Facilities, Room Price, Room Status, Room Picture, Room BedType\n';
    let csvContent = csvHeaders;

    rooms.forEach((room: Room) => {
        csvContent += `${room.room_id}, ${room.room_number}, ${room.room_type}, ${room.room_facilities.join('|')}, ${room.room_price}, ${room.room_status}, ${room.room_picture}, ${room.room_bedType}\n`;
    });

    return csvContent;
};

export const writeCSVFile = (rooms: Room[]): void => {
    const csvContent = convertToCSV(rooms);
    fs.writeFileSync('rooms.csv', csvContent);
}