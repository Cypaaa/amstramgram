import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,
    VERSION: process.env.VERSION || "v0",
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET
};

export default config;
