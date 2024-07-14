import express from 'express';
import multer from 'multer';
import { createPost, findPostById, findPosts, findPostsByUserUUID, removePostById } from '../controllers/postController.mjs';

const router = express.Router();
const upload = multer();

router.get('/posts', findPosts);
router.post('/posts', upload.any(), createPost);
router.get('/posts/:id', findPostById);
router.get('/users/:userUuid/posts', findPostsByUserUUID);
router.delete('/posts/:id', removePostById);

export default router;