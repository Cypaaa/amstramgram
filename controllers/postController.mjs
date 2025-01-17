import * as postService from '../services/postService.mjs';
import { compressImageBuffer, resizeImageBuffer } from '../utils/compression.mjs';

const createPost = async (req, res) => {
    const { title } = req.body;
    const images = req.files;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
    }

    if (!Array.isArray(images) || images.length < 1 || images.length > 5) {
        return res.status(400).json({ error: 'Images must be an array from 1 to 5 items' });
    }

    try {
        let extname = "";
        for (let i = 0; i < images.length; i++) {
            extname = images[i].mimetype.split('/')[1];

            if (extname != 'jpeg' && extname != 'png') {
                return res.status(400).json({ error: "Image must be jpeg or png" });
            }

            images[i] = await resizeImageBuffer(images[i].buffer);
            images[i] = await compressImageBuffer(images[i], extname, 80);
            images[i] = images[i].toString('base64');
        }

        const post_id = await postService.createPost(req.user.uuid, title, images);
        res.status(201).json({ post_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findPosts = async (req, res) => {
    const { page = 1, limit = 25 } = req.query;
    try {
        const posts = await postService.findPosts(page, limit > 25 || limit < 1 ? 25 : limit); // min limit: 1, max limit: 25
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postService.findPostById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findPostsByUserUUID = async (req, res) => {
    const { user_uuid } = req.params;
    const { page = 1, limit = 5 } = req.query;
    try {
        const posts = await postService.findPostsByUserUUID(user_uuid, page, limit);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removePostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postService.findPostById(id);
        if (post.user_uuid != req.user.uuid && req.user.is_admin != true) {
            return res.status(403).json({ message: "Insufficient permissions" });
        }
    } catch (error) {
        return res.status(404).json({ message: "Post not found" });
    }

    try {
        await postService.removePostById(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { createPost, findPosts, findPostById, findPostsByUserUUID, removePostById };