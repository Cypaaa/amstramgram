import express from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import * as database from './config/database.mjs';
import config from './config/config.mjs';
import userRoutes from './routes/userRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';
import imageRoutes from './routes/imageRoutes.mjs';
import { logMiddleware } from './middlewares/logMiddleware.mjs';
import { errorMiddleware } from './middlewares/errorMiddleware.mjs'

// Database
database.ping(await database.pool.getConnection(), (err) => {
    if (err) {
        console.log("\x1b[31mError: couldn't ping database:", err);
        process.exit(1);
        return;
    }
    console.log("Database ping successful");
});

// Application
const app = express();
const apiPath = "/api/" + config.VERSION;

// pre routes middleware
app.use(express.json());
app.use(logMiddleware);

// routes
app.use(apiPath, userRoutes);
app.use(apiPath, postRoutes);
app.use(apiPath, imageRoutes);

// swagger docs
app.use('/', swaggerUi.serve, swaggerUi.setup(YAML.load('./swagger.yaml')));

// error middleware
app.use(errorMiddleware);

app.listen(config.PORT, () => {
    console.clear();
    console.log(`Server is running on http://localhost:${config.PORT}`);
});