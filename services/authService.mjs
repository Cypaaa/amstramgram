import * as userRepository from '../repositories/userRepository.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.mjs';
import { cache } from '../config/redis.mjs';

const login = async (username, email, password) => {
    let user = await userRepository.findUserByEmail(email);
    if (user == null) {
        user = await userRepository.findUserByUsername(username);
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ uuid: user.uuid, email: user.email }, config.JWT_SECRET, { expiresIn: '168h' });
    await cache.set(user.uuid, token); // save token in cache server
    return { token, user };
};

// Add more authentication-related services as needed

export { login };
