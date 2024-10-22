CREATE TABLE Room (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_number INT NOT NULL,
    room_type VARCHAR(255) NOT NULL,
    room_facilities TEXT NOT NULL,
    room_price DECIMAL(10, 2) NOT NULL,
    offer_price DECIMAL(10, 2),
    room_status VARCHAR(50) NOT NULL,
    room_picture VARCHAR(255) NOT NULL,
    room_bedType VARCHAR(50) NOT NULL
);