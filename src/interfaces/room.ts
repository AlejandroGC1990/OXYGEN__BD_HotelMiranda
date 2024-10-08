import { Document } from 'mongoose';

export interface Room extends Document {
    room_id: number;
    room_number: number;
    room_type: string;
    room_facilities: string[];
    room_price: number;
    offer_price?: number;
    room_status: string;
    room_picture: string;
    room_bedType: string;
}