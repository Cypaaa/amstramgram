import jwt from 'jsonwebtoken';
import config from '../config/config.mjs';
import { cache } from '../config/redis.mjs';

const optionalAuthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const cacheToken = await cache.get(decoded.uuid);

        if (token != cacheToken) {
            throw new Error("Invalid token provided");
        }

        const user = await userService.findUserByUUID(decoded.uuid); // trow error if not found (array out of bound)

        req.user = user;
    } catch (error) {
        req.user = null;
    }
    next();
};

export { optionalAuthMiddleware };
