import { pool } from '../config/database.mjs';

const all = "id, HEX(user_uuid) as user_uuid, title";

const findPosts = async (page = 1, limit = 25) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query('SELECT ' + all + ' FROM posts LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)]);
    return rows;
};

const createPost = async (user_uuid, title) => {
    const [result] = await pool.query(
        `INSERT INTO posts (user_uuid, title) VALUES (?, ?)`,
        [Buffer.from(user_uuid, 'hex'), title]
    );
    return result;
};

const findPostById = async (id) => {
    const [rows] = await pool.query('SELECT ' + all + ' FROM posts WHERE id = ?', [id]);
    return rows[0];
};

const findPostsByUserUUID = async (user_uuid, page = 1, limit = 5) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query('SELECT ' + all + ' FROM posts WHERE user_uuid = ? LIMIT ? OFFSET ?', [Buffer.from(user_uuid, 'hex'), parseInt(limit), parseInt(offset)]);
    return rows;
};

const deletePostById = async (id) => {
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);
};

export { findPosts, createPost, findPostById, findPostsByUserUUID, deletePostById };
