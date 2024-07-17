import { pool } from '../config/database.mjs';

const findImageById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM images WHERE id = ?', [id]);
    return rows[0];
};

const findImagesByPostId = async (post_id) => {
    const [rows] = await pool.query('SELECT * FROM images WHERE post_id = ?', [post_id]);
    return rows;
};

const createImage = async (post_id, imgBase64) => {
    const [result] = await pool.query(
        'INSERT INTO images (post_id, image) VALUES (?, ?)',
        [post_id, imgBase64]
    );

    return result.insertId;
};

const deleteImagesByPostId = async (post_id) => {
    await pool.query('DELETE FROM images WHERE post_id = ?', [post_id]);
};

export { findImageById, findImagesByPostId, createImage, deleteImagesByPostId };
