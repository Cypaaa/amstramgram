import express from 'express';
import { createUser, findUserByUUID, findUserPostsByUUID, findUsers, removeUserByUUID, updateUserByUUID, updateUserPasswordByUUID } from '../controllers/userController.mjs';

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:uuid', findUserByUUID);
router.get('/users/:uuid/posts', findUserPostsByUUID);
router.get('/users', findUsers);
router.delete('/users/:uuid', removeUserByUUID);
router.put('/users/:uuid', updateUserByUUID);
router.put('/users/:uuid/password', updateUserPasswordByUUID);

export default router;