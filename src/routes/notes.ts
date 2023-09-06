import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from './../controllers/notes';
import { auth } from '../middleware/auth';


const router = express.Router();


router.route('/').get( auth , getNotes)

router
.post('/create', createNote)
.put('/:id', updateNote)
.delete('/:id', deleteNote);

export default router; 