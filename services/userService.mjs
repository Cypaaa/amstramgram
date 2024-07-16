import * as userRepository from '../repositories/userRepository.mjs';
import { findPostsByUserUUID } from '../services/postService.mjs';

const createUser = async (email, password, name, username, presentation) => {
    let existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        throw new Error('Email already registered');
    }

    existingUser = await userRepository.findUserByUsername(username);
    if (existingUser) {
        throw new Error('Username already taken');
    }

    return await userRepository.createUser(email, password, name, username, presentation);
};

const findUserByUUID = async (uuid) => {
    const user = await userRepository.findUserByUUID(uuid);
    const posts = await findPostsByUserUUID(uuid);
    return { user, posts };
};

const findUsers = async (page, limit) => {
    return await userRepository.findUsers(page, limit);
};

const removeUserByUUID = async (uuid) => {
    await userRepository.deleteUserByUUID(uuid);
};

const updateUserByUUID = async (uuid, userData) => {
    await userRepository.updateUserByUUID(uuid, userData);
};

const updateUserPasswordByUUID = async (uuid, password) => {
    await userRepository.updateUserPasswordByUUID(uuid, password);
};

export { createUser, findUserByUUID, findUsers, removeUserByUUID, updateUserByUUID, updateUserPasswordByUUID };
