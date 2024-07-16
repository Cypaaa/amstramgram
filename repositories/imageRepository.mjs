import { pool } from '../config/database.mjs';

const findImageById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM images WHERE id = ?', [id]);
    rows[0].image = Buffer.from(rows[0].image).toString('base64');
    return rows[0];
};

const findImagesByPostId = async (postId) => {
    const [rows] = await pool.query('SELECT * FROM images WHERE post_id = ?', [postId]);
    for (let i = 0; i < rows.length; i++) {
        rows[i].image = Buffer.from(rows[i].image).toString('base64');
    }
    return rows;
};

const createImage = async (postId, imageBuffer) => {
    const [result] = await pool.query(
        'INSERT INTO images (post_id, image) VALUES (?, ?)',
        [postId, imageBuffer]
    );

    return result.insertId;
};

const deleteImagesByPostId = async (postId) => {
    await pool.query('DELETE FROM images WHERE post_id = ?', [postId]);
};

export { findImageById, findImagesByPostId, createImage, deleteImagesByPostId };
