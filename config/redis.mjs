import config from './config.mjs';
import log from '../utils/logger.mjs';
import { createClient } from 'redis';

const cache = createClient({
    password: config.REDIS_PASSWORD,
    socket: {
        host: config.REDIS_HOST
    }
});

cache.on('error', err => log.error('Redis Client Error', err));
await cache.connect();

const ping = async (cacheClient, callback) => {
    try {
        await cacheClient.set("ping", "working");
        callback(null);
    } catch (e) {
        callback(e);
    }
};

export { cache, ping };