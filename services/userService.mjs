import * as userRepository from '../repositories/userRepository.mjs';
import { findPostsByUserUUID } from '../services/postService.mjs';

const createUser = async (userData) => {
    let existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('Email already registered');
    }

    existingUser = await userRepository.findUserByUsername(userData.username);
    if (existingUser) {
        throw new Error('Username already taken');
    }

    return await userRepository.createUser(userData);
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
