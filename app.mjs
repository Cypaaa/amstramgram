import express from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import log from './utils/logger.mjs'
import * as database from './config/database.mjs';
import config from './config/config.mjs';
import userRoutes from './routes/userRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';
import imageRoutes from './routes/imageRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import { logMiddleware } from './middlewares/logMiddleware.mjs';
import { errorMiddleware } from './middlewares/errorMiddleware.mjs'
import * as redis from './config/redis.mjs';

// Cache (redis)
redis.ping(redis.cache, (err) => {
    if (err) {
        log.error(`Error: couldn't ping redis: ${err}`)
        process.exit(1);
    }
    log.success("Redis ping successful");
});

// Database (mysql)
database.ping(await database.pool.getConnection(), (err) => {
    if (err) {
        log.error(`Error: couldn't ping database: ${err}`)
        process.exit(1);
    }
    log.success("Database ping successful");
});

// Application
const app = express();
const apiPath = "/api/" + config.VERSION;

// pre routes middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (config.DEBUG) app.use(logMiddleware);

// routes
app.use(apiPath, authRoutes);
app.use(apiPath, userRoutes);
app.use(apiPath, postRoutes);
app.use(apiPath, imageRoutes);

// swagger docs
app.use('/', swaggerUi.serve, swaggerUi.setup(YAML.load('./swagger.yaml')));

// error middleware
app.use(errorMiddleware);

app.listen(config.PORT, () => {
    console.clear();
    log.information(`Server is running on http://localhost:${config.PORT}/`);
});