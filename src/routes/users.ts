import express from 'express';
import { signUp } from '../controllers/authControllers';

const router = express.Router();

/* SignUp  */
router.post('/signup', signUp);

export default router;
