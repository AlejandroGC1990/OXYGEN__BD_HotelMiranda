import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_LOCALHOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    return connection;
};
