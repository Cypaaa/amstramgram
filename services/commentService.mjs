import * as commentRepository from '../repositories/commentRepository.mjs';

const findCommentById = async (id) => {
    return await commentRepository.findCommentById(id);
};

const findCommentsByPostId = async (postId, page, limit) => {
    return await commentRepository.findCommentsByPostId(postId, page, limit);
};

const createComment = async (user_uuid, post_id, content) => {
    return await commentRepository.createComment(user_uuid, post_id, content);
};

const deleteCommentById = async (id) => {
    return await commentRepository.deleteCommentById(id);
};

const deleteCommentsByPostId = async (id) => {
    return await commentRepository.deleteCommentsByPostId(id);
};

export { findCommentById, findCommentsByPostId, createComment, deleteCommentById, deleteCommentsByPostId };