import { connectDB } from '../db';

export const createUserTable = async () => {
    const connection = await connectDB();

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS User (
            user_id INT PRIMARY KEY AUTO_INCREMENT,
            user_name VARCHAR(255) NOT NULL,
            user_password VARCHAR(255) NOT NULL,
            user_picture VARCHAR(255) NOT NULL,
            user_joined DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            user_jobDescription VARCHAR(255) NOT NULL,
            user_schedule TEXT NOT NULL,
            user_contact VARCHAR(255) NOT NULL,
            user_status VARCHAR(50) NOT NULL
        );
    `);
};
