import { Contact } from "./contact";
import { Room } from "./room";

export interface Booking {
    booking_Id: number;              
    guest_Id: Contact;             
    guest_name: string;              
    guest_orderDate: string;       
    guest_checkIn: string;                 
    guest_checkOut: string;                
    booking_specialRequest: string;          
    room: Room;                      
    room_number: number;             
    room_type: string;               
    room_status: 'Check In' | 'Check Out' | 'In Progress';  
}