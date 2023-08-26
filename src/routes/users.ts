/* eslint-disable import/extensions */
import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/users.js';

const router = express.Router();
router.route('/').get(getUsers)

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
