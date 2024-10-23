import { connectDB } from '../db';

export const createContactTable = async () => {
  const connection = await connectDB();

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS Contact (
      guest_idReview INT PRIMARY KEY AUTO_INCREMENT,
      guest_timeDateReview VARCHAR(255) NOT NULL,
      guest_DateReview VARCHAR(255) NOT NULL,
      guest_name VARCHAR(255) NOT NULL,
      guest_email VARCHAR(255) NOT NULL,
      guest_phone VARCHAR(20) NOT NULL,
      guest_rateReview INT NOT NULL,
      guest_commentReview TEXT NOT NULL,
      guest_statusReview VARCHAR(50) NOT NULL,
      guest_checkIn DATE NOT NULL,
      guest_checkInTime TIME NOT NULL,
      guest_checkOut DATE NOT NULL,
      guest_checkOutTime TIME NOT NULL,
      guest_orderDateTime DATETIME NOT NULL,
      guest_orderDate DATE NOT NULL,
      guest_room_state VARCHAR(50) NOT NULL
    );
  `);
};
