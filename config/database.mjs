import mysql from 'mysql2/promise';
import config from './config.mjs';

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const ping = async (connection, callback) => {
    try {
        await connection.ping();
        connection.release();
        callback(null); // No error, ping successful
    } catch (err) {
        callback(err); // Error occurred during ping
    }
};

export { pool, ping };