import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,
    VERSION: process.env.VERSION || "v0",
    DEBUG: process.env.DEBUG || false,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "root",
    DB_NAME: process.env.DB_NAME || "app",
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS_HOST: process.env.REDIS_HOST || "localhost",
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || "root",
};

export default config;
