import express from 'express';
import { signUp } from '../controllers/users';

const router = express.Router();

/* SignUp  */
router.post('/', signUp);

export default router;
