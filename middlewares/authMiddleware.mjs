import jwt from 'jsonwebtoken';
import config from '../config/config.mjs';
import { cache } from '../config/redis.mjs';
import * as userRepository from '../repositories/userRepository.mjs' // bcs userService also returns 5 posts

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const cacheToken = await cache.get(decoded.uuid);

        if (token != cacheToken) {
            throw new Error("Invalid token provided");
        }

        const user = await userRepository.findUserByUUID(decoded.uuid); // trow error if not found (array out of bound)

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export { authMiddleware };
