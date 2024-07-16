import express from 'express';
import { createUser, findUserByUUID, findUserPostsByUUID, findUsers, removeUserByUUID, updateUserByUUID, updateUserPasswordByUUID } from '../controllers/userController.mjs';
import { authMiddleware } from '../middlewares/authMiddleware.mjs';
import { optionalAuthMiddleware } from '../middlewares/optionalAuthMiddleware.mjs';

const router = express.Router();

router.get('/users/:uuid', optionalAuthMiddleware, findUserByUUID);
router.get('/users/:uuid/posts', optionalAuthMiddleware, findUserPostsByUUID);
router.get('/users', optionalAuthMiddleware, findUsers);
router.post('/users', authMiddleware, createUser);
router.delete('/users/:uuid', authMiddleware, removeUserByUUID);
router.put('/users/:uuid', authMiddleware, updateUserByUUID);
router.put('/users/:uuid/password', authMiddleware, updateUserPasswordByUUID);

export default router;