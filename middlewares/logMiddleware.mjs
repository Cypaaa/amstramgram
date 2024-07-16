import log from '../utils/logger.mjs'

const logMiddleware = (req, res, next) => {
    log.information(`${req.method} ${req.url}`);
    next();
};

export { logMiddleware };
