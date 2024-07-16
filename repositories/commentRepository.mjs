import { pool } from '../config/database.mjs';

const all = "id, HEX(user_uuid) as user_uuid, post_id, content, likes";

const findCommentById = async (id) => {
    const [rows] = await pool.query('SELECT ' + all + ' FROM comments WHERE id = ?', [id]);
    return rows[0];
};

const findCommentsByPostId = async (postId, page = 1, limit = 5) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query('SELECT ' + all + ' FROM comments WHERE post_id = ? LIMIT ? OFFSET ?', [postId, parseInt(limit), parseInt(offset)]);
    return rows;
};

const createComment = async (user_uuid, post_id, content) => {
    const [result] = await pool.query(
        'INSERT INTO comments (user_uuid, post_id, content, likes) VALUES (?, ?, ?, 0)',
        [user_uuid, post_id, content]
    );

    return result.insertId;
};

const deleteCommentById = async (id) => {
    await pool.query('DELETE FROM comments WHERE id = ?', [id]);
};

const deleteCommentsByPostId = async (postId) => {
    await pool.query('DELETE FROM comments WHERE post_id = ?', [postId]);
};

export { findCommentById, findCommentsByPostId, createComment, deleteCommentById, deleteCommentsByPostId };