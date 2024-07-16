import express from 'express';
import { createComment, deleteCommentById, findCommentById, findCommentsByPostId } from '../controllers/commentController.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';
import { optionalAuthMiddleware } from '../middlewares/optionalAuthMiddleware.mjs';

const router = express.Router();

router.get('/comments/:id', optionalAuthMiddleware, findCommentById);
router.post('/posts/:post_id/comments', authMiddleware, createComment);
router.get('/posts/:post_id/comments', optionalAuthMiddleware, findCommentsByPostId);
router.delete('/comments/:id', authMiddleware, deleteCommentById);

export default router;