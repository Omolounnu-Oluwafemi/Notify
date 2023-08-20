import express from 'express';
import { getNote } from '../controllers/notes';

const router = express.Router();

/* GET All notes. */
router.get('/', getNote)

export default router;