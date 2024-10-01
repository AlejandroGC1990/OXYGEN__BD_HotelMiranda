import * as fs from 'fs';
import { Room } from '../interfaces/room';

const ROOMS_FILE = 'rooms.json';

export const getAllRooms = (): Room[] => {
    const data = fs.readFileSync(ROOMS_FILE, 'utf-8');
    const rooms: Room[] = JSON.parse(data);
    return rooms;
}

export const getRoomById = (id: Number): Room | undefined => {
    const rooms = getAllRooms();
    return rooms.find(room => room.room_id === id);
};

export const addRoom = (newRoom: Room): void => {
    const rooms = getAllRooms();
    rooms.push(newRoom);
    fs.writeFileSync(ROOMS_FILE, JSON.stringify(rooms, null, 2));
};

export const updateRoom = (id: number, updatedRoom: Partial<Room>): boolean => {
    const rooms = getAllRooms();
    const roomIndex = rooms.findIndex(room => room.room_id === id);
    if (roomIndex === -1) return false;
    rooms[roomIndex] = { ...rooms[roomIndex], ...updatedRoom };
    fs.writeFileSync(ROOMS_FILE, JSON.stringify(rooms, null, 2));
    return true;
};

export const deleteRoom = (id: number): boolean => {
    let rooms = getAllRooms();
    const initialLength = rooms.length;
    rooms = rooms.filter(room => room.room_id !== id);
    if (rooms.length === initialLength) return false;
    fs.writeFileSync(ROOMS_FILE, JSON.stringify(rooms, null, 2));
    return true;
};