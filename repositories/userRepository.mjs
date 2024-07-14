import { pool } from '../config/database.mjs';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const all = "HEX(uuid) as uuid, email, name, username, presentation, is_admin";

const findUserByUUID = async (uuid) => {
    const [rows] = await pool.query('SELECT ' + all + ' FROM users WHERE uuid = ?', [Buffer.from(uuid, 'hex')]);
    return rows[0];
};

const findUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT ' + all + ', password FROM users WHERE email = ?', [email]); // also get the password to compare
    return rows[0];
};

const findUserByUsername = async (username) => {
    const [rows] = await pool.query('SELECT ' + all + ', password FROM users WHERE username = ?', [username]); // also get the password to compare
    return rows[0];
};

const findUsers = async (page = 1, limit = 25) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query('SELECT ' + all + ' FROM users LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)]);
    return rows;
};

const createUser = async (userData) => {
    const { email, password, name, username, presentation } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4().replace(/-/g, '');
    const uuidBuffer = Buffer.from(uuid, 'hex');
    await pool.query(
        `INSERT INTO users (uuid, email, password, name, username, presentation, is_admin)
         VALUES (?, ?, ?, ?, ?, ?, 0)`,
        [uuidBuffer, email, hashedPassword, name, username, presentation]
    );
    return uuid;
};

const deleteUserByUUID = async (uuid) => {
    await pool.query('DELETE FROM users WHERE uuid = ?', [Buffer.from(uuid, 'hex')]);
};

const updateUserByUUID = async (uuid, userData) => {
    const { email, name, username, presentation } = userData;
    await pool.query(
        'UPDATE users SET email = ?, name = ?, username = ?, presentation = ? WHERE uuid = ?',
        [email, name, username, presentation, Buffer.from(uuid, 'hex')]
    );
};

const updateUserPasswordByUUID = async (uuid, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
        'UPDATE users SET password = ? WHERE uuid = ?',
        [hashedPassword, Buffer.from(uuid, 'hex')]
    );
};

export { findUserByUUID, findUserByEmail, findUserByUsername, findUsers, createUser, deleteUserByUUID, updateUserByUUID, updateUserPasswordByUUID };