import { connectDB } from '../db';

export const createContactTable = async () => {
    const connection = await connectDB();

    await connection.execute(`

        CREATE TABLE IF NOT EXISTS Booking (
            booking_id INT PRIMARY KEY AUTO_INCREMENT,
            guest_idReview INT NOT NULL,
            guest_name VARCHAR(255) NOT NULL,
            guest_orderDate DATE NOT NULL,
            guest_checkIn DATE NOT NULL,
            guest_checkOut DATE NOT NULL,
            booking_specialRequest TEXT,
            room_id INT NOT NULL,
            room_number INT NOT NULL,
            room_type VARCHAR(255) NOT NULL,
            room_status ENUM('Check In', 'Check Out', 'In Progress') NOT NULL,
            FOREIGN KEY (guest_idReview) REFERENCES Contact(guest_idReview) ON DELETE CASCADE,
            FOREIGN KEY (room_id) REFERENCES Room(room_id) ON DELETE CASCADE
        );
    `);
};