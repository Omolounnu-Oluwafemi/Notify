import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/notes';
import { protect } from '../controllers/authControllers';


const router = express.Router();


router.route('/').get(protect, getNotes)

router
// .get('/', protect, getNotes)
.post('/', createNote)
.put('/:id', updateNote)
.delete('/:id', deleteNote);

export default router;