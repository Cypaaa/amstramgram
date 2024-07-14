import * as userService from '../services/userService.mjs';
import * as postService from '../services/postService.mjs';
import { validateEmail, validateUsername, validateName } from '../utils/validation.mjs';

const createUser = async (req, res) => {
    const { email, password, name, username, presentation } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validateUsername(username)) {
        return res.status(400).json({ error: 'Invalid username format' });
    }

    if (!validateName(name)) {
        return res.status(400).json({ error: 'Invalid name format' });
    }

    try {
        const uuid = await userService.createUser({ email, password, name, username, presentation });
        res.status(201).json({ data: uuid, message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const findUserByUUID = async (req, res) => {
    const { uuid } = req.params;
    try {
        const user = await userService.findUserByUUID(uuid);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const findUserPostsByUUID = async (req, res) => {
    const { uuid } = req.params;
    const { page = 1, limit = 25 } = req.query;
    try {
        const posts = await postService.findPostsByUserUUID(uuid, page, limit > 25 || limit < 1  ? 25 : limit); // min limit: 1, max limit: 25
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findUsers = async (req, res) => {
    const { page = 1, limit = 25 } = req.query;
    try {
        const users = await userService.findUsers(page, limit > 25 || limit < 1 ? 25 : limit); // min limit: 1, max limit: 25
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeUserByUUID = async (req, res) => {
    const { uuid } = req.params;
    try {
        await userService.removeUserByUUID(uuid);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserByUUID = async (req, res) => {
    const { uuid } = req.params;
    const { email, name, username, presentation, isAdmin } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validateUsername(username)) {
        return res.status(400).json({ error: 'Invalid username format' });
    }

    if (!validateName(name)) {
        return res.status(400).json({ error: 'Invalid name format' });
    }

    try {
        await userService.updateUserByUUID(uuid, { email, name, username, presentation, isAdmin });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserPasswordByUUID = async (req, res) => {
    const { uuid } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        await userService.updateUserPasswordByUUID(uuid, password);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createUser, findUserByUUID, findUserPostsByUUID, findUsers, removeUserByUUID, updateUserByUUID, updateUserPasswordByUUID };
