import * as commentService from '../services/commentService.mjs';

const findCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await commentService.findCommentById(id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findCommentsByPostId = async (req, res) => {
    const { page = 1, limit = 25 } = req.query;
    const { post_id } = req.params;
    try {
        const comments = await commentService.findCommentsByPostId(post_id, page, limit > 25 || limit < 1 ? 25 : limit); // min limit: 1, max limit: 25
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createComment = async (req, res) => {
    const { content } = req.body;
    const { post_id } = req.params;

    if (typeof(type) != "string" || content.length < 1 || content.length > 500) {
        return res.status(400).json({ error: "Content must be a string with between 1 to 500 characters" });
    }

    if (parseInt(post_id) != post_id || post_id < 0) {
        return res.status(400).json({ error: "Content must be a string with between 1 to 500 characters" });
    }

    try {
        const uuid = await commentService.createComment(req.user.uuid, post_id, content);
        res.status(201).json({ data: uuid, message: 'Comment created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteCommentById = async (req, res) => {
    const { id } = req.params;
    // check for request user perms
    try {
        const comment = await commentService.findCommentById(id);
        if (comment.user_uuid != comment.user.uuid && req.user.is_admin != true) {
            return res.status(403).json({ message: "Insufficient permissions" });
        }
    } catch (error) {
        return res.status(404).json({ message: "Comment not found" });
    }

    // delete comment
    try {
        await commentService.deleteCommentById(id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCommentsByPostId = async (req, res) => {
    const { post_id } = req.params;
    // No need perm check since this function is triggered by the suppression of post
    try {
        await commentService.deleteCommentsByPostId(post_id);
        res.status(200).json({ message: 'Comments deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { findCommentById, findCommentsByPostId, createComment, deleteCommentById, deleteCommentsByPostId };