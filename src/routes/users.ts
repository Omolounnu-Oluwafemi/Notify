/* eslint-disable import/extensions */
import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.js';

import { signUp } from '../controllers/authControllers.js';

const router = express.Router();
router.post('/signup', signUp);

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
