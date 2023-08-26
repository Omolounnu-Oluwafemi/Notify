/* eslint-disable import/extensions */
import express from 'express';


import { signUp, login } from '../controllers/authControllers.js';

const router = express.Router();
router.post('/signup', signUp);
router.post('/login', login);


export default router;
