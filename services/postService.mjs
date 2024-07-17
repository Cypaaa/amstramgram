import log from '../utils/logger.mjs'
import * as postRepository from '../repositories/postRepository.mjs';
import * as imageRepository from '../repositories/imageRepository.mjs';
import * as commentRepository from '../repositories/commentRepository.mjs';

const findPosts = async (page, limit) => {
    const posts = await postRepository.findPosts(page, limit);
    for (const post of posts) {
        post.images = await imageRepository.findImagesByPostId(post.id);
    }
    return posts;
};

const findPostById = async (id) => {
    const post = await postRepository.findPostById(id);
    if (post) {
        const images = await imageRepository.findImagesByPostId(id);
        post.images = images;
    }
    return post;
};

const findPostsByUserUUID = async (userUuid, page, limit) => {
    const posts = await postRepository.findPostsByUserUUID(userUuid, page, limit);
    for (const post of posts) {
        const images = await imageRepository.findImagesByPostId(post.id);
        post.images = images;
    }
    return posts;
};

const removePostById = async (id) => {
    try {
        await imageRepository.deleteImagesByPostId(id);
    } catch (e) {log.error(e);}
    
    try {
        await commentRepository.deleteCommentsByPostId(id);
    } catch (e) {log.error(e);}
    
    try {
        await postRepository.deletePostById(id);
    } catch (e) {log.error(e);}
};

const createPost = async (userUuid, title, images) => {
    if (images.length > 5) {
        throw new Error('A post can have up to 5 images only');
    } else if (images.length < 1) {
        throw new Error('A post must have at least 1 image');
    }

    const result = await postRepository.createPost(userUuid, title);
    const post_id = result.insertId;

    for (const image of images) {
        imageRepository.createImage(post_id, image);
    }

    return post_id;
};

export { findPosts, findPostById, findPostsByUserUUID, removePostById, createPost };