import express from 'express';
import multer from 'multer';
import { createPost, findPostById, findPosts, findPostsByUserUUID, removePostById } from '../controllers/postController.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';
import { optionalAuthMiddleware } from '../middlewares/optionalAuthMiddleware.mjs';

const router = express.Router();
const upload = multer();

router.get('/posts', optionalAuthMiddleware, findPosts);
router.post('/posts', authMiddleware, upload.any(), createPost);
router.get('/posts/:id', optionalAuthMiddleware, findPostById);
router.get('/users/:userUuid/posts', optionalAuthMiddleware, findPostsByUserUUID);
router.delete('/posts/:id', authMiddleware, removePostById);

export default router;