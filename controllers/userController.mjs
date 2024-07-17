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
        const uuid = await userService.createUser(email, password, name, username, presentation);
        res.status(201).json({ data: uuid, message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const findUserSelf = async (req, res) => {
    res.status(200).json(req.user);
};

const findUserByUUID = async (req, res) => {
    const { uuid } = req.params;
    try {
        const user = await userService.findUserByUUID(uuid);
        user.user.password = "";

        if (req?.user?.is_admin == true) {
            return res.status(200).json(user);
        }
        res.status(200).json({
            user: {
                uuid: user.user.uuid,
                name: user.user.name,
                username: user.user.username,
                presentation: user.user.presentation,
                is_admin: user.user.is_admin
            },
            posts: user.posts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const findUserPostsByUUID = async (req, res) => {
    const { uuid } = req.params;
    const { page = 1, limit = 25 } = req.query;
    try {
        const posts = await postService.findPostsByUserUUID(uuid, page, limit > 25 || limit < 1 ? 25 : limit); // min limit: 1, max limit: 25
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findUsers = async (req, res) => {
    const { page = 1, limit = 25 } = req.query;
    try {
        const users = await userService.findUsers(page, limit > 25 || limit < 1 ? 25 : limit); // min limit: 1, max limit: 25

        if (req?.user?.is_admin == true) {
            return res.status(200).json(users);
        }

        res.status(200).json(
            users.map(user => {
                return {
                    uuid: user.uuid,
                    name: user.name,
                    username: user.username,
                    presentation: user.presentation,
                    is_admin: user.is_admin
                };
            })
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeUserByUUID = async (req, res) => {
    const { uuid } = req.params;

    if (req.user.uuid != uuid && req.user.is_admin) {
        return res.status(403).json({ message: "Insufficient permissions" });
    }

    try {
        await userService.removeUserByUUID(uuid);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserByUUID = async (req, res) => {
    const { uuid } = req.params;
    const { email, name, username, presentation, is_admin } = req.body;

    if (req.user.uuid != uuid && req.user.is_admin) {
        return res.status(403).json({ message: "Insufficient permissions" });
    }

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
        await userService.updateUserByUUID(uuid, { email, name, username, presentation, is_admin });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserPasswordByUUID = async (req, res) => {
    const { uuid } = req.params;
    const { password } = req.body;

    if (req.user.uuid != uuid && req.user.is_admin) {
        return res.status(403).json({ message: "Insufficient permissions" });
    }

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

export { createUser, findUserSelf, findUserByUUID, findUserPostsByUUID, findUsers, removeUserByUUID, updateUserByUUID, updateUserPasswordByUUID };
