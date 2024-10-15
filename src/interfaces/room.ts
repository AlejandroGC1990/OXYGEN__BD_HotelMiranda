export interface Room {
    room_id: number;
    room_number: number;
    room_type: string;
    room_facilities: string[];
    room_price: number;
    offer_price?: number;
    room_status: 'Check In' | 'Check Out' | 'In Progress';
    room_picture: string;
    room_bedType: string;
}