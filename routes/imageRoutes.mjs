import express from 'express';
import { findImageById } from '../controllers/imageController.mjs';
import { optionalAuthMiddleware } from '../middlewares/optionalAuthMiddleware.mjs';

const router = express.Router();

router.get('/images/:id', optionalAuthMiddleware, findImageById);

export default router;