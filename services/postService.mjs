import * as postRepository from '../repositories/postRepository.mjs';
import * as imageRepository from '../repositories/imageRepository.mjs';

const findPosts = async (page, limit) => {
    const posts = await postRepository.findPosts(page, limit);
    for (const post of posts) {
        const images = await imageRepository.findImagesByPostId(post.id);
        post.images = images;
        post.images.forEach(image => {
            image.image = Buffer.from(image.image).toString('base64');
        });
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
    await deleteImagesByPostId(id);
    await postRepository.deletePostById(id);
};

const createPost = async (userUuid, title, images) => {
    if (images.length > 5) {
        throw new Error('A post can have up to 5 images only');
    } else if (images.length < 1) {
        throw new Error('A post must have at least 1 image');
    }

    const result = await postRepository.createPost(userUuid, title);
    const postId = result.insertId;

    for (const image of images) {
        imageRepository.createImage(postId, image);
    }

    return postId;
};

export { findPosts, findPostById, findPostsByUserUUID, removePostById, createPost };