import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/notes';

const router = express.Router();

/* GET All notes. */
router
.get('/', getNotes)
.post('/', createNote)
.put('/:id', updateNote)
.delete('/:id', deleteNote);

export default router;