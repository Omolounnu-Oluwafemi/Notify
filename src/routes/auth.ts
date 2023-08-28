/* eslint-disable import/extensions */
import express from 'express';


import { signUp, login, logout } from '../controllers/authControllers.js';

const router = express.Router();
router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout)

export default router;
