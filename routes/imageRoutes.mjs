import express from 'express';
import { findImageById } from '../controllers/imageController.mjs';

const router = express.Router();

router.get('/images/:id', findImageById);

export default router;